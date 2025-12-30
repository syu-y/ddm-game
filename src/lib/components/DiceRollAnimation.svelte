<script lang="ts">
  import { onMount } from 'svelte';
  import type { RolledDice, CrestType } from '$lib/game/types';

  export let results: RolledDice[] = [];

  let showResults = false;
  let animationPhase: 'rolling' | 'revealing' = 'rolling';

  $: {
    // resultsが設定されたら表示フェーズへ
    if (results.length > 0 && animationPhase === 'rolling') {
      setTimeout(() => {
        animationPhase = 'revealing';
        showResults = true;
      }, 100);
    }
  }

  onMount(() => {
    // 2秒待ってから表示フェーズへ（結果がまだない場合）
    const timer = setTimeout(() => {
      if (results.length === 0) {
        console.log('結果待機タイムアウト、ローリング継続');
      } else {
        animationPhase = 'revealing';
        showResults = true;
      }
    }, 2000);

    return () => clearTimeout(timer);
  });

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
</script>

<div class="animation-overlay">
  <div class="animation-container">
    <h2 class="title">🎲 ダイスロール 🎲</h2>
    
    <div class="dice-container">
      {#if animationPhase === 'rolling' || results.length === 0}
        <!-- ローリング中 -->
        <div class="dice rolling">🎲</div>
        <div class="dice rolling" style="animation-delay: 0.2s;">🎲</div>
        <div class="dice rolling" style="animation-delay: 0.4s;">🎲</div>
      {:else}
        <!-- 結果表示 -->
        {#each results as rolledDice, i}
          <div class="dice-result" style="animation-delay: {i * 0.2}s;">
            <div class="result-level">Lv.{rolledDice.dice.level}</div>
            <div class="result-icon">{getCrestIcon(rolledDice.rolledFace.crestType)}</div>
            <div class="result-type">{getCrestText(rolledDice.rolledFace.crestType)}</div>
            {#if rolledDice.rolledFace.crestType === 'summon'}
              <div class="result-summon">☆{rolledDice.rolledFace.summonNumber}</div>
            {/if}
            {#if rolledDice.rolledFace.multiplier && rolledDice.rolledFace.multiplier > 1}
              <div class="result-multiplier">×{rolledDice.rolledFace.multiplier}</div>
            {/if}
          </div>
        {/each}
      {/if}
    </div>
    
    {#if showResults && results.length > 0}
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
    animation: fadeIn 0.3s;
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
    min-height: 250px;
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
    gap: 8px;
    animation: slideIn 0.5s ease-out;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
    position: relative;
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

  .result-level {
    position: absolute;
    top: 8px;
    right: 8px;
    font-size: 0.8rem;
    background: rgba(0, 0, 0, 0.5);
    padding: 3px 8px;
    border-radius: 8px;
    font-weight: bold;
  }

  .result-icon {
    font-size: 4rem;
    animation: bounce 0.5s;
    margin-top: 10px;
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }

  .result-type {
    font-size: 1.2rem;
    font-weight: bold;
  }

  .result-summon {
    font-size: 1.1rem;
    background: rgba(255, 215, 0, 0.5);
    padding: 5px 12px;
    border-radius: 12px;
    font-weight: bold;
  }

  .result-multiplier {
    font-size: 0.9rem;
    background: rgba(255, 100, 100, 0.7);
    padding: 4px 10px;
    border-radius: 8px;
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
