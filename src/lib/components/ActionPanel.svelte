<script lang="ts">
  import type { GamePhase } from '$lib/game/types';
  import { rollDice, endPhase, endTurn } from '$lib/stores/game-store';

  export let phase: GamePhase;
  export let isYourTurn: boolean;

  function handleRollDice() {
    rollDice();
  }

  function handleEndPhase() {
    endPhase();
  }

  function handleEndTurn() {
    endTurn();
  }
</script>

<div class="action-panel">
  <div class="panel-content">
    <!-- 左側: ターン・フェーズ情報 -->
    <div class="phase-info">
      <div class="turn-indicator {isYourTurn ? 'active' : 'waiting'}">
        {#if isYourTurn}
          <span class="indicator-dot"></span>
          <span class="turn-text">あなたのターン</span>
        {:else}
          <span class="turn-text">相手のターン</span>
        {/if}
      </div>
      
      {#if isYourTurn}
        <div class="phase-name">{getPhaseText(phase)}</div>
      {/if}
    </div>

    <!-- 右側: アクションボタン -->
    <div class="actions">
      {#if isYourTurn}
        {#if phase === 'roll'}
          <button class="btn btn-primary btn-large" on:click={handleRollDice}>
            <span class="btn-icon">🎲</span>
            <span>ダイスロール</span>
          </button>
        {:else if phase === 'summon'}
          <button class="btn btn-primary" disabled>
            <span class="btn-icon">✨</span>
            <span>召喚</span>
          </button>
          <button class="btn btn-secondary" on:click={handleEndPhase}>
            フェーズ終了
          </button>
        {:else if phase === 'movement'}
          <button class="btn btn-primary" disabled>
            <span class="btn-icon">👣</span>
            <span>移動</span>
          </button>
          <button class="btn btn-secondary" on:click={handleEndPhase}>
            フェーズ終了
          </button>
        {:else if phase === 'battle'}
          <button class="btn btn-primary" disabled>
            <span class="btn-icon">⚔️</span>
            <span>攻撃</span>
          </button>
          <button class="btn btn-secondary" on:click={handleEndPhase}>
            フェーズ終了
          </button>
        {/if}
        
        {#if phase !== 'roll'}
          <button class="btn btn-end" on:click={handleEndTurn}>
            <span class="btn-icon">🏁</span>
            <span>ターン終了</span>
          </button>
        {/if}
      {:else}
        <div class="waiting-message">
          <div class="waiting-spinner"></div>
          <p>相手の行動を待っています...</p>
        </div>
      {/if}
    </div>
  </div>
</div>

<script lang="ts" context="module">
  function getPhaseText(phase: GamePhase): string {
    const texts: Record<GamePhase, string> = {
      waiting: '待機中',
      roll: 'ダイスロール',
      summon: '召喚フェーズ',
      movement: '移動フェーズ',
      battle: '戦闘フェーズ',
      end: '終了',
      gameover: 'ゲーム終了'
    };
    return texts[phase] || phase;
  }
</script>

<style>
  .action-panel {
    width: 100%;
    max-width: 1200px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 15px 20px;
    border-radius: 12px;
    color: white;
  }

  .panel-content {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  /* フェーズ情報（左側） */
  .phase-info {
    min-width: 200px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .turn-indicator {
    font-size: 1.1rem;
    font-weight: bold;
    padding: 10px 15px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .turn-indicator.active {
    background: rgba(76, 175, 80, 0.3);
    border: 2px solid #4caf50;
  }

  .turn-indicator.waiting {
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.3);
  }

  .indicator-dot {
    width: 10px;
    height: 10px;
    background: #4caf50;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  .turn-text {
    flex: 1;
  }

  .phase-name {
    font-size: 0.9rem;
    opacity: 0.8;
    padding-left: 15px;
  }

  /* アクションボタン（右側） */
  .actions {
    flex: 1;
    display: flex;
    gap: 10px;
    justify-content: flex-end;
  }

  .btn {
    padding: 12px 20px;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-width: 120px;
  }

  .btn-large {
    min-width: 200px;
    padding: 14px 24px;
  }

  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .btn-icon {
    font-size: 1.2rem;
  }

  .btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }

  .btn-primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }

  .btn-secondary {
    background: rgba(255, 255, 255, 0.2);
    color: white;
  }

  .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  .btn-end {
    background: #f44336;
    color: white;
  }

  .btn-end:hover {
    background: #d32f2f;
    transform: translateY(-2px);
  }

  .waiting-message {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 0 20px;
  }

  .waiting-spinner {
    width: 30px;
    height: 30px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .waiting-message p {
    margin: 0;
    opacity: 0.8;
    font-size: 1rem;
  }

  /* レスポンシブ対応 */
  @media (max-width: 1024px) {
    .panel-content {
      flex-direction: column;
      align-items: stretch;
    }

    .phase-info {
      min-width: auto;
      width: 100%;
    }

    .actions {
      justify-content: stretch;
      flex-wrap: wrap;
    }

    .btn {
      flex: 1;
    }
  }
</style>
