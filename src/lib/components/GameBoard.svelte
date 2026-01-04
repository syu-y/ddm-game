<script lang="ts">
  import type { Tile, Position } from '$lib/game/types';
  import { gameState, playerId } from '$lib/stores/game-store';
  import { canDeployAt } from '$lib/game/board';

  export let board: Tile[][];
  export let onTileClick: (position: Position) => void = () => {};
  export let highlightedPositions: Position[] = [];
  export let showDeployable: boolean = false;
  export let expansionPattern: Position[] = []; // 展開パターン（相対座標、回転済み）
  export let onRotatePattern: () => void = () => {}; // 回転処理関数
  export let rotationAngle: number = 0; // 現在の回転角度

  const BOARD_SIZE = 13;
  
  // ローカル状態としてプレビュー位置を管理
  let previewPosition: Position | null = null;
  
  // 配置可能な位置、展開プレビュー、有効性チェックの結果を保持
  let deployablePositions: Set<string> = new Set();
  let expansionPreviewPositions: Set<string> = new Set();
  let expansionValid: boolean = false;

  // 配置可能な位置をリアクティブに計算
  $: {
    deployablePositions = calculateDeployablePositions(board, showDeployable, $gameState, $playerId);
    if (showDeployable && deployablePositions.size > 0) {
      console.log('🟢 配置可能マス検出:', deployablePositions.size, Array.from(deployablePositions));
    }
  }

  // 展開プレビューの位置を計算
  $: {
    expansionPreviewPositions = calculateExpansionPreview(previewPosition, expansionPattern);
    if (expansionPattern.length > 0) {
      console.log('📊 GameBoard expansionPattern:', {
        length: expansionPattern.length,
        pattern: expansionPattern,
        previewPosition,
        previewPositionsSize: expansionPreviewPositions.size
      });
    }
  }
  
  // 展開パターンが有効かどうかをチェック
  $: expansionValid = checkExpansionValidity(previewPosition, expansionPattern, board, $playerId);

  function calculateDeployablePositions(
    board: Tile[][], 
    showDeployable: boolean, 
    gameState: typeof $gameState, 
    playerId: string | null
  ): Set<string> {
    const positions = new Set<string>();

    if (!showDeployable) {
      return positions;
    }

    if (!gameState || gameState.phase !== 'summon') {
      return positions;
    }

    if (!playerId) {
      return positions;
    }

    // すべてのマスをチェック
    for (let y = 0; y < BOARD_SIZE; y++) {
      for (let x = 0; x < BOARD_SIZE; x++) {
        if (canDeployAt(board, { x, y }, playerId)) {
          positions.add(`${x},${y}`);
        }
      }
    }

    return positions;
  }

  function calculateExpansionPreview(
    previewPos: Position | null,
    pattern: Position[]
  ): Set<string> {
    const positions = new Set<string>();
    
    if (!previewPos || pattern.length === 0) {
      return positions;
    }

    // 展開パターンを絶対座標に変換
    pattern.forEach(relativePos => {
      const absX = previewPos.x + relativePos.x;
      const absY = previewPos.y + relativePos.y;
      
      // 盤面内かチェック
      if (absX >= 0 && absX < BOARD_SIZE && absY >= 0 && absY < BOARD_SIZE) {
        positions.add(`${absX},${absY}`);
      }
    });

    return positions;
  }

  // 展開パターンが有効かチェック
  function checkExpansionValidity(
    previewPos: Position | null,
    pattern: Position[],
    board: Tile[][],
    playerId: string | null
  ): boolean {
    if (!previewPos || !playerId || pattern.length === 0) {
      return false;
    }

    // すべての展開位置が有効かチェック
    for (const relativePos of pattern) {
      const absX = previewPos.x + relativePos.x;
      const absY = previewPos.y + relativePos.y;

      // 盤面外の場合は無効
      if (absX < 0 || absX >= BOARD_SIZE || absY < 0 || absY >= BOARD_SIZE) {
        return false;
      }

      const tile = board[absY][absX];
      const isCenter = (absX === previewPos.x && absY === previewPos.y);

      // 中心以外のマスをチェック
      if (!isCenter) {
        // 空きマスまたは自分のダンジョンでない場合は無効
        if (tile.type !== 'empty' && !(tile.type === 'dungeon' && tile.owner === playerId)) {
          return false;
        }
      }
    }

    return true;
  }

  function handleTileClick(x: number, y: number) {
    onTileClick({ x, y });
  }

  function isHighlighted(x: number, y: number): boolean {
    return highlightedPositions.some(pos => pos.x === x && pos.y === y);
  }

  function isDeployable(x: number, y: number): boolean {
    return deployablePositions.has(`${x},${y}`);
  }

  function isExpansionPreview(x: number, y: number): boolean {
    return expansionPreviewPositions.has(`${x},${y}`);
  }

  function isExpansionCenter(x: number, y: number): boolean {
    return previewPosition !== null && 
           previewPosition.x === x && 
           previewPosition.y === y;
  }

  function handleTileClickWithInfo(x: number, y: number) {
    const tile = board[y]?.[x];
    
    if (tile?.type === 'monster' && tile.deployedMonster) {
      selectedMonsterTile = tile;
    } else {
      onTileClick({ x, y });
    }
  }

  function handleTileHover(x: number, y: number) {
    // 召喚モード中で配置可能な位置の場合、プレビューを表示
    if (showDeployable && isDeployable(x, y)) {
      previewPosition = { x, y };
    }
  }

  function handleTileLeave() {
    // プレビューをクリア
    previewPosition = null;
  }

  let selectedMonsterTile: Tile | null = null;

  function closeMonsterInfo() {
    selectedMonsterTile = null;
  }

  function getTileColor(tile: Tile | undefined): string {
    if (!tile) return '';
    
    if (tile.type === 'dungeon' && tile.owner) {
      if (tile.owner === $playerId) {
        return 'rgba(100, 100, 255, 0.4)';
      } else {
        return 'rgba(255, 100, 100, 0.4)';
      }
    }
    
    return '';
  }
  function handleBoardRightClick(event: MouseEvent) {
    if (showDeployable) {
      event.preventDefault(); // デフォルトのコンテキストメニューを無効化
      onRotatePattern();
    }
  }
</script>

<div class="board" on:contextmenu={handleBoardRightClick}>
  {#each Array(BOARD_SIZE) as _, y}
    <div class="row">
      {#key `${expansionPreviewPositions.size}-${previewPosition?.x}-${previewPosition?.y}`}
      {#each Array(BOARD_SIZE) as _, x}
        {@const tile = board[y]?.[x]}
        {@const deployable = isDeployable(x, y)}
        {@const highlighted = isHighlighted(x, y)}
        {@const dungeonColor = getTileColor(tile)}
        {@const expansionPreview = isExpansionPreview(x, y)}
        {@const expansionCenter = isExpansionCenter(x, y)}
        {@const isValidExpansion = expansionValid}
        {@const previewStyle = 
          expansionCenter && isValidExpansion ? 'background: rgba(255, 165, 0, 0.95) !important; border: 6px solid rgb(255, 165, 0) !important; z-index: 160 !important;' :
          expansionCenter && !isValidExpansion ? 'background: rgba(255, 50, 50, 0.95) !important; border: 6px solid rgb(255, 0, 0) !important; z-index: 160 !important;' :
          expansionPreview && isValidExpansion ? 'background: rgba(100, 200, 255, 0.9) !important; border: 5px solid rgb(100, 200, 255) !important; z-index: 150 !important;' :
          expansionPreview && !isValidExpansion ? 'background: rgba(255, 100, 100, 0.9) !important; border: 5px solid rgb(255, 50, 50) !important; z-index: 150 !important;' :
          deployable && !expansionPreview && !expansionCenter ? 'background: rgba(0, 255, 0, 0.7) !important; border: 4px solid rgb(0, 255, 0) !important; z-index: 100 !important;' : 
          dungeonColor ? `background: ${dungeonColor};` : ''
        }
        <button 
          class="tile {tile?.type || 'empty'} {tile?.owner ? 'owned' : ''} {deployable ? 'deployable' : ''} {highlighted ? 'highlighted' : ''} {expansionPreview && !expansionCenter ? (isValidExpansion ? 'expansion-preview-valid' : 'expansion-preview-invalid') : ''} {expansionCenter ? (isValidExpansion ? 'expansion-center-valid' : 'expansion-center-invalid') : ''}" 
          data-owner={tile?.owner}
          style={previewStyle}
          on:click={() => handleTileClickWithInfo(x, y)}
          on:mouseenter={() => handleTileHover(x, y)}
          on:mouseleave={handleTileLeave}
        >
          {#if tile?.type === 'master'}
            <div class="master-marker">👤</div>
          {:else if tile?.type === 'monster' && tile.deployedMonster}
            <div class="monster-marker">
              <div class="monster-icon">🐉</div>
              <div class="monster-level">Lv{tile.deployedMonster.level}</div>
            </div>
          {:else if tile?.type === 'dungeon'}
            <div class="dungeon-tile"></div>
          {/if}
          
          {#if deployable}
            <div class="deployable-indicator">⬇️</div>
          {/if}
          
          {#if expansionCenter}
            <div class="preview-icon {isValidExpansion ? 'valid' : 'invalid'}">🐉</div>
          {:else if expansionPreview}
            <div class="preview-marker {isValidExpansion ? 'valid' : 'invalid'}">▪</div>
          {/if}
        </button>
      {/each}
      {/key}
    </div>
  {/each}
</div>

<!-- モンスター情報モーダル -->
{#if selectedMonsterTile && selectedMonsterTile.deployedMonster}
  {@const monster = selectedMonsterTile.deployedMonster}
  <div class="modal-overlay" on:click={closeMonsterInfo}>
    <div class="modal-content" on:click|stopPropagation>
      <button class="close-btn" on:click={closeMonsterInfo}>×</button>
      
      <div class="detail-header">
        <div class="detail-icon">🐉</div>
        <h2>{monster.monster.name}</h2>
        <div class="monster-level-large">Lv.{monster.level}</div>
      </div>

      <div class="detail-body">
        <div class="detail-row">
          <span class="label">位置:</span>
          <span class="value">({monster.position.x}, {monster.position.y})</span>
        </div>
        <div class="detail-row">
          <span class="label">攻撃力:</span>
          <span class="value">{monster.monster.attack}</span>
        </div>
        <div class="detail-row">
          <span class="label">防御力:</span>
          <span class="value">{monster.monster.defense}</span>
        </div>
        <div class="detail-row">
          <span class="label">HP:</span>
          <span class="value">{monster.hp} / {monster.monster.hp}</span>
        </div>
        <div class="detail-row">
          <span class="label">所有者:</span>
          <span class="value">{monster.owner === $playerId ? 'あなた' : '相手'}</span>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .board {
    background: rgba(0, 0, 0, 0.5);
    padding: 10px;
    border-radius: 8px;
    display: inline-block;
    position: relative;
  }

  .row {
    display: flex;
  }

  .tile {
    width: 40px;
    height: 40px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: all 0.3s;
    background: rgba(255, 255, 255, 0.05);
    padding: 0;
    cursor: pointer;
    pointer-events: auto; /* 明示的に有効化 */
    z-index: 1;
  }

  .tile.empty {
    background: rgba(255, 255, 255, 0.05);
  }

  .tile.dungeon {
    background: rgba(100, 100, 255, 0.3);
  }

  .tile.monster {
    background: rgba(255, 100, 100, 0.5);
  }

  .tile.master {
    background: rgba(255, 215, 0, 0.5);
    border: 2px solid gold;
  }

  /* 配置可能マスのスタイルを最優先 */
  .tile.deployable,
  .tile.empty.deployable,
  button.tile.deployable,
  button.tile.empty.deployable {
    background: rgba(0, 255, 0, 0.7) !important;
    border: 4px solid #00ff00 !important;
    cursor: pointer !important;
    animation: pulse-deployable 1.5s infinite !important;
    box-shadow: 0 0 20px rgba(0, 255, 0, 0.8) !important;
    z-index: 100 !important;
    position: relative !important;
  }

  .tile.highlighted {
    background: rgba(255, 255, 0, 0.5) !important;
    border: 3px solid yellow !important;
  }

  /* 展開プレビュー - 有効（配置可能より優先） */
  .tile.expansion-preview-valid,
  .expansion-preview-valid.tile,
  button.tile.expansion-preview-valid,
  button.tile.empty.expansion-preview-valid,
  button.tile.deployable.expansion-preview-valid {
    background: rgba(100, 200, 255, 0.9) !important;
    border: 5px solid rgba(100, 200, 255, 1) !important;
    animation: pulse-expansion 1.2s infinite !important;
    z-index: 150 !important;
    transition: all 0.3s ease-out;
  }

  .tile.expansion-center-valid,
  .expansion-center-valid.tile,
  button.tile.expansion-center-valid,
  button.tile.empty.expansion-center-valid,
  button.tile.deployable.expansion-center-valid {
    background: rgba(255, 165, 0, 0.95) !important;
    border: 6px solid rgba(255, 165, 0, 1) !important;
    animation: pulse-center 1s infinite !important;
    z-index: 160 !important;
    transition: all 0.3s ease-out;
  }

  /* 展開プレビュー - 無効 */
  .tile.expansion-preview-invalid,
  .expansion-preview-invalid.tile,
  button.tile.expansion-preview-invalid,
  button.tile.empty.expansion-preview-invalid,
  button.tile.deployable.expansion-preview-invalid {
    background: rgba(255, 100, 100, 0.9) !important;
    border: 5px solid rgba(255, 50, 50, 1) !important;
    animation: pulse-invalid 1.2s infinite !important;
    z-index: 150 !important;
    transition: all 0.3s ease-out;
  }

  .tile.expansion-center-invalid,
  .expansion-center-invalid.tile,
  button.tile.expansion-center-invalid,
  button.tile.empty.expansion-center-invalid,
  button.tile.deployable.expansion-center-invalid {
    background: rgba(255, 50, 50, 0.95) !important;
    border: 6px solid rgba(255, 0, 0, 1) !important;
    animation: pulse-invalid 1s infinite !important;
    z-index: 160 !important;
    transition: all 0.3s ease-out;
  }

  @keyframes pulse-expansion {
    0%, 100% { 
      box-shadow: 0 0 10px rgba(100, 200, 255, 0.6);
    }
    50% { 
      box-shadow: 0 0 20px rgba(100, 200, 255, 1);
    }
  }

  @keyframes pulse-deployable {
    0%, 100% { 
      background: rgba(0, 255, 0, 0.7) !important;
      box-shadow: 0 0 25px rgba(0, 255, 0, 0.9), inset 0 0 20px rgba(0, 255, 0, 0.3);
      transform: scale(1);
    }
    50% { 
      background: rgba(0, 255, 0, 0.95) !important;
      box-shadow: 0 0 40px rgba(0, 255, 0, 1), 0 0 60px rgba(0, 255, 0, 0.7), inset 0 0 30px rgba(0, 255, 0, 0.5);
      transform: scale(1.08);
    }
  }

  @keyframes pulse-center {
    0%, 100% { 
      box-shadow: 0 0 15px rgba(255, 165, 0, 0.8);
    }
    50% { 
      box-shadow: 0 0 25px rgba(255, 165, 0, 1);
    }
  }

  @keyframes pulse-invalid {
    0%, 100% { 
      box-shadow: 0 0 10px rgba(255, 50, 50, 0.8);
    }
    50% { 
      box-shadow: 0 0 20px rgba(255, 0, 0, 1);
    }
  }

  .tile:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  .tile.deployable:hover,
  .tile.empty.deployable:hover,
  button.tile.deployable:hover {
    background: rgba(0, 255, 0, 0.95) !important;
    transform: scale(1.25) !important;
    box-shadow: 0 0 40px rgba(0, 255, 0, 1), 0 0 70px rgba(0, 255, 0, 0.8) !important;
    z-index: 200 !important;
  }

  .preview-icon {
    position: absolute;
    font-size: 24px;
    pointer-events: none;
    filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.5));
  }

  .preview-icon.valid {
    opacity: 0.9;
  }

  .preview-icon.invalid {
    opacity: 0.7;
    filter: drop-shadow(0 0 5px rgba(255, 0, 0, 0.8));
  }

  .preview-marker {
    position: absolute;
    font-size: 20px;
    font-weight: bold;
    pointer-events: none;
    filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.5));
  }

  .preview-marker.valid {
    color: rgba(100, 200, 255, 1);
    opacity: 0.9;
  }

  .preview-marker.invalid {
    color: rgba(255, 100, 100, 1);
    opacity: 0.8;
  }

  .deployable-indicator {
    position: absolute;
    font-size: 28px;
    animation: bounce-glow 0.8s infinite;
    pointer-events: none;
    filter: drop-shadow(0 0 8px rgba(0, 255, 0, 1)) drop-shadow(0 0 15px rgba(0, 255, 0, 0.8));
    z-index: 10;
  }

  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
  }

  @keyframes bounce-glow {
    0%, 100% {
      transform: translateY(0) scale(1);
      filter: drop-shadow(0 0 8px rgba(0, 255, 0, 1)) drop-shadow(0 0 15px rgba(0, 255, 0, 0.8));
    }
    50% {
      transform: translateY(-8px) scale(1.15);
      filter: drop-shadow(0 0 12px rgba(0, 255, 0, 1)) drop-shadow(0 0 25px rgba(0, 255, 0, 1));
    }
  }

  .master-marker {
    font-size: 24px;
    pointer-events: none;
  }

  .monster-marker {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    pointer-events: none;
  }

  .monster-icon {
    font-size: 20px;
    pointer-events: none;
  }

  .monster-level {
    font-size: 8px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 1px 3px;
    border-radius: 3px;
    font-weight: bold;
    pointer-events: none;
  }

  .dungeon-tile {
    width: 100%;
    height: 100%;
    opacity: 0.7;
    pointer-events: none;
  }

  .tile.owned[data-owner] {
    position: relative;
  }

  .tile.owned::after {
    content: '';
    position: absolute;
    bottom: 2px;
    right: 2px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--owner-color, white);
  }

  /* モーダル */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.2s;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .modal-content {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 16px;
    padding: 30px;
    max-width: 450px;
    width: 90%;
    color: white;
    position: relative;
    animation: slideUp 0.3s;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  }

  @keyframes slideUp {
    from { transform: translateY(50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    font-size: 2rem;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
  }

  .close-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: rotate(90deg);
  }

  .detail-header {
    text-align: center;
    margin-bottom: 25px;
  }

  .detail-icon {
    font-size: 5rem;
    margin-bottom: 10px;
  }

  .detail-header h2 {
    margin: 0 0 10px 0;
    font-size: 1.8rem;
  }

  .monster-level-large {
    font-size: 1.2rem;
    background: rgba(255, 255, 255, 0.2);
    padding: 5px 15px;
    border-radius: 20px;
    display: inline-block;
  }

  .detail-body {
    background: rgba(255, 255, 255, 0.1);
    padding: 20px;
    border-radius: 12px;
  }

  .detail-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }

  .detail-row:last-of-type {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  .label {
    font-weight: bold;
    font-size: 1rem;
  }

  .value {
    font-size: 1.2rem;
    font-weight: bold;
  }
</style>
