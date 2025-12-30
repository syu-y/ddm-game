import type { GameState, GameAction } from '$lib/game/types';

// クライアント→サーバー
export interface ClientToServerEvents {
  'create-room': (playerName: string, callback: (roomId: string) => void) => void;
  'join-room': (roomId: string, playerName: string, callback: (success: boolean) => void) => void;
  'game-action': (action: GameAction) => void;
  'leave-room': () => void;
}

// サーバー→クライアント
export interface ServerToClientEvents {
  'game-state': (state: GameState) => void;
  'player-joined': (playerName: string) => void;
  'player-left': () => void;
  'error': (message: string) => void;
  'game-start': () => void;
}
