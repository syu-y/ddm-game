import type { GameState, GameAction, RolledDice, CrestType, DeployedMonster } from './types';
import { getCurrentPlayer } from './game-logic';
import { rollDice } from './dice';
import { canDeployAt, setTile } from './board';

// ゲームアクションを処理
export function processAction(state: GameState, action: GameAction, playerId: string): boolean {
  // 自分のターンでない場合は無視
  if (state.currentTurn !== playerId) {
    return false;
  }

  switch (action.type) {
    case 'ROLL_DICE':
      return handleRollDice(state);

    case 'SUMMON_MONSTER':
      return handleSummonMonster(state, action.diceIds, action.position, playerId);

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

// モンスター召喚処理
function handleSummonMonster(
  state: GameState,
  diceIds: string[],
  position: import('./types').Position,
  playerId: string
): boolean {
  if (state.phase !== 'summon') {
    console.log('召喚フェーズではありません');
    return false;
  }

  const player = getCurrentPlayer(state);

  // 最低2つのダイスが必要
  if (diceIds.length < 2) {
    console.log('召喚には最低2つのダイスが必要です');
    return false;
  }

  // 手札から該当するダイスを取得
  const selectedDice = diceIds.map(id =>
    player.hand.find(rd => rd.dice.id === id)
  ).filter(rd => rd !== undefined) as RolledDice[];

  if (selectedDice.length !== diceIds.length) {
    console.log('指定されたダイスが手札にありません');
    return false;
  }

  // すべて召喚クレストで、同じ数字か確認
  const summonNumbers = selectedDice.map(rd => {
    if (rd.rolledFace.crestType !== 'summon' || !rd.rolledFace.summonNumber) {
      return null;
    }
    return rd.rolledFace.summonNumber;
  });

  if (summonNumbers.some(num => num === null)) {
    console.log('すべて召喚クレストである必要があります');
    return false;
  }

  const firstNumber = summonNumbers[0];
  if (!summonNumbers.every(num => num === firstNumber)) {
    console.log('すべて同じ召喚数字である必要があります');
    return false;
  }

  // 配置可能な位置か確認
  if (!canDeployAt(state.board, position, playerId)) {
    console.log('その位置には配置できません');
    return false;
  }

  // 最初のダイスをモンスターとして召喚
  const summonedDice = selectedDice[0];
  const deployedMonster: DeployedMonster = {
    diceId: summonedDice.dice.id,
    monster: summonedDice.dice.monster!,
    level: summonedDice.dice.level,
    position: position,
    owner: playerId,
    hp: summonedDice.dice.monster!.defense
  };

  // 盤面に配置
  setTile(state.board, {
    position: position,
    type: 'monster',
    owner: playerId,
    deployedMonster: deployedMonster
  });

  // 使用したダイスを手札から削除
  diceIds.forEach(id => {
    const index = player.hand.findIndex(rd => rd.dice.id === id);
    if (index !== -1) {
      player.hand.splice(index, 1);
    }
  });

  console.log(`モンスター召喚成功: ${deployedMonster.monster.name} (Lv${deployedMonster.level})`);
  console.log(`  位置: (${position.x}, ${position.y})`);
  console.log(`  攻撃力: ${deployedMonster.monster.attack}`);
  console.log(`  防御力: ${deployedMonster.monster.defense}`);
  console.log(`  使用したダイス: ${diceIds.length}個`);

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
