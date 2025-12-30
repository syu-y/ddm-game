import type { ViteDevServer, Plugin } from 'vite';
import { Server as SocketIOServer } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import { initializeGame } from './src/lib/game/game-logic';
import { processAction } from './src/lib/game/actions';
import type { GameState, GameAction } from './src/lib/game/types';

interface ClientToServerEvents {
  'create-room': (playerName: string, callback: (roomId: string) => void) => void;
  'join-room': (roomId: string, playerName: string, callback: (success: boolean) => void) => void;
  'game-action': (action: GameAction) => void;
  'leave-room': () => void;
}

interface ServerToClientEvents {
  'game-state': (state: GameState) => void;
  'player-joined': (playerName: string) => void;
  'player-left': () => void;
  'error': (message: string) => void;
  'game-start': () => void;
}

interface Room {
  id: string;
  players: Array<{ socketId: string; name: string }>;
  gameState?: GameState;
}

const rooms = new Map<string, Room>();

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

        // 対戦相手に通知
        socket.to(roomId).emit('player-joined', playerName);

        // ゲーム開始（2人揃った）
        if (room.players.length === 2) {
          console.log(`🎮 ゲーム開始: ${roomId}`);
          console.log(`プレイヤー1: ${room.players[0].name} (${room.players[0].socketId})`);
          console.log(`プレイヤー2: ${room.players[1].name} (${room.players[1].socketId})`);

          // ゲーム状態を初期化
          const [player1, player2] = room.players;
          room.gameState = initializeGame(
            roomId,
            player1.socketId,
            player1.name,
            player2.socketId,
            player2.name
          );

          // 両プレイヤーにゲーム開始を通知
          io.to(roomId).emit('game-start');
          console.log('✉️ game-start イベント送信');

          // 両プレイヤーにゲーム状態を送信
          io.to(roomId).emit('game-state', room.gameState);
          console.log('✉️ game-state イベント送信');
        }

        console.log(`👥 ルーム参加: ${roomId} by ${playerName}`);
      });

      // ゲームアクション
      socket.on('game-action', (action) => {
        const roomId = findRoomBySocketId(socket.id);
        if (!roomId) return;

        const room = rooms.get(roomId);
        if (!room || !room.gameState) return;

        // アクションを処理
        const success = processAction(room.gameState, action, socket.id);

        if (success) {
          // 更新されたゲーム状態を両プレイヤーに送信
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
        leaveAllRooms(socket.id);
      });

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

            // ルームが空になったら削除
            if (room.players.length === 0) {
              rooms.delete(roomId);
              console.log(`🗑️ ルーム削除: ${roomId}`);
            } else {
              // 残りのプレイヤーに通知
              io.to(roomId).emit('player-left');
            }
          }
        });
      }
    });
  }
};
