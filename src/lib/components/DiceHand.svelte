<script lang="ts">
  import { gameState, playerId } from '$lib/stores/game-store';
  import { getSummonableCombinations, getSummonableGroups } from '$lib/game/dice';
  import type { RolledDice, CrestType, SummonableCombination, SummonNumber } from '$lib/game/types';
  
  export let selectedDiceId: string | null = null;
  export let onDiceSelect: (diceId: string) => void = () => {};
  
  $: player = $gameState?.players.find(p => p.id === $playerId);
  $: hand = player?.hand || [];
  $: summonableCombinations = getSummonableCombinations(hand);
  $: summonableGroups = getSummonableGroups(hand);
  $: canSummon = $gameState?.phase === 'summon';

  let selectedDice: RolledDice | null = null;

  function handleDiceClick(dice: RolledDice, event: MouseEvent) {
    // 右クリックは詳細表示
    if (event.button === 2) {
      event.preventDefault();
      selectDice(dice);
      return;
    }

    // 召喚フェーズで召喚可能なダイスの場合は選択
    if (canSummon && dice.rolledFace.crestType === 'summon') {
      const summonNumber = dice.rolledFace.summonNumber!;
      if (summonableGroups.has(summonNumber)) {
        onDiceSelect(dice.dice.id);
      }
    } else {
      selectDice(dice);
    }
  }

  function handleDiceRightClick(dice: RolledDice, event: MouseEvent) {
    event.preventDefault();
    selectDice(dice);
  }

  function selectDice(dice: RolledDice) {
    selectedDice = dice;
  }

  function closeDetail() {
    selectedDice = null;
  }

  function isDiceSelected(diceId: string): boolean {
    return selectedDiceId === diceId;
  }

  function isDiceSummonable(dice: RolledDice): boolean {
    if (!canSummon) return false;
    if (dice.rolledFace.crestType !== 'summon') return false;
    const summonNumber = dice.rolledFace.summonNumber!;
    return summonableGroups.has(summonNumber);
  }

  function getCrestIcon(crestType: CrestType): string {
    const icons: Record<CrestType, string> = {
      summon: '⭐',
      attack: '⚔️',
      defense: '🛡️',
      movement: '➡️',
      magic: '✨',
      trap: '💣'
    };
    return icons[crestType];
  }

  function getCrestText(crestType: CrestType): string {
    const texts: Record<CrestType, string> = {
      summon: '召喚',
      attack: '攻撃',
      defense: '防御',
      movement: '進行',
      magic: '魔法',
      trap: '罠'
    };
    return texts[crestType];
  }

  function getCrestColor(crestType: CrestType): string {
    const colors: Record<CrestType, string> = {
      summon: '#ffd700',
      attack: '#ff4444',
      defense: '#4444ff',
      movement: '#44ff44',
      magic: '#ff44ff',
      trap: '#888888'
    };
    return colors[crestType];
  }
</script>

<div class="dice-hand">
  <div class="hand-header">
    <h3>🎲 手札</h3>
    <span class="hand-count">{hand.length} 枚</span>
  </div>
  
  <!-- 召喚可能な組み合わせ表示 -->
  {#if summonableGroups.size > 0}
    <div class="summonable-section">
      <h4>召喚可能:</h4>
      {#each Array.from(summonableGroups.entries()) as [summonNumber, diceList]}
        <div class="summon-combo">
          <span class="combo-icon">⭐{summonNumber}</span>
          <span class="combo-count">×{diceList.length}</span>
        </div>
      {/each}
    </div>
  {/if}

  {#if canSummon && selectedDiceId}
    <div class="selection-info">
      召喚するダイスを選択中
    </div>
  {/if}
  
  <div class="dice-grid">
    {#if hand.length === 0}
      <p class="empty">ダイスをロールしてください</p>
    {:else}
      {#each hand as rolledDice, i}
        {@const isSelected = isDiceSelected(rolledDice.dice.id)}
        {@const isSummonable = isDiceSummonable(rolledDice)}
        <button 
          class="dice-card {isSelected ? 'selected' : ''} {isSummonable ? 'selectable' : ''}"
          on:click={(e) => handleDiceClick(rolledDice, e)}
          on:contextmenu={(e) => handleDiceRightClick(rolledDice, e)}
          title={isSummonable ? 'クリックで選択 / 右クリックで詳細' : '右クリックで詳細表示'}
          style="border-color: {getCrestColor(rolledDice.rolledFace.crestType)}"
        >
          <!-- ダイスカードの内容は同じ -->
          <div class="dice-level">Lv.{rolledDice.dice.level}</div>
          <div class="dice-icon">{getCrestIcon(rolledDice.rolledFace.crestType)}</div>
          <div class="dice-type">{getCrestText(rolledDice.rolledFace.crestType)}</div>
          {#if rolledDice.rolledFace.crestType === 'summon'}
            <div class="summon-number">☆{rolledDice.rolledFace.summonNumber}</div>
          {/if}
          {#if rolledDice.rolledFace.multiplier && rolledDice.rolledFace.multiplier > 1}
            <div class="multiplier">×{rolledDice.rolledFace.multiplier}</div>
          {/if}
          {#if isSelected}
            <div class="selected-badge">✓</div>
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
        <div class="detail-icon">{getCrestIcon(selectedDice.rolledFace.crestType)}</div>
        <h2>{getCrestText(selectedDice.rolledFace.crestType)}</h2>
        <div class="dice-level-large">Lv.{selectedDice.dice.level}</div>
      </div>

      <div class="detail-body">
        <div class="detail-row">
          <span class="label">ダイスレベル:</span>
          <span class="value">Lv.{selectedDice.dice.level}</span>
        </div>

        {#if selectedDice.rolledFace.crestType === 'summon'}
          <div class="detail-row">
            <span class="label">召喚数字:</span>
            <span class="value">☆{selectedDice.rolledFace.summonNumber}</span>
          </div>
        {/if}

        {#if selectedDice.rolledFace.multiplier && selectedDice.rolledFace.multiplier > 1}
          <div class="detail-row">
            <span class="label">倍率:</span>
            <span class="value">×{selectedDice.rolledFace.multiplier}</span>
          </div>
        {/if}

        <div class="monster-info">
          <h3>モンスター情報</h3>
          <div class="detail-row">
            <span class="label">攻撃力:</span>
            <span class="value">{selectedDice.dice.monster?.attack}</span>
          </div>
          <div class="detail-row">
            <span class="label">防御力:</span>
            <span class="value">{selectedDice.dice.monster?.defense}</span>
          </div>
        </div>

        <div class="detail-description">
          {#if selectedDice.rolledFace.crestType === 'summon'}
            同じ☆{selectedDice.rolledFace.summonNumber}が2つ以上あれば召喚できます。
          {:else if selectedDice.rolledFace.crestType === 'movement'}
            モンスターの移動に使用できます。
          {:else if selectedDice.rolledFace.crestType === 'attack'}
            攻撃時に使用します。
          {:else if selectedDice.rolledFace.crestType === 'defense'}
            防御時に使用します。
          {:else if selectedDice.rolledFace.crestType === 'magic'}
            特殊能力の発動に使用します。
          {:else if selectedDice.rolledFace.crestType === 'trap'}
            罠の発動に使用します。
          {/if}
        </div>
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
    margin-bottom: 12px;
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

  .summonable-section {
    background: rgba(255, 215, 0, 0.2);
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 12px;
    border: 2px solid gold;
  }

  .summonable-section h4 {
    margin: 0 0 8px 0;
    font-size: 0.9rem;
    color: gold;
  }

  .summon-combo {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: rgba(255, 255, 255, 0.2);
    padding: 5px 10px;
    border-radius: 8px;
    margin-right: 8px;
    font-weight: bold;
  }

  .combo-icon {
    font-size: 1.1rem;
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
    border: 3px solid;
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
    position: relative;
  }

  .dice-card:hover {
    transform: scale(1.05);
    background: rgba(255, 255, 255, 0.3);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }

  .dice-level {
    position: absolute;
    top: 4px;
    right: 4px;
    font-size: 0.7rem;
    background: rgba(0, 0, 0, 0.5);
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: bold;
  }

  .dice-icon {
    font-size: 2.5rem;
  }

  .dice-type {
    font-size: 0.75rem;
    text-align: center;
    opacity: 0.9;
  }

  .summon-number {
    font-size: 1rem;
    background: rgba(255, 215, 0, 0.5);
    padding: 3px 8px;
    border-radius: 4px;
    font-weight: bold;
  }

  .multiplier {
    font-size: 0.7rem;
    background: rgba(255, 100, 100, 0.7);
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
    max-width: 450px;
    width: 90%;
    color: white;
    position: relative;
    animation: slideUp 0.3s;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
    max-height: 90vh;
    overflow-y: auto;
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

  .dice-level-large {
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

  .monster-info {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 2px solid rgba(255, 255, 255, 0.3);
  }

  .monster-info h3 {
    margin: 0 0 15px 0;
    font-size: 1.2rem;
    text-align: center;
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
