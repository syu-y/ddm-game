import type { GameState, GameAction, RolledDice, CrestType } from './types';
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

    case 'END_PHASE':
      return handleEndPhase(state);

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
      dice: dice,
      rolledFace: face,
      owner: player.id
    });

    // クレストを溜める（召喚クレスト以外）
    if (face.crestType !== 'summon') {
      addCrestToPool(player, face.crestType, face.multiplier || 1);
    }

    console.log(`ダイスロール[${i + 1}]: ${face.crestType}`, face);
  }

  // 手札に追加
  player.hand.push(...rolledDice);

  console.log(`手札に追加: ${rolledDice.length}個のダイス`);
  console.log(`現在の手札: ${player.hand.length}枚`);
  console.log('クレストプール:', player.crests);

  // 次のフェーズへ
  state.phase = 'summon';

  return true;
}

// クレストをプールに追加
function addCrestToPool(player: import('./types').Player, crestType: CrestType, amount: number): void {
  switch (crestType) {
    case 'attack':
      player.crests.attack += amount;
      break;
    case 'defense':
      player.crests.defense += amount;
      break;
    case 'movement':
      player.crests.movement += amount;
      break;
    case 'magic':
      player.crests.magic += amount;
      break;
    case 'trap':
      player.crests.trap += amount;
      break;
  }
}

// フェーズ終了処理
function handleEndPhase(state: GameState): boolean {
  switch (state.phase) {
    case 'summon':
      state.phase = 'movement';
      break;
    case 'movement':
      state.phase = 'battle';
      break;
    case 'battle':
      state.phase = 'end';
      break;
    default:
      return false;
  }

  console.log(`フェーズ移行: ${state.phase}`);
  return true;
}

// ターン終了処理
function handleEndTurn(state: GameState): boolean {
  const currentIndex = state.players.findIndex(p => p.id === state.currentTurn);
  const nextIndex = (currentIndex + 1) % state.players.length;

  // 現在のプレイヤーの手札をクリア
  const currentPlayer = state.players[currentIndex];
  currentPlayer.hand = [];

  // ターン交代
  state.currentTurn = state.players[nextIndex].id;
  state.phase = 'roll';

  console.log(`ターン交代: ${state.players[nextIndex].name}のターン`);
  console.log(`${currentPlayer.name}の手札をクリア（クレストは保持）`);

  return true;
}
