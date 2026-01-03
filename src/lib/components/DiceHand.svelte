<script lang="ts">
  import { gameState, playerId } from '$lib/stores/game-store';
  import { getSummonableCombinations, getSummonableGroups } from '$lib/game/dice';
  import { EXPANSION_PATTERNS } from '$lib/game/dice-expansion';
  import type { RolledDice, CrestType, SummonableCombination, SummonNumber, Position } from '$lib/game/types';
  
  export let selectedDiceId: string | null = null;
  export let onDiceSelect: (diceId: string) => void = () => {};
  
  $: player = $gameState?.players.find(p => p.id === $playerId);
  $: hand = player?.hand || [];
  $: summonableCombinations = getSummonableCombinations(hand);
  $: summonableGroups = getSummonableGroups(hand);
  $: canSummon = $gameState?.phase === 'summon';

  let selectedDice: RolledDice | null = null;

  function handleDiceClick(dice: RolledDice, event: MouseEvent) {
    // 召喚フェーズで召喚可能なダイスの場合は選択
    if (canSummon && dice.rolledFace.crestType === 'summon') {
      const summonNumber = dice.rolledFace.summonNumber!;
      if (summonableGroups.has(summonNumber)) {
        onDiceSelect(dice.dice.id);
        return;
      }
    }
    
    // それ以外は詳細表示
    selectDice(dice);
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

  // 展開パターンを取得
  function getExpansionPattern(dice: RolledDice): Position[] {
    const patternIndex = dice.dice.expansionPattern;
    return EXPANSION_PATTERNS[patternIndex] || [];
  }

  // 展開パターンを5x5グリッドで表示するためのデータを生成
  function generateExpansionGrid(pattern: Position[]): boolean[][] {
    const grid: boolean[][] = [];
    // 5x5のグリッド（中心が0,0）
    for (let y = -2; y <= 2; y++) {
      const row: boolean[] = [];
      for (let x = -2; x <= 2; x++) {
        const isInPattern = pattern.some(pos => pos.x === x && pos.y === y);
        row.push(isInPattern);
      }
      grid.push(row);
    }
    return grid;
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
  {@const expansionPattern = getExpansionPattern(selectedDice)}
  {@const expansionGrid = generateExpansionGrid(expansionPattern)}
  <div class="modal-overlay" on:click={closeDetail}>
    <div class="modal-content" on:click|stopPropagation>
      <button class="close-btn" on:click={closeDetail}>×</button>
      
      <!-- モンスター名 -->
      <div class="detail-header">
        <h2 class="monster-name">{selectedDice.dice.monster.name}</h2>
        <div class="dice-level-large">Lv.{selectedDice.dice.level}</div>
      </div>

      <div class="detail-body">
        <!-- ステータス -->
        <div class="stats-section">
          <h3>ステータス</h3>
          <div class="stats-grid">
            <div class="stat-item">
              <span class="stat-label">攻撃力:</span>
              <span class="stat-value">{selectedDice.dice.monster.attack}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">防御力:</span>
              <span class="stat-value">{selectedDice.dice.monster.defense}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">HP:</span>
              <span class="stat-value">{selectedDice.dice.monster.hp}</span>
            </div>
          </div>
        </div>

        <!-- ロールした面 -->
        <div class="rolled-face-section">
          <h3>ロールした面</h3>
          <div class="rolled-face-display">
            <div class="face-icon" style="color: {getCrestColor(selectedDice.rolledFace.crestType)}">
              {getCrestIcon(selectedDice.rolledFace.crestType)}
            </div>
            <div class="face-details">
              <div class="face-type">{getCrestText(selectedDice.rolledFace.crestType)}</div>
              {#if selectedDice.rolledFace.crestType === 'summon'}
                <div class="face-summon">☆{selectedDice.rolledFace.summonNumber}</div>
              {/if}
              {#if selectedDice.rolledFace.multiplier && selectedDice.rolledFace.multiplier > 1}
                <div class="face-multiplier">×{selectedDice.rolledFace.multiplier}</div>
              {/if}
            </div>
          </div>
        </div>

        <!-- 特殊能力 -->
        {#if selectedDice.dice.monster.abilities && selectedDice.dice.monster.abilities.length > 0}
          <div class="abilities-section">
            <h3>特殊能力</h3>
            {#each selectedDice.dice.monster.abilities as ability}
              <div class="ability-item">
                <div class="ability-effect">{ability.effect}</div>
                {#if ability.cost}
                  <div class="ability-cost">
                    コスト: {JSON.stringify(ability.cost).replace(/[{}]/g, '').replace(/"/g, '')}
                  </div>
                {/if}
              </div>
            {/each}
          </div>
        {/if}

        <!-- 展開パターン -->
        <div class="expansion-section">
          <h3>展開パターン</h3>
          <div class="expansion-grid">
            {#each expansionGrid as row, y}
              <div class="expansion-row">
                {#each row as cell, x}
                  {@const isCenter = y === 2 && x === 2}
                  <div class="expansion-cell {cell ? 'active' : ''} {isCenter ? 'center' : ''}">
                    {#if isCenter}
                      🐉
                    {:else if cell}
                      ▪
                    {/if}
                  </div>
                {/each}
              </div>
            {/each}
          </div>
          <div class="expansion-info">
            中心🐉がモンスター配置位置、▪がダンジョン領域
          </div>
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

  .selection-info {
    background: rgba(76, 175, 80, 0.3);
    padding: 8px;
    border-radius: 8px;
    margin-bottom: 12px;
    text-align: center;
    font-weight: bold;
    border: 2px solid #4caf50;
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

  .dice-card.selectable {
    border-color: gold !important;
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
  }

  .dice-card.selected {
    background: rgba(76, 175, 80, 0.5);
    border-color: #4caf50 !important;
    transform: scale(0.95);
  }

  .dice-card:hover {
    transform: scale(1.05);
    background: rgba(255, 255, 255, 0.3);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }

  .dice-card.selected:hover {
    transform: scale(1);
  }

  .selected-badge {
    position: absolute;
    top: 2px;
    left: 2px;
    background: #4caf50;
    color: white;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: bold;
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
    max-width: 500px;
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

  .monster-name {
    margin: 0 0 10px 0;
    font-size: 1.6rem;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  .dice-level-large {
    font-size: 1.1rem;
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

  .stats-section,
  .rolled-face-section,
  .abilities-section,
  .expansion-section {
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  }

  .stats-section:last-child,
  .rolled-face-section:last-child,
  .abilities-section:last-child,
  .expansion-section:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  h3 {
    margin: 0 0 12px 0;
    font-size: 1.1rem;
    color: #ffd700;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .stat-item {
    background: rgba(255, 255, 255, 0.1);
    padding: 10px;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .stat-label {
    font-size: 0.9rem;
  }

  .stat-value {
    font-size: 1.3rem;
    font-weight: bold;
  }

  .rolled-face-display {
    display: flex;
    align-items: center;
    gap: 15px;
    background: rgba(255, 255, 255, 0.1);
    padding: 15px;
    border-radius: 8px;
  }

  .face-icon {
    font-size: 3rem;
  }

  .face-details {
    flex: 1;
  }

  .face-type {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .face-summon {
    font-size: 1.1rem;
    color: gold;
  }

  .face-multiplier {
    font-size: 1rem;
    color: #ff6b6b;
  }

  .abilities-section {
  }

  .ability-item {
    background: rgba(255, 255, 255, 0.1);
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 10px;
  }

  .ability-item:last-child {
    margin-bottom: 0;
  }

  .ability-effect {
    font-size: 0.95rem;
    line-height: 1.5;
    margin-bottom: 5px;
  }

  .ability-cost {
    font-size: 0.85rem;
    color: #ffd700;
    font-style: italic;
  }

  .expansion-grid {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }

  .expansion-row {
    display: flex;
    gap: 2px;
  }

  .expansion-cell {
    width: 30px;
    height: 30px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
  }

  .expansion-cell.active {
    background: rgba(100, 200, 255, 0.4);
    border-color: rgba(100, 200, 255, 0.8);
  }

  .expansion-cell.center {
    background: rgba(255, 100, 100, 0.5);
    border-color: rgba(255, 100, 100, 0.9);
    font-size: 1.5rem;
  }

  .expansion-info {
    margin-top: 10px;
    font-size: 0.85rem;
    text-align: center;
    opacity: 0.8;
  }
</style>
