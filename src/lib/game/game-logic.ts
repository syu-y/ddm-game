import type { GameState, Player } from './types';
import { createEmptyBoard, setPlayerPositions } from './board';
import { createDicePool } from './dice';

// ゲーム状態を初期化
export function initializeGame(
  gameId: string,
  player1Id: string,
  player1Name: string,
  player2Id: string,
  player2Name: string
): GameState {
  // プレイヤー1を作成
  const player1: Player = {
    id: player1Id,
    name: player1Name,
    lifePoints: 3,
    dicePool: createDicePool(player1Id),
    hand: [],
    position: { x: 0, y: 0 } // 後で設定
  };

  // プレイヤー2を作成
  const player2: Player = {
    id: player2Id,
    name: player2Name,
    lifePoints: 3,
    dicePool: createDicePool(player2Id),
    hand: [],
    position: { x: 0, y: 0 } // 後で設定
  };

  // 盤面を作成
  const board = createEmptyBoard();
  setPlayerPositions(board, player1, player2);

  // ゲーム状態を返す
  return {
    id: gameId,
    players: [player1, player2],
    board,
    currentTurn: player1Id, // プレイヤー1から開始
    phase: 'roll'
  };
}

// プレイヤーを取得
export function getPlayer(state: GameState, playerId: string): Player | undefined {
  return state.players.find(p => p.id === playerId);
}

// 相手プレイヤーを取得
export function getOpponent(state: GameState, playerId: string): Player | undefined {
  return state.players.find(p => p.id !== playerId);
}

// 現在のプレイヤーを取得
export function getCurrentPlayer(state: GameState): Player {
  return state.players.find(p => p.id === state.currentTurn)!;
}

// ターンを交代
export function switchTurn(state: GameState): void {
  const currentIndex = state.players.findIndex(p => p.id === state.currentTurn);
  const nextIndex = (currentIndex + 1) % state.players.length;
  state.currentTurn = state.players[nextIndex].id;
  state.phase = 'roll';
}
