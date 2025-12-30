<script lang="ts">
  import { onMount } from 'svelte';
  import type { RolledDice, Crest } from '$lib/game/types';

  export let results: RolledDice[] = [];
  export let onComplete: () => void = () => {};

  let showResults = false;
  let animationPhase: 'rolling' | 'revealing' = 'rolling';

  onMount(() => {
    // 2秒間ダイスを回転
    setTimeout(() => {
      animationPhase = 'revealing';
      showResults = true;
    }, 2000);

    // 3秒後に完了
    setTimeout(() => {
      onComplete();
    }, 3000);
  });

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

<div class="animation-overlay">
  <div class="animation-container">
    <h2 class="title">🎲 ダイスロール 🎲</h2>
    
    <div class="dice-container">
      {#if animationPhase === 'rolling'}
        <!-- ローリング中 -->
        <div class="dice rolling">🎲</div>
        <div class="dice rolling" style="animation-delay: 0.2s;">🎲</div>
        <div class="dice rolling" style="animation-delay: 0.4s;">🎲</div>
      {:else}
        <!-- 結果表示 -->
        {#each results as dice, i}
          <div class="dice-result" style="animation-delay: {i * 0.2}s;">
            <div class="result-icon">{getFaceIcon(dice)}</div>
            <div class="result-type">{getFaceTypeText(dice.face.type)}</div>
            {#if dice.face.level}
              <div class="result-level">Lv.{dice.face.level}</div>
            {/if}
            {#if dice.face.crest}
              <div 
                class="result-crest" 
                style="background-color: {getCrestColor(dice.face.crest)}"
              >
                {getCrestText(dice.face.crest)}
              </div>
            {/if}
          </div>
        {/each}
      {/if}
    </div>
    
    {#if showResults}
      <p class="message">手札に追加されました！</p>
    {/if}
  </div>
</div>

<style>
  .animation-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    animation: fadeIn 1.0s;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .animation-container {
    text-align: center;
    color: white;
  }

  .title {
    font-size: 2.5rem;
    margin-bottom: 3rem;
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
    animation: pulse 1s infinite;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  .dice-container {
    display: flex;
    gap: 30px;
    justify-content: center;
    align-items: center;
    min-height: 200px;
  }

  /* ローリング中のダイス */
  .dice {
    font-size: 6rem;
    animation: spin3d 0.5s linear infinite;
  }

  @keyframes spin3d {
    0% { transform: rotateX(0deg) rotateY(0deg); }
    25% { transform: rotateX(90deg) rotateY(90deg); }
    50% { transform: rotateX(180deg) rotateY(180deg); }
    75% { transform: rotateX(270deg) rotateY(270deg); }
    100% { transform: rotateX(360deg) rotateY(360deg); }
  }

  /* 結果表示 */
  .dice-result {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 16px;
    padding: 20px;
    min-width: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    animation: slideIn 0.5s ease-out;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  }

  @keyframes slideIn {
    from {
      transform: translateY(-100px) scale(0.5);
      opacity: 0;
    }
    to {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
  }

  .result-icon {
    font-size: 4rem;
    animation: bounce 0.5s;
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }

  .result-type {
    font-size: 1.2rem;
    font-weight: bold;
  }

  .result-level {
    font-size: 1rem;
    background: rgba(255, 255, 255, 0.3);
    padding: 4px 12px;
    border-radius: 12px;
    font-weight: bold;
  }

  .result-crest {
    font-size: 0.9rem;
    padding: 4px 12px;
    border-radius: 12px;
    font-weight: bold;
  }

  .message {
    margin-top: 3rem;
    font-size: 1.5rem;
    animation: fadeInUp 0.5s;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
