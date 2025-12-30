<script lang="ts">
  import type { Tile, Position } from '$lib/game/types';
  import { gameState, playerId } from '$lib/stores/game-store';
  import { canDeployAt } from '$lib/game/board';

  export let board: Tile[][];
  export let onTileClick: (position: Position) => void = () => {};
  export let highlightedPositions: Position[] = [];
  export let showDeployable: boolean = false;

  const BOARD_SIZE = 13;

  // 配置可能な位置をリアクティブに計算
  $: deployablePositions = calculateDeployablePositions(board, showDeployable, $gameState, $playerId);

  function calculateDeployablePositions(
    board: Tile[][], 
    showDeployable: boolean, 
    gameState: typeof $gameState, 
    playerId: string | null
  ): Set<string> {
    const positions = new Set<string>();

    console.log('配置可能位置を計算:', { showDeployable, phase: gameState?.phase, playerId });

    if (!showDeployable) {
      console.log('  → showDeployable が false');
      return positions;
    }

    if (!gameState || gameState.phase !== 'summon') {
      console.log('  → フェーズが summon ではない');
      return positions;
    }

    if (!playerId) {
      console.log('  → playerId が存在しない');
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

    console.log('  → 配置可能な位置の数:', positions.size);
    console.log('  → 配置可能な位置:', Array.from(positions));

    return positions;
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

  function handleTileClickWithInfo(x: number, y: number) {
    const tile = board[y]?.[x];
    
    if (tile?.type === 'monster' && tile.deployedMonster) {
      selectedMonsterTile = tile;
    } else {
      onTileClick({ x, y });
    }
  }

  let selectedMonsterTile: Tile | null = null;

  function closeMonsterInfo() {
    selectedMonsterTile = null;
  }
</script>

<div class="board">
  {#each Array(BOARD_SIZE) as _, y}
    <div class="row">
      {#each Array(BOARD_SIZE) as _, x}
        {@const tile = board[y]?.[x]}
        {@const deployable = isDeployable(x, y)}
        {@const highlighted = isHighlighted(x, y)}
        <button 
          class="tile {tile?.type || 'empty'} {tile?.owner ? 'owned' : ''} {deployable ? 'deployable' : ''} {highlighted ? 'highlighted' : ''}" 
          data-owner={tile?.owner}
          on:click={() => handleTileClickWithInfo(x, y)}
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
        </button>
      {/each}
    </div>
  {/each}
</div>

<!-- モンスター情報モーダル -->
{#if selectedMonsterTile && selectedMonsterTile.deployedMonster}
  {@const monster = selectedMonsterTile.deployedMonster}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
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
          <span class="value">{monster.hp} / {monster.monster.defense}</span>
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

  .tile.deployable {
    background: rgba(0, 255, 0, 0.4) !important;
    border: 2px solid #4caf50 !important;
    cursor: pointer;
    animation: pulse 1.5s infinite;
  }

  .tile.highlighted {
    background: rgba(255, 255, 0, 0.5) !important;
    border: 3px solid yellow !important;
  }

  @keyframes pulse {
    0%, 100% { 
      background: rgba(0, 255, 0, 0.4) !important;
      box-shadow: 0 0 10px rgba(0, 255, 0, 0.6);
    }
    50% { 
      background: rgba(0, 255, 0, 0.6) !important;
      box-shadow: 0 0 20px rgba(0, 255, 0, 0.8);
    }
  }

  .tile:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  .tile.deployable:hover {
    background: rgba(0, 255, 0, 0.7) !important;
    transform: scale(1.1);
  }

  .dungeon-tile {
    width: 100%;
    height: 100%;
    opacity: 0.7;
  }

  .master-marker {
    font-size: 24px;
  }

  .monster-marker {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
  }

  .monster-icon {
    font-size: 20px;
  }

  .monster-level {
    font-size: 8px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 1px 3px;
    border-radius: 3px;
    font-weight: bold;
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
