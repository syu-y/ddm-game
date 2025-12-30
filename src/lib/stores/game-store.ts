/* eslint-disable @typescript-eslint/no-unused-vars */
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

// Socket.io接続
export function connectSocket() {
  const socketInstance = io('http://localhost:5173');

  socketInstance.on('connect', () => {
    console.log('WebSocket接続成功');
    connectionStatus.set('connected');
    playerId.set(socketInstance.id ? socketInstance.id : null);
  });

  socketInstance.on('disconnect', () => {
    console.log('WebSocket切断');
    connectionStatus.set('disconnected');
  });

  socketInstance.on('game-state', (state) => {
    console.log('ゲーム状態更新:', state);
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

    socketInstance.emit('create-room', name, (newRoomId: string) => {
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

    socketInstance.emit('join-room', id, name, (success: boolean) => {
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
  // アニメーション開始前に現在の手札をキャプチャ
  const currentState = get(gameState);
  const currentPlayer = currentState?.players.find(p => p.id === get(playerId));
  const beforeHandCount = currentPlayer?.hand.length || 0;

  // アニメーション開始
  isRolling.set(true);

  // サーバーにダイスロールを送信
  sendGameAction({ type: 'ROLL_DICE' });

  // ゲーム状態の更新を監視
  const unsubscribe = gameState.subscribe((state) => {
    if (!state) return;

    const player = state.players.find(p => p.id === get(playerId));
    if (!player) return;

    // 手札が増えたらアニメーション用の結果を設定
    if (player.hand.length > beforeHandCount) {
      const newDice = player.hand.slice(beforeHandCount);
      rolledResults.set(newDice);

      // アニメーション完了後にクリーンアップ
      setTimeout(() => {
        isRolling.set(false);
        rolledResults.set([]);
        unsubscribe();
      }, 5000); // 5秒後にアニメーション終了
    }
  });
}

// ターン終了
export function endTurn() {
  sendGameAction({ type: 'END_TURN' });
}
