<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { 
    gameState, 
    socket, 
    gameStarted, 
    connectionStatus, 
    playerName, 
    playerId,
    isRolling,
    rolledResults,
    sendGameAction
  } from '$lib/stores/game-store';
  import { getSummonableGroups } from '$lib/game/dice';
  import { EXPANSION_PATTERNS, rotatePattern } from '$lib/game/dice-expansion';
  import type { Position } from '$lib/game/types';
  import GameBoard from '$lib/components/GameBoard.svelte';
  import PlayerInfo from '$lib/components/PlayerInfo.svelte';
  import DiceHand from '$lib/components/DiceHand.svelte';
  import ActionPanel from '$lib/components/ActionPanel.svelte';
  import DiceRollAnimation from '$lib/components/DiceRollAnimation.svelte';

  let roomIdParam = $page.params.roomId;

  // 召喚用の状態（単一選択に変更）
  let selectedDiceId: string | null = null;
  let summonMode = false;
  let selectedPosition: Position | null = null;
  let previousHandSize = 0;
  let expansionPattern: Position[] = [];
  let rotationAngle: number = 0; // 展開パターンの回転角度（0, 90, 180, 270）
  let rotatedExpansionPattern: Position[] = []; // 回転後の展開パターン
  
  // 回転後の展開パターンをリアクティブに計算
  $: {
    rotatedExpansionPattern = rotatePattern(expansionPattern, rotationAngle);
    console.log('🔄 Rotation:', {
      rotationAngle,
      originalPattern: expansionPattern,
      rotatedPattern: rotatedExpansionPattern
    });
  }

  // ゲーム状態の変化を監視して召喚モードをリセット
  $: {
    if ($gameState) {
      const player = $gameState.players.find(p => p.id === $playerId);
      const currentHandSize = player?.hand.length || 0;
      
      // 手札が減った（召喚が成功した）場合、召喚モードをリセット
      if (summonMode && currentHandSize < previousHandSize) {
        summonMode = false;
        selectedDiceId = null;
        selectedPosition = null;
        expansionPattern = [];
        rotationAngle = 0;
      }
      
      previousHandSize = currentHandSize;
    }
  }

  onMount(() => {
    if (!$socket) {
      goto('/');
      return;
    }
    
    // 初期の手札サイズを記録
    const player = $gameState?.players.find(p => p.id === $playerId);
    previousHandSize = player?.hand.length || 0;
  });

  onDestroy(() => {
    if ($socket) {
      $socket.emit('leave-room');
      $socket.disconnect();
    }
  });

  // ダイス選択
  function handleDiceSelect(diceId: string) {
    console.log('🎲 ダイス選択:', diceId);
    
    if (!$gameState || $gameState.phase !== 'summon') {
      console.log('❌ 召喚フェーズではありません');
      return;
    }

    // 既に選択されている場合は解除
    if (selectedDiceId === diceId) {
      selectedDiceId = null;
      expansionPattern = [];
      rotationAngle = 0;
      console.log('🔄 ダイス選択解除');
    } else {
      selectedDiceId = diceId;
      rotationAngle = 0; // 新しいダイスを選択したら回転をリセット
      
      // 選択したダイスの展開パターンを取得
      const player = $gameState.players.find(p => p.id === $playerId);
      if (player) {
        const selectedRolledDice = player.hand.find(rd => rd.dice.id === diceId);
        if (selectedRolledDice) {
          const patternIndex = selectedRolledDice.dice.expansionPattern;
          expansionPattern = EXPANSION_PATTERNS[patternIndex] || [];
          console.log('✅ 展開パターン取得:', {
            patternIndex,
            patternLength: expansionPattern.length,
            pattern: expansionPattern
          });
        } else {
          console.log('❌ ダイスが見つかりません');
        }
      }
    }
  }

  // 召喚モード開始
  function startSummonMode() {
    if (!selectedDiceId) {
      alert('召喚するダイスを選択してください');
      return;
    }

    // 選択したダイスが召喚可能か確認
    const player = $gameState?.players.find(p => p.id === $playerId);
    if (!player) return;

    const selectedRolledDice = player.hand.find(rd => rd.dice.id === selectedDiceId);
    if (!selectedRolledDice) return;

    if (selectedRolledDice.rolledFace.crestType !== 'summon') {
      alert('召喚クレストを選択してください');
      return;
    }

    const summonNumber = selectedRolledDice.rolledFace.summonNumber!;
    const summonableGroups = getSummonableGroups(player.hand);
    
    if (!summonableGroups.has(summonNumber)) {
      alert('同じ召喚数字が2つ以上必要です');
      return;
    }

    // 現在の手札サイズを記録
    previousHandSize = player.hand.length;

    summonMode = true;
    console.log('✅ 召喚モード開始:', {
      summonMode,
      expansionPattern: expansionPattern.length,
      rotatedPattern: rotatedExpansionPattern.length,
      rotationAngle
    });
  }

  // 召喚キャンセル
  function cancelSummon() {
    summonMode = false;
    selectedDiceId = null;
    selectedPosition = null;
    expansionPattern = [];
    rotationAngle = 0;
  }
  
  // 展開パターンを回転（右クリック時に呼ばれる）
  function rotateExpansionPattern() {
    if (!summonMode) return;
    const oldAngle = rotationAngle;
    rotationAngle = (rotationAngle + 90) % 360;
    console.log('🔄 展開パターン回転:', {
      from: oldAngle,
      to: rotationAngle,
      originalPattern: expansionPattern,
      rotatedPattern: rotatedExpansionPattern
    });
  }

  // 盤面クリック
  function handleTileClick(position: Position) {
    console.log('🖱️ タイルクリック:', position, 'summonMode:', summonMode);
    
    if (!summonMode || !selectedDiceId) return;

    // 選択したダイスと同じ召喚数字を持つダイスをすべて取得
    const player = $gameState?.players.find(p => p.id === $playerId);
    if (!player) {
      console.error('❌ プレイヤーが見つかりません');
      return;
    }

    const selectedRolledDice = player.hand.find(rd => rd.dice.id === selectedDiceId);
    if (!selectedRolledDice) {
      console.error('❌ 選択したダイスが見つかりません');
      return;
    }

    const summonNumber = selectedRolledDice.rolledFace.summonNumber!;
    const sameSummonNumberDice = player.hand.filter(
      rd => rd.rolledFace.crestType === 'summon' && rd.rolledFace.summonNumber === summonNumber
    );

    console.log('📊 召喚チェック:', {
      summonNumber,
      diceCount: sameSummonNumberDice.length,
      position,
      rotationAngle,
      originalPattern: expansionPattern.length,
      rotatedPattern: rotatedExpansionPattern.length
    });

    if (sameSummonNumberDice.length < 2) {
      alert('召喚には同じ数字が2つ以上必要です');
      return;
    }

    // すべての同じ召喚数字のダイスIDを送信
    const diceIds = sameSummonNumberDice.map(rd => rd.dice.id);
    
    // デバッグ：展開パターンの絶対座標を計算
    const absolutePositions = rotatedExpansionPattern.map(relativePos => ({
      x: position.x + relativePos.x,
      y: position.y + relativePos.y
    }));
    
    const allInBounds = absolutePositions.every(pos => 
      pos.x >= 0 && pos.x < 13 && pos.y >= 0 && pos.y < 13
    );
    
    console.log('📤 召喚アクション送信:', {
      diceIds,
      position,
      rotation: rotationAngle,
      rotatedExpansionPattern,
      absolutePositions,
      allInBounds: allInBounds ? '✅' : '❌',
      outOfBounds: absolutePositions.filter(pos => 
        pos.x < 0 || pos.x >= 13 || pos.y < 0 || pos.y >= 13
      )
    });
    
    if (!allInBounds) {
      console.error('❌ クライアント側チェック：展開パターンが盤面外！');
      alert('展開パターンが盤面外です。別の位置を選択してください。');
      return;
    }
    
    sendGameAction({
      type: 'SUMMON_MONSTER',
      selectedDiceId: selectedDiceId,
      diceIds: diceIds,
      position: position,
      rotation: rotationAngle // 回転角度を追加
    });
  }
</script>

<div class="game-container">
  {#if !$gameStarted}
    <div class="waiting">
      <h2>対戦相手を待っています...</h2>
      <p>ルームID: <strong>{roomIdParam}</strong></p>
      <p>このIDを共有してください</p>
      <div class="spinner"></div>
    </div>
  {:else if $gameState}
    <div class="game-layout">
      <!-- 上部エリア: プレイヤー情報 + 盤面 -->
      <div class="top-area">
        <!-- 左: 自分の情報 -->
        <aside class="left-panel">
          <div class="section-title">あなた</div>
          <PlayerInfo 
            player={$gameState.players.find(p => p.id === $playerId)} 
            isOpponent={false} 
          />
          <DiceHand 
            selectedDiceId={selectedDiceId}
            onDiceSelect={handleDiceSelect}
          />

          <!-- 召喚ボタン -->
          {#if $gameState.phase === 'summon' && $gameState.currentTurn === $playerId}
            <div class="summon-controls">
              {#if !summonMode}
                <button 
                  class="btn btn-summon" 
                  on:click={startSummonMode}
                  disabled={!selectedDiceId}
                >
                  <span class="btn-icon">✨</span>
                  <span>召喚開始</span>
                </button>
              {:else}
                <div class="summon-mode-active">
                  <p>配置場所をクリック（マウスホバーでプレビュー表示）</p>
                  <button class="btn btn-cancel" on:click={cancelSummon}>
                    キャンセル
                  </button>
                </div>
              {/if}
            </div>
          {/if}
        </aside>

        <!-- 中央: ゲーム盤面 -->
        <main class="board-area">
          {#if summonMode}
            <div class="summon-guide">
              <div class="guide-title">📍 召喚モード {#if rotationAngle > 0}🔄 {rotationAngle}°{/if}</div>
              <div class="guide-text">
                緑色のマスにマウスをホバーすると展開パターンが表示されます
              </div>
              <div class="guide-text" style="font-size: 0.85rem; margin-top: 4px; opacity: 0.9;">
                右クリックで展開パターンを回転できます
              </div>
            </div>
          {/if}
          <GameBoard 
            board={$gameState.board}
            onTileClick={handleTileClick}
            highlightedPositions={selectedPosition ? [selectedPosition] : []}
            showDeployable={summonMode}
            expansionPattern={rotatedExpansionPattern}
            onRotatePattern={rotateExpansionPattern}
            rotationAngle={rotationAngle}
          />
        </main>

        <!-- 右: 相手の情報 -->
        <aside class="right-panel">
          <div class="section-title">対戦相手</div>
          <PlayerInfo 
            player={$gameState.players.find(p => p.id !== $playerId)} 
            isOpponent={true} 
          />
          
          <div class="opponent-hand-info">
            <h3>🎴 相手の手札</h3>
            <div class="hand-count-display">
              {$gameState.players.find(p => p.id !== $playerId)?.hand.length || 0} 枚
            </div>
          </div>
        </aside>
      </div>

      <!-- 下部エリア: アクションパネル -->
      <div class="bottom-area">
        <ActionPanel 
          phase={$gameState.phase} 
          isYourTurn={$gameState.currentTurn === $playerId} 
        />
      </div>
    </div>
  {:else}
    <div class="waiting">
      <h2>ゲーム状態を読み込み中...</h2>
      <div class="spinner"></div>
    </div>
  {/if}

  <!-- ダイスロールアニメーション -->
  {#if $isRolling && $rolledResults.length > 0}
    <DiceRollAnimation results={$rolledResults} />
  {/if}

  <!-- 接続状態インジケーター -->
  <div class="connection-status {$connectionStatus}">
    {$connectionStatus === 'connected' ? '🟢' : '🔴'} 
    {$connectionStatus}
  </div>
</div>

<style>
  .game-container {
    width: 100vw;
    height: 100vh;
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    overflow: hidden;
  }

  .waiting {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    color: white;
    text-align: center;
  }

  .waiting h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .waiting p {
    font-size: 1.2rem;
    margin: 0.5rem 0;
  }

  .waiting strong {
    background: rgba(255, 255, 255, 0.2);
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 1.5rem;
    letter-spacing: 2px;
  }

  .spinner {
    margin-top: 2rem;
    width: 50px;
    height: 50px;
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .game-layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 12px;
    gap: 12px;
  }

  .top-area {
    flex: 1;
    display: grid;
    grid-template-columns: 300px 1fr 300px;
    gap: 15px;
    min-height: 0;
  }

  .left-panel,
  .right-panel {
    display: flex;
    flex-direction: column;
    gap: 12px;
    overflow-y: auto;
  }

  .section-title {
    color: white;
    font-size: 1rem;
    font-weight: bold;
    text-align: center;
    padding: 8px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 8px;
    backdrop-filter: blur(10px);
  }

  .board-area {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: auto;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 12px;
    padding: 10px;
    gap: 10px;
    pointer-events: auto;
  }

  .summon-guide {
    background: linear-gradient(135deg, rgba(76, 175, 80, 0.3) 0%, rgba(67, 160, 71, 0.3) 100%);
    border: 2px solid #4caf50;
    padding: 12px 20px;
    border-radius: 10px;
    color: white;
    text-align: center;
    box-shadow: 0 0 20px rgba(76, 175, 80, 0.4);
  }

  .guide-title {
    font-size: 1.1rem;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .guide-text {
    font-size: 0.9rem;
    opacity: 0.95;
  }

  @keyframes rotate-flash {
    0% {
      transform: scale(1);
      box-shadow: 0 0 20px rgba(76, 175, 80, 0.4);
    }
    50% {
      transform: scale(1.05);
      box-shadow: 0 0 40px rgba(76, 175, 80, 0.8);
    }
    100% {
      transform: scale(1);
      box-shadow: 0 0 20px rgba(76, 175, 80, 0.4);
    }
  }

  .opponent-hand-info {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 15px;
    border-radius: 12px;
    color: white;
    text-align: center;
  }

  .opponent-hand-info h3 {
    margin: 0 0 10px 0;
    font-size: 1rem;
  }

  .hand-count-display {
    font-size: 2.5rem;
    font-weight: bold;
    background: rgba(255, 255, 255, 0.2);
    padding: 15px;
    border-radius: 8px;
  }

  .bottom-area {
    height: 140px;
    display: flex;
    justify-content: center;
  }

  .summon-controls {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 15px;
    border-radius: 12px;
  }

  .btn {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .btn-summon {
    background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
    color: #333;
  }

  .btn-summon:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 215, 0, 0.4);
  }

  .btn-cancel {
    background: #f44336;
    color: white;
  }

  .btn-cancel:hover {
    background: #d32f2f;
  }

  .btn-icon {
    font-size: 1.2rem;
  }

  .summon-mode-active {
    text-align: center;
    color: white;
  }

  .summon-mode-active p {
    margin: 0 0 10px 0;
    font-size: 1rem;
    color: gold;
    animation: pulse 1.5s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
  }

  .left-panel::-webkit-scrollbar,
  .right-panel::-webkit-scrollbar {
    width: 6px;
  }

  .left-panel::-webkit-scrollbar-track,
  .right-panel::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }

  .left-panel::-webkit-scrollbar-thumb,
  .right-panel::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }

  .connection-status {
    position: fixed;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.85rem;
    z-index: 1000;
  }

  .connection-status.connected {
    background: rgba(0, 128, 0, 0.7);
  }
</style>
