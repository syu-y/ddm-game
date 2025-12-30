import type { GameState, GameAction, RolledDice } from './types';
import { getCurrentPlayer } from './game-logic';
import { rollDice } from './dice';

// ゲームアクションを処理
export function processAction(state: GameState, action: GameAction, playerId: string): boolean {
  // 自分のターンでない場合は無視
  if (state.currentTurn !== playerId) {
    return false;
  }

  switch (action.type) {
    case 'ROLL_DICE':
      return handleRollDice(state);

    case 'END_TURN':
      return handleEndTurn(state);

    default:
      return false;
  }
}

// ダイスロール処理
function handleRollDice(state: GameState): boolean {
  if (state.phase !== 'roll') {
    return false;
  }

  const player = getCurrentPlayer(state);

  // ダイスプールが空の場合
  if (player.dicePool.length === 0) {
    console.log('ダイスプールが空です');
    return false;
  }

  // 3つのダイスをロール
  const rollCount = Math.min(3, player.dicePool.length);
  const rolledDice: RolledDice[] = [];

  for (let i = 0; i < rollCount; i++) {
    const dice = player.dicePool.pop()!;
    const face = rollDice(dice);

    rolledDice.push({
      diceId: dice.id,
      face: face,
      owner: player.id
    });

    console.log(`ダイスロール[${i + 1}]: ${face.type}`, face);
  }

  // 手札に追加
  player.hand.push(...rolledDice);

  console.log(`手札に追加: ${rolledDice.length}個のダイス`);
  console.log(`現在の手札: ${player.hand.length}枚`);

  // 次のフェーズへ
  state.phase = 'summon';

  return true;
}

// ターン終了処理
function handleEndTurn(state: GameState): boolean {
  const currentIndex = state.players.findIndex(p => p.id === state.currentTurn);
  const nextIndex = (currentIndex + 1) % state.players.length;

  state.currentTurn = state.players[nextIndex].id;
  state.phase = 'roll';

  console.log(`ターン交代: ${state.players[nextIndex].name}のターン`);

  return true;
}
