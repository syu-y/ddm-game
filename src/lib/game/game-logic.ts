import type { Dice, GameState, Player } from './types';
import { createDicePoolFromDeck } from './dice';
import { createDefaultDeck } from './deck-builder';
import { createBoard } from './board';

export function createGame(roomId: string, player1Name: string, player2Name: string, player1Id: string, player2Id: string): GameState {
  const board = createBoard();

  // デフォルトデッキを使用（後でカスタマイズ可能に）
  const player1Deck = createDefaultDeck();
  const player2Deck = createDefaultDeck();

  // ダイスプールを生成
  const player1DicePool = shuffleArray(createDicePoolFromDeck(player1Deck, player1Id));
  const player2DicePool = shuffleArray(createDicePoolFromDeck(player2Deck, player2Id));

  const players: Player[] = [
    {
      id: player1Id,
      name: player1Name,
      crests: { attack: 0, defense: 0, movement: 0, magic: 0, trap: 0 },
      dicePool: player1DicePool,
      hand: [],
      masterPosition: { x: 6, y: 0 },
      masterHP: 3
    },
    {
      id: player2Id,
      name: player2Name,
      crests: { attack: 0, defense: 0, movement: 0, magic: 0, trap: 0 },
      dicePool: player2DicePool,
      hand: [],
      masterPosition: { x: 6, y: 12 },
      masterHP: 3
    }
  ];

  // マスターを配置
  board[0][6] = {
    position: { x: 6, y: 0 },
    type: 'master',
    owner: player1Id
  };

  board[12][6] = {
    position: { x: 6, y: 12 },
    type: 'master',
    owner: player2Id
  };

  console.log('ゲーム初期化完了');
  console.log(`プレイヤー1: ${player1Name} (${player1DicePool.length}個のダイス)`);
  console.log(`プレイヤー2: ${player2Name} (${player2DicePool.length}個のダイス)`);

  return {
    roomId,
    players,
    board,
    currentTurn: player1Id,
    phase: 'roll',
    turnCount: 1
  };
}

export function getCurrentPlayer(state: GameState): Player {
  return state.players.find(p => p.id === state.currentTurn)!;
}

export function shuffleArray(array: Dice[]): Dice[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array;
}
