/* eslint-disable @typescript-eslint/no-unused-vars */

import type { ViteDevServer, Plugin } from 'vite';
import { Server as SocketIOServer } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import { createGame } from './src/lib/game/game-logic';
import { processAction } from './src/lib/game/actions';
import type { GameState, GameAction } from './src/lib/game/types';

interface ClientToServerEvents {
  'create-room': (playerName: string, callback: (roomId: string) => void) => void;
  'join-room': (roomId: string, playerName: string, callback: (success: boolean) => void) => void;
  'quick-match': (playerName: string, callback: (roomId: string) => void) => void;
  'cancel-quick-match': () => void;
  'game-action': (action: GameAction) => void;
  'leave-room': () => void;
}

interface ServerToClientEvents {
  'game-state': (state: GameState) => void;
  'player-joined': (playerName: string) => void;
  'player-left': () => void;
  'error': (message: string) => void;
  'game-start': () => void;
  'match-found': (roomId: string) => void;
}

interface Room {
  id: string;
  players: Array<{ socketId: string; name: string }>;
  gameState?: GameState;
}

interface MatchmakingPlayer {
  socketId: string;
  name: string;
}

const rooms = new Map<string, Room>();
const matchmakingQueue: MatchmakingPlayer[] = [];

export const webSocketServer: Plugin = {
  name: 'webSocketServer',
  configureServer(server: ViteDevServer) {
    if (!server.httpServer) return;

    const io = new SocketIOServer<ClientToServerEvents, ServerToClientEvents>(server.httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    });

    console.log('✅ WebSocketサーバー起動 (統合モード)');

    io.on('connection', (socket) => {
      console.log('✅ クライアント接続:', socket.id);

      // ルーム作成
      socket.on('create-room', (playerName, callback) => {
        const roomId = uuidv4().substring(0, 8);
        const room: Room = {
          id: roomId,
          players: [{ socketId: socket.id, name: playerName }]
        };
        rooms.set(roomId, room);
        socket.join(roomId);

        console.log(`🎮 ルーム作成: ${roomId} by ${playerName}`);
        callback(roomId);
      });

      // ルーム参加
      socket.on('join-room', (roomId, playerName, callback) => {
        const room = rooms.get(roomId);

        if (!room) {
          console.log(`❌ ルームが見つかりません: ${roomId}`);
          callback(false);
          socket.emit('error', 'ルームが見つかりません');
          return;
        }

        if (room.players.length >= 2) {
          console.log(`❌ ルームが満員: ${roomId}`);
          callback(false);
          socket.emit('error', 'ルームが満員です');
          return;
        }

        room.players.push({ socketId: socket.id, name: playerName });
        socket.join(roomId);
        callback(true);

        socket.to(roomId).emit('player-joined', playerName);

        if (room.players.length === 2) {
          startGame(io, room);
        }

        console.log(`👥 ルーム参加: ${roomId} by ${playerName}`);
      });

      // クイックマッチ
      socket.on('quick-match', (playerName, callback) => {
        console.log(`🎯 クイックマッチ要求: ${playerName} (${socket.id})`);

        // 既にキューにいないか確認
        const existingIndex = matchmakingQueue.findIndex(p => p.socketId === socket.id);
        if (existingIndex !== -1) {
          console.log(`⚠️ 既にキューに存在: ${socket.id}`);
          return;
        }

        // キューに追加
        matchmakingQueue.push({ socketId: socket.id, name: playerName });
        console.log(`📋 マッチングキュー: ${matchmakingQueue.length}人待機中`);

        // 少し遅延させてマッチング処理（ソケットの準備完了を待つ）
        setTimeout(() => {
          // 2人揃ったらマッチング
          if (matchmakingQueue.length >= 2) {
            const player1 = matchmakingQueue.shift()!;
            const player2 = matchmakingQueue.shift()!;

            console.log(`🔍 マッチング処理開始`);
            console.log(`  Player1: ${player1.name} (${player1.socketId})`);
            console.log(`  Player2: ${player2.name} (${player2.socketId})`);

            // ルームを作成
            const roomId = uuidv4().substring(0, 8);
            const room: Room = {
              id: roomId,
              players: [player1, player2]
            };
            rooms.set(roomId, room);

            // 両プレイヤーをルームに参加させる
            const socket1 = io.sockets.sockets.get(player1.socketId);
            const socket2 = io.sockets.sockets.get(player2.socketId);

            console.log(`  Socket1存在: ${!!socket1}`);
            console.log(`  Socket2存在: ${!!socket2}`);

            if (socket1 && socket2) {
              socket1.join(roomId);
              socket2.join(roomId);

              console.log(`  両プレイヤーをルーム ${roomId} に追加`);

              // マッチング成功を通知
              console.log(`  → Player1に match-found 送信`);
              socket1.emit('match-found', roomId);

              console.log(`  → Player2に match-found 送信`);
              socket2.emit('match-found', roomId);

              console.log(`✨ マッチング成功: ${roomId}`);
              console.log(`   Player1: ${player1.name} (${player1.socketId})`);
              console.log(`   Player2: ${player2.name} (${player2.socketId})`);

              // ゲーム開始
              startGame(io, room);
            } else {
              console.error(`❌ ソケットが見つかりません`);
              if (!socket1) console.error(`  Player1のソケット ${player1.socketId} が存在しません`);
              if (!socket2) console.error(`  Player2のソケット ${player2.socketId} が存在しません`);

              // ソケットが見つからない場合、キューに戻す
              if (!socket1) matchmakingQueue.unshift(player1);
              if (!socket2) matchmakingQueue.unshift(player2);
            }
          } else {
            // まだマッチング相手が見つからない
            console.log(`⏳ マッチング待機中: ${playerName}`);
          }
        }, 100); // 100ms遅延
      });

      // クイックマッチキャンセル
      socket.on('cancel-quick-match', () => {
        const index = matchmakingQueue.findIndex(p => p.socketId === socket.id);
        if (index !== -1) {
          matchmakingQueue.splice(index, 1);
          console.log(`❌ マッチングキャンセル: ${socket.id}`);
        }
      });

      // ゲームアクション
      socket.on('game-action', (action) => {
        const roomId = findRoomBySocketId(socket.id);
        if (!roomId) return;

        const room = rooms.get(roomId);
        if (!room || !room.gameState) return;

        const success = processAction(room.gameState, action, socket.id);

        if (success) {
          io.to(roomId).emit('game-state', room.gameState);
          console.log(`アクション処理: ${action.type}`);
        } else {
          socket.emit('error', 'アクションを実行できませんでした');
        }
      });

      // ルーム退出
      socket.on('leave-room', () => {
        console.log(`👋 ルーム退出: ${socket.id}`);
        leaveAllRooms(socket.id);
      });

      // 切断
      socket.on('disconnect', () => {
        console.log('❌ クライアント切断:', socket.id);

        // マッチングキューから削除
        const queueIndex = matchmakingQueue.findIndex(p => p.socketId === socket.id);
        if (queueIndex !== -1) {
          matchmakingQueue.splice(queueIndex, 1);
          console.log(`🗑️ キューから削除: ${socket.id}`);
        }

        leaveAllRooms(socket.id);
      });

      // ヘルパー関数: ゲーム開始
      function startGame(io: SocketIOServer, room: Room) {
        console.log(`🎮 ゲーム開始: ${room.id}`);
        console.log(`プレイヤー1: ${room.players[0].name} (${room.players[0].socketId})`);
        console.log(`プレイヤー2: ${room.players[1].name} (${room.players[1].socketId})`);

        const [player1, player2] = room.players;
        room.gameState = createGame(
          room.id,
          player1.name,
          player2.name,
          player1.socketId,
          player2.socketId,
        );

        io.to(room.id).emit('game-start');
        console.log('✉️ game-start イベント送信');

        io.to(room.id).emit('game-state', room.gameState);
        console.log('✉️ game-state イベント送信');
      }

      // ヘルパー関数: socketIdからルームIDを検索
      function findRoomBySocketId(socketId: string): string | null {
        for (const [roomId, room] of rooms.entries()) {
          if (room.players.some(p => p.socketId === socketId)) {
            return roomId;
          }
        }
        return null;
      }

      // ヘルパー関数: プレイヤーを全ルームから削除
      function leaveAllRooms(socketId: string) {
        rooms.forEach((room, roomId) => {
          const playerIndex = room.players.findIndex(p => p.socketId === socketId);
          if (playerIndex !== -1) {
            room.players.splice(playerIndex, 1);

            if (room.players.length === 0) {
              rooms.delete(roomId);
              console.log(`🗑️ ルーム削除: ${roomId}`);
            } else {
              io.to(roomId).emit('player-left');
            }
          }
        });
      }
    });
  }
};
