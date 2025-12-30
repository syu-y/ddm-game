<script lang="ts">
  import { goto } from '$app/navigation';
  import { createRoom, joinRoom } from '$lib/stores/game-store';

  let name = '';
  let roomIdInput = '';
  let mode: 'menu' | 'create' | 'join' = 'menu';
  let loading = false;

  async function handleCreateRoom() {
    if (!name.trim()) {
      alert('名前を入力してください');
      return;
    }
    
    loading = true;
    try {
      const newRoomId = await createRoom(name);
      goto(`/game/${newRoomId}`);
    } catch (error) {
      alert('ルーム作成に失敗しました');
      loading = false;
    }
  }

  async function handleJoinRoom() {
    if (!name.trim() || !roomIdInput.trim()) {
      alert('名前とルームIDを入力してください');
      return;
    }
    
    loading = true;
    try {
      const success = await joinRoom(roomIdInput, name);
      if (success) {
        goto(`/game/${roomIdInput}`);
      } else {
        alert('ルームへの参加に失敗しました');
        loading = false;
      }
    } catch (error) {
      alert('接続エラーが発生しました');
      loading = false;
    }
  }
</script>

<div class="container">
  <h1>⚔️ ダンジョンダイスモンスターズ</h1>

  {#if mode === 'menu'}
    <div class="menu">
      <button class="btn btn-primary" on:click={() => mode = 'create'}>
        🎲 ルームを作成
      </button>
      <button class="btn btn-secondary" on:click={() => mode = 'join'}>
        🚪 ルームに参加
      </button>
    </div>
  {:else if mode === 'create'}
    <div class="form">
      <h2>ルームを作成</h2>
      <input
        type="text"
        placeholder="あなたの名前"
        bind:value={name}
        maxlength="20"
      />
      <div class="buttons">
        <button class="btn btn-primary" on:click={handleCreateRoom} disabled={loading}>
          {loading ? '作成中...' : '作成する'}
        </button>
        <button class="btn btn-back" on:click={() => mode = 'menu'} disabled={loading}>
          戻る
        </button>
      </div>
    </div>
  {:else if mode === 'join'}
    <div class="form">
      <h2>ルームに参加</h2>
      <input
        type="text"
        placeholder="あなたの名前"
        bind:value={name}
        maxlength="20"
      />
      <input
        type="text"
        placeholder="ルームID"
        bind:value={roomIdInput}
        maxlength="8"
      />
      <div class="buttons">
        <button class="btn btn-primary" on:click={handleJoinRoom} disabled={loading}>
          {loading ? '参加中...' : '参加する'}
        </button>
        <button class="btn btn-back" on:click={() => mode = 'menu'} disabled={loading}>
          戻る
        </button>
      </div>
    </div>
  {/if}
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 20px;
  }

  h1 {
    color: white;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }

  .menu {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    min-width: 300px;
  }

  .form {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    min-width: 350px;
  }

  .form h2 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: #333;
  }

  input {
    width: 100%;
    padding: 12px;
    margin-bottom: 1rem;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s;
    box-sizing: border-box;
  }

  input:focus {
    outline: none;
    border-color: #667eea;
  }

  .buttons {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
  }

  .btn {
    flex: 1;
    padding: 12px 24px;
    font-size: 1.1rem;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
  }

  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
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
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;
  }

  .btn-secondary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(245, 87, 108, 0.4);
  }

  .btn-back {
    background: #e0e0e0;
    color: #666;
  }

  .btn-back:hover:not(:disabled) {
    background: #d0d0d0;
  }
</style>
