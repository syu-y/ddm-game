import type { Dice, DiceFace, DiceLevel, CrestType, SummonNumber, MonsterInfo } from './types';
import { v4 as uuidv4 } from 'uuid';

// レベルごとの召喚クレスト面数
const SUMMON_FACE_COUNT: Record<DiceLevel, number> = {
  1: 4, // Lv1は召喚クレスト4面
  2: 3, // Lv2は召喚クレスト3面
  3: 2, // Lv3は召喚クレスト2面
  4: 1  // Lv4は召喚クレスト1面
};

// その他のクレスト
const OTHER_CRESTS: CrestType[] = ['attack', 'defense', 'movement', 'magic', 'trap'];

// ダイスの面を生成
function generateDiceFaces(level: DiceLevel): DiceFace[] {
  const faces: DiceFace[] = [];
  const summonCount = SUMMON_FACE_COUNT[level];

  // 召喚クレストの数字（レベルと同じ）
  const summonNumber: SummonNumber = level;

  // 召喚クレストの面を追加
  for (let i = 0; i < summonCount; i++) {
    faces.push({
      crestType: 'summon',
      summonNumber: summonNumber,
      multiplier: 1
    });
  }

  // 残りの面（6 - 召喚クレスト数）を他のクレストで埋める
  const remainingCount = 6 - summonCount;
  for (let i = 0; i < remainingCount; i++) {
    const randomCrest = OTHER_CRESTS[Math.floor(Math.random() * OTHER_CRESTS.length)];
    // ランダムで×2の確率を設定（20%）
    const multiplier = Math.random() < 0.2 ? 2 : 1;

    faces.push({
      crestType: randomCrest,
      multiplier: multiplier
    });
  }

  return faces;
}

// モンスター情報を生成（レベルに応じた強さ）
function generateMonsterInfo(level: DiceLevel): MonsterInfo {
  const baseAttack = level * 500 + Math.floor(Math.random() * 500);
  const baseDefense = level * 500 + Math.floor(Math.random() * 500);

  return {
    name: `モンスター Lv${level}`,
    attack: baseAttack,
    defense: baseDefense
  };
}

// ダイスを生成
export function createDice(owner: string, level: DiceLevel): Dice {
  return {
    id: uuidv4(),
    level: level,
    faces: generateDiceFaces(level),
    owner: owner,
    monster: generateMonsterInfo(level)
  };
}

// ダイスをロール（ランダムな面を返す）
export function rollDice(dice: Dice): DiceFace {
  const randomIndex = Math.floor(Math.random() * dice.faces.length);
  return dice.faces[randomIndex];
}

// ダイスプールを生成
// 各プレイヤー15個（Lv1を多めに、Lv4を少なめに）
export function createDicePool(owner: string, count: number = 15): Dice[] {
  const pool: Dice[] = [];

  // レベル配分（Lv1多め、Lv4少なめ）
  const levelDistribution: DiceLevel[] = [
    1, 1, 1, 1, 1, 1, 1, 1, // Lv1: 8個
    2, 2, 2, 2,             // Lv2: 4個
    3, 3,                   // Lv3: 2個
    4                       // Lv4: 1個
  ];

  for (let i = 0; i < count && i < levelDistribution.length; i++) {
    pool.push(createDice(owner, levelDistribution[i]));
  }

  return pool;
}

// 手札から召喚可能な組み合わせを取得
export function getSummonableCombinations(hand: import('./types').RolledDice[]): import('./types').SummonableCombination[] {
  const summonDice = hand.filter(rd => rd.rolledFace.crestType === 'summon');

  // 召喚数字ごとにグループ化
  const groups: Map<SummonNumber, string[]> = new Map();

  summonDice.forEach(rd => {
    const num = rd.rolledFace.summonNumber!;
    if (!groups.has(num)) {
      groups.set(num, []);
    }
    groups.get(num)!.push(rd.dice.id);
  });

  // 2つ以上ある召喚数字のみを返す
  const combinations: import('./types').SummonableCombination[] = [];

  groups.forEach((diceIds, summonNumber) => {
    if (diceIds.length >= 2) {
      combinations.push({
        summonNumber: summonNumber,
        diceIds: diceIds
      });
    }
  });

  return combinations;
}
