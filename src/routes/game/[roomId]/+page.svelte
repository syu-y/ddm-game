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
    rolledResults
  } from '$lib/stores/game-store';
  import GameBoard from '$lib/components/GameBoard.svelte';
  import PlayerInfo from '$lib/components/PlayerInfo.svelte';
  import DiceHand from '$lib/components/DiceHand.svelte';
  import ActionPanel from '$lib/components/ActionPanel.svelte';
  import DiceRollAnimation from '$lib/components/DiceRollAnimation.svelte';

  let roomIdParam = $page.params.roomId;

  onMount(() => {
    if (!$socket) {
      console.warn('Socket接続なし、トップページへ');
      goto('/');
      return;
    }
    
    console.log('ゲーム画面マウント - ルームID:', roomIdParam);
  });

  onDestroy(() => {
    if ($socket) {
      console.log('ゲーム画面アンマウント - 退出処理');
      $socket.emit('leave-room');
      $socket.disconnect();
    }
  });
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
          <DiceHand />
        </aside>

        <!-- 中央: ゲーム盤面 -->
        <main class="board-area">
          <GameBoard board={$gameState.board} />
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

<!-- スタイルは前と同じなので省略 -->
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
    grid-template-columns: 400px 1fr 400px;
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
    justify-content: center;
    align-items: center;
    overflow: auto;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 12px;
    padding: 10px;
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

  @media (max-width: 1600px) {
    .top-area {
      grid-template-columns: 280px 1fr 280px;
    }
  }

  @media (max-width: 1400px) {
    .top-area {
      grid-template-columns: 260px 1fr 260px;
    }
  }

  @media (max-width: 1200px) {
    .top-area {
      grid-template-columns: 240px 1fr 240px;
    }
  }

  @media (max-width: 1024px) {
    .game-layout {
      grid-template-rows: auto 1fr auto;
    }

    .top-area {
      grid-template-columns: 1fr;
      grid-template-rows: auto auto 1fr;
    }

    .left-panel {
      order: 2;
    }

    .board-area {
      order: 3;
    }

    .right-panel {
      order: 1;
    }

    .bottom-area {
      height: auto;
    }
  }
</style>
