<script lang="ts">
  import type { Tile } from '$lib/game/types';

  export let board: Tile[][];

  const BOARD_SIZE = 13;
</script>

<div class="board">
  {#each Array(BOARD_SIZE) as _, y}
    <div class="row">
      {#each Array(BOARD_SIZE) as _, x}
        {@const tile = board[y]?.[x]}
        <div class="tile {tile?.type || 'empty'} {tile?.owner ? 'owned' : ''}" data-owner={tile?.owner}>
          {#if tile?.type === 'master'}
            <div class="master-marker">👤</div>
          {:else if tile?.type === 'monster'}
            <div class="monster-marker">🐉</div>
          {:else if tile?.type === 'dungeon'}
            <div class="dungeon-tile"></div>
          {/if}
        </div>
      {/each}
    </div>
  {/each}
</div>

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

  .tile:hover {
    background: rgba(255, 255, 255, 0.15);
    cursor: pointer;
  }

  .dungeon-tile {
    width: 100%;
    height: 100%;
    opacity: 0.7;
  }

  .master-marker, .monster-marker {
    font-size: 24px;
  }

  /* オーナーによる色分け */
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
</style>
