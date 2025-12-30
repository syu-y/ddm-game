<script lang="ts">
  import type { Player } from '$lib/game/types';

  export let player: Player | undefined;
  export let isOpponent: boolean = false;
</script>

{#if player}
  <div class="player-info {isOpponent ? 'opponent' : 'self'}">
    <div class="player-header">
      <div class="player-name">
        {player.name}
      </div>
      {#if !isOpponent}
        <span class="you-badge">YOU</span>
      {/if}
    </div>
    
    <div class="player-stats">
      <div class="stat">
        <span class="stat-icon">❤️</span>
        <div class="stat-info">
          <div class="stat-value">{player.lifePoints}</div>
          <div class="stat-label">LP</div>
        </div>
      </div>
      
      <div class="stat">
        <span class="stat-icon">🎲</span>
        <div class="stat-info">
          <div class="stat-value">{player.dicePool.length}</div>
          <div class="stat-label">ダイス</div>
        </div>
      </div>
      
      <div class="stat">
        <span class="stat-icon">🃏</span>
        <div class="stat-info">
          <div class="stat-value">{player.hand.length}</div>
          <div class="stat-label">手札</div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .player-info {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 15px;
    border-radius: 12px;
    color: white;
    border: 3px solid transparent;
    transition: all 0.3s;
  }

  .player-info.self {
    border-color: #4caf50;
    box-shadow: 0 0 15px rgba(76, 175, 80, 0.3);
  }

  .player-info.opponent {
    border-color: #f44336;
    box-shadow: 0 0 15px rgba(244, 67, 54, 0.3);
  }

  .player-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    margin-bottom: 12px;
    padding-bottom: 10px;
    border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  }

  .player-name {
    font-size: 1.2rem;
    font-weight: bold;
    text-align: center;
  }

  .you-badge {
    background: #4caf50;
    font-size: 0.65rem;
    padding: 3px 10px;
    border-radius: 10px;
    font-weight: bold;
    letter-spacing: 1px;
  }

  .player-stats {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .stat {
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(255, 255, 255, 0.1);
    padding: 10px;
    border-radius: 8px;
  }

  .stat-icon {
    font-size: 1.5rem;
    min-width: 30px;
    text-align: center;
  }

  .stat-info {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .stat-value {
    font-size: 1.5rem;
    font-weight: bold;
    line-height: 1;
  }

  .stat-label {
    font-size: 0.8rem;
    opacity: 0.8;
    margin-top: 2px;
  }
</style>
