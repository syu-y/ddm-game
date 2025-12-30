<script lang="ts">
  import { gameState, playerId } from '$lib/stores/game-store';
  import type { RolledDice, Crest } from '$lib/game/types';
  
  $: player = $gameState?.players.find(p => p.id === $playerId);
  $: hand = player?.hand || [];

  let selectedDice: RolledDice | null = null;

  function selectDice(dice: RolledDice) {
    selectedDice = dice;
  }

  function closeDetail() {
    selectedDice = null;
  }

  function getFaceIcon(dice: RolledDice): string {
    switch (dice.face.type) {
      case 'monster':
        return '🐉';
      case 'movement':
        return '👣';
      case 'summon':
        return '✨';
      case 'magic':
        return '📜';
      case 'trap':
        return '🪤';
      default:
        return '🎲';
    }
  }

  function getFaceTypeText(type: string): string {
    const texts: Record<string, string> = {
      monster: 'モンスター',
      movement: '移動',
      summon: '召喚クレスト',
      magic: '魔法',
      trap: '罠'
    };
    return texts[type] || type;
  }

  function getCrestText(crest?: Crest): string {
    if (!crest) return '';
    const texts: Record<Crest, string> = {
      dark: '闇',
      light: '光',
      fire: '炎',
      water: '水',
      earth: '地',
      wind: '風'
    };
    return texts[crest];
  }

  function getCrestColor(crest?: Crest): string {
    if (!crest) return '#666';
    const colors: Record<Crest, string> = {
      dark: '#6a1b9a',
      light: '#ffd54f',
      fire: '#f4511e',
      water: '#039be5',
      earth: '#6d4c41',
      wind: '#66bb6a'
    };
    return colors[crest];
  }
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
        <button 
          class="dice-card" 
          on:click={() => selectDice(dice)}
          title="クリックで詳細表示"
        >
          <div class="dice-icon">{getFaceIcon(dice)}</div>
          <div class="dice-type">{getFaceTypeText(dice.face.type)}</div>
          {#if dice.face.level}
            <div class="dice-level">Lv.{dice.face.level}</div>
          {/if}
          {#if dice.face.crest}
            <div 
              class="dice-crest" 
              style="background-color: {getCrestColor(dice.face.crest)}"
            >
              {getCrestText(dice.face.crest)}
            </div>
          {/if}
        </button>
      {/each}
    {/if}
  </div>
</div>

<!-- ダイス詳細モーダル -->
{#if selectedDice}
  <div class="modal-overlay" on:click={closeDetail}>
    <div class="modal-content" on:click|stopPropagation>
      <button class="close-btn" on:click={closeDetail}>×</button>
      
      <div class="detail-header">
        <div class="detail-icon">{getFaceIcon(selectedDice)}</div>
        <h2>{getFaceTypeText(selectedDice.face.type)}</h2>
      </div>

      <div class="detail-body">
        {#if selectedDice.face.type === 'monster'}
          <div class="detail-row">
            <span class="label">レベル:</span>
            <span class="value">Lv.{selectedDice.face.level}</span>
          </div>
          <div class="detail-row">
            <span class="label">属性:</span>
            <span 
              class="value crest-badge" 
              style="background-color: {getCrestColor(selectedDice.face.crest)}"
            >
              {getCrestText(selectedDice.face.crest)}
            </span>
          </div>
          <div class="detail-description">
            このダイスを使用してレベル{selectedDice.face.level}の{getCrestText(selectedDice.face.crest)}属性モンスターを召喚できます。
          </div>
        {:else if selectedDice.face.type === 'movement'}
          <div class="detail-description">
            このダイスを使用してダンジョンパスを1マス延長できます。
          </div>
        {:else if selectedDice.face.type === 'summon'}
          <div class="detail-row">
            <span class="label">クレスト:</span>
            <span 
              class="value crest-badge" 
              style="background-color: {getCrestColor(selectedDice.face.crest)}"
            >
              {getCrestText(selectedDice.face.crest)}
            </span>
          </div>
          <div class="detail-description">
            このクレストを使用して{getCrestText(selectedDice.face.crest)}属性のモンスターを召喚できます。
          </div>
        {:else if selectedDice.face.type === 'magic'}
          <div class="detail-description">
            魔法カードとして使用できます。
          </div>
        {:else if selectedDice.face.type === 'trap'}
          <div class="detail-description">
            罠カードとして使用できます。
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}

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
    grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
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
    aspect-ratio: 0.8;
    background: rgba(255, 255, 255, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 8px;
    cursor: pointer;
    transition: all 0.2s;
    color: white;
  }

  .dice-card:hover {
    transform: scale(1.05);
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }

  .dice-icon {
    font-size: 2.5rem;
  }

  .dice-type {
    font-size: 0.75rem;
    text-align: center;
    opacity: 0.9;
  }

  .dice-level {
    font-size: 0.7rem;
    background: rgba(255, 255, 255, 0.3);
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: bold;
  }

  .dice-crest {
    font-size: 0.65rem;
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: bold;
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
    max-width: 400px;
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
    margin: 0;
    font-size: 1.8rem;
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
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }

  .detail-row:last-of-type {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  .label {
    font-weight: bold;
    font-size: 1.1rem;
  }

  .value {
    font-size: 1.3rem;
    font-weight: bold;
  }

  .crest-badge {
    padding: 5px 15px;
    border-radius: 20px;
  }

  .detail-description {
    margin-top: 20px;
    padding: 15px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    line-height: 1.6;
    font-size: 0.95rem;
  }
</style>
