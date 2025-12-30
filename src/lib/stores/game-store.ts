import { writable, get } from 'svelte/store';
import type { GameState, GameAction, RolledDice } from '$lib/game/types';
import { io, type Socket } from 'socket.io-client';
import type { ClientToServerEvents, ServerToClientEvents } from '$lib/server/socket-types';

type SocketType = Socket<ServerToClientEvents, ClientToServerEvents>;

// ゲーム状態
export const gameState = writable<GameState | null>(null);
export const socket = writable<SocketType | null>(null);
export const roomId = writable<string | null>(null);
export const playerId = writable<string | null>(null);
export const playerName = writable<string>('');
export const connectionStatus = writable<'disconnected' | 'connecting' | 'connected'>('disconnected');
export const gameStarted = writable<boolean>(false);

// ダイスロールアニメーション用
export const isRolling = writable<boolean>(false);
export const rolledResults = writable<RolledDice[]>([]);

let rollAnimationTimer: number | null = null;
let previousHandSize = 0;

// Socket.io接続
export function connectSocket() {
  const socketInstance = io('http://localhost:5173');

  socketInstance.on('connect', () => {
    console.log('WebSocket接続成功');
    connectionStatus.set('connected');
    playerId.set(socketInstance.id);
  });

  socketInstance.on('disconnect', () => {
    console.log('WebSocket切断');
    connectionStatus.set('disconnected');
  });

  socketInstance.on('game-state', (state) => {
    console.log('ゲーム状態更新:', state);

    const currentPlayerId = get(playerId);
    const player = state.players.find(p => p.id === currentPlayerId);

    // ロールアニメーション中で、手札が増えた場合
    if (get(isRolling) && player) {
      const currentHandSize = player.hand.length;

      // 手札が増えていたら、新しいダイスを結果として設定
      if (currentHandSize > previousHandSize) {
        const newDice = player.hand.slice(previousHandSize);
        console.log('ロール結果を設定:', newDice);
        rolledResults.set(newDice);
        previousHandSize = currentHandSize;
      }
    }

    gameState.set(state);
  });

  socketInstance.on('game-start', () => {
    console.log('🎮 ゲーム開始イベント受信');
    gameStarted.set(true);
  });

  socketInstance.on('player-joined', (playerName) => {
    console.log(`👥 ${playerName} が参加しました`);
  });

  socketInstance.on('player-left', () => {
    console.log('👋 対戦相手が退出しました');
    alert('対戦相手が退出しました');
  });

  socketInstance.on('error', (message) => {
    console.error('エラー:', message);
    alert(`エラー: ${message}`);
  });

  socket.set(socketInstance);
  return socketInstance;
}

// ルーム作成
export async function createRoom(name: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const socketInstance = connectSocket();

    socketInstance.emit('create-room', name, (newRoomId) => {
      roomId.set(newRoomId);
      playerName.set(name);
      console.log(`ルーム作成成功: ${newRoomId}`);
      resolve(newRoomId);
    });
  });
}

// ルーム参加
export async function joinRoom(id: string, name: string): Promise<boolean> {
  return new Promise((resolve) => {
    const socketInstance = connectSocket();

    socketInstance.emit('join-room', id, name, (success) => {
      if (success) {
        roomId.set(id);
        playerName.set(name);
        console.log(`ルーム参加成功: ${id}`);
      }
      resolve(success);
    });
  });
}

// ゲームアクションを送信
export function sendGameAction(action: GameAction) {
  const currentSocket = get(socket);

  if (currentSocket) {
    console.log('アクション送信:', action);
    currentSocket.emit('game-action', action);
  } else {
    console.error('Socket未接続');
  }
}

// ダイスロール（アニメーション付き）
export function rollDice() {
  console.log('ダイスロール開始');

  // 既存のタイマーをクリア
  if (rollAnimationTimer !== null) {
    clearTimeout(rollAnimationTimer);
  }

  // 現在の手札サイズを記録
  const state = get(gameState);
  const player = state?.players.find(p => p.id === get(playerId));
  previousHandSize = player?.hand.length || 0;

  // アニメーション開始
  isRolling.set(true);
  rolledResults.set([]);

  // サーバーにダイスロールを送信
  sendGameAction({ type: 'ROLL_DICE' });

  // 3秒後に確実にアニメーション終了
  rollAnimationTimer = window.setTimeout(() => {
    console.log('アニメーション終了');
    isRolling.set(false);
    rolledResults.set([]);
    rollAnimationTimer = null;
  }, 3000);
}

// フェーズ終了
export function endPhase() {
  sendGameAction({ type: 'END_PHASE' });
}

// ターン終了
export function endTurn() {
  sendGameAction({ type: 'END_TURN' });
}
