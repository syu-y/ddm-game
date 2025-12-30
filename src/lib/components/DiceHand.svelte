<script lang="ts">
  import { gameState, playerId } from '$lib/stores/game-store';
  
  $: player = $gameState?.players.find(p => p.id === $playerId);
  $: hand = player?.hand || [];
</script>

<div class="dice-hand">
  <div class="hand-header">
    <h3>🎲 手札</h3>
    <span class="hand-count">{hand.length} 枚</span>
  </div>
  
  <div class="dice-grid">
    {#if hand.length === 0}
      <p class="empty">ダイスをロールしてください</p>
    {:else}
      {#each hand as dice, i}
        <div class="dice-card" title="ダイス {i + 1}">
          <div class="dice-icon">🎲</div>
          <div class="dice-id">#{i + 1}</div>
        </div>
      {/each}
    {/if}
  </div>
</div>

<style>
  .dice-hand {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 15px;
    border-radius: 12px;
    color: white;
    display: flex;
    flex-direction: column;
  }

  .hand-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  }

  .hand-header h3 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: bold;
  }

  .hand-count {
    background: rgba(255, 255, 255, 0.2);
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 0.9rem;
    font-weight: bold;
  }

  .dice-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 10px;
    max-height: 300px;
    overflow-y: auto;
    padding: 5px;
  }

  .dice-grid::-webkit-scrollbar {
    width: 6px;
  }

  .dice-grid::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }

  .dice-grid::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }

  .empty {
    color: rgba(255, 255, 255, 0.6);
    font-style: italic;
    margin: 0;
    text-align: center;
    padding: 20px;
    grid-column: 1 / -1;
  }

  .dice-card {
    aspect-ratio: 1;
    background: rgba(255, 255, 255, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .dice-card:hover {
    transform: scale(1.05);
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }

  .dice-icon {
    font-size: 2rem;
  }

  .dice-id {
    font-size: 0.75rem;
    opacity: 0.7;
  }
</style>
