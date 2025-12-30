<script lang="ts">
  import type { Tile } from '$lib/game/types';

  export let board: Tile[][];

  const BOARD_SIZE = 13; // 13x13グリッド
</script>

<div class="board">
  {#each Array(BOARD_SIZE) as _, y}
    <div class="row">
      {#each Array(BOARD_SIZE) as _, x}
        {@const tile = board[y]?.[x]}
        <div class="tile {tile?.type || 'empty'}">
          {#if tile?.type === 'player'}
            <div class="player-marker">👤</div>
          {:else if tile?.type === 'monster'}
            <div class="monster-marker">🐉</div>
          {:else if tile?.type === 'dungeon'}
            <div class="dungeon-tile" style="background-color: {getCrestColor(tile.crest)}"></div>
          {/if}
        </div>
      {/each}
    </div>
  {/each}
</div>

<script lang="ts" context="module">
  function getCrestColor(crest?: string): string {
    const colors: Record<string, string> = {
      dark: '#6a1b9a',
      light: '#ffd54f',
      fire: '#f4511e',
      water: '#039be5',
      earth: '#6d4c41',
      wind: '#66bb6a'
    };
    return crest ? colors[crest] || '#424242' : '#424242';
  }
</script>

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

  .tile:hover {
    background: rgba(255, 255, 255, 0.15);
    cursor: pointer;
  }

  .dungeon-tile {
    width: 100%;
    height: 100%;
    opacity: 0.7;
  }

  .player-marker, .monster-marker {
    font-size: 24px;
  }
</style>
