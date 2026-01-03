import { v4 as uuidv4 } from 'uuid';
import type { Dice, DiceFace, RolledDice, SummonNumber, } from './types';
import { getMonsterCard } from './monster-cards';

// モンスターカードIDからダイスを生成
export function createDiceFromCard(cardId: string, owner: string): Dice | null {
  const card = getMonsterCard(cardId);
  if (!card) {
    console.error(`モンスターカード ${cardId} が見つかりません`);
    return null;
  }

  return {
    id: uuidv4(),
    level: card.level,
    faces: card.diceFaces,
    owner: owner,
    monster: card.monster,
    expansionPattern: card.expansionPattern
  };
}

// デッキ（カードIDの配列）からダイスプールを生成
export function createDicePoolFromDeck(deck: string[], owner: string): Dice[] {
  const dicePool: Dice[] = [];

  for (const cardId of deck) {
    const dice = createDiceFromCard(cardId, owner);
    if (dice) {
      dicePool.push(dice);
    }
  }

  console.log(`${owner}のダイスプール生成完了: ${dicePool.length}個`);
  return dicePool;
}

// ダイスをロール（面をランダムに選択）
export function rollDice(dice: Dice): DiceFace {
  const randomIndex = Math.floor(Math.random() * dice.faces.length);
  return dice.faces[randomIndex];
}

// 召喚可能な組み合わせを取得
export function getSummonableCombinations(hand: RolledDice[]): Array<{
  summonNumber: SummonNumber;
  diceIds: string[];
}> {
  const summonDice = hand.filter(rd => rd.rolledFace.crestType === 'summon');

  // 召喚数字ごとにグループ化
  const groups = new Map<SummonNumber, string[]>();

  summonDice.forEach(rd => {
    const num = rd.rolledFace.summonNumber!;
    if (!groups.has(num)) {
      groups.set(num, []);
    }
    groups.get(num)!.push(rd.dice.id);
  });

  // 2つ以上あるグループのみを返す
  const combinations: Array<{ summonNumber: SummonNumber; diceIds: string[] }> = [];
  groups.forEach((diceIds, summonNumber) => {
    if (diceIds.length >= 2) {
      combinations.push({ summonNumber, diceIds });
    }
  });

  return combinations;
}

// 召喚可能なダイスのグループを取得
export function getSummonableGroups(hand: RolledDice[]): Map<SummonNumber, RolledDice[]> {
  const summonDice = hand.filter(rd => rd.rolledFace.crestType === 'summon');

  // 召喚数字ごとにグループ化
  const groups = new Map<SummonNumber, RolledDice[]>();

  summonDice.forEach(rd => {
    const num = rd.rolledFace.summonNumber!;
    if (!groups.has(num)) {
      groups.set(num, []);
    }
    groups.get(num)!.push(rd);
  });

  // 2つ以上あるグループのみを返す
  const result = new Map<SummonNumber, RolledDice[]>();
  groups.forEach((diceList, summonNumber) => {
    if (diceList.length >= 2) {
      result.set(summonNumber, diceList);
    }
  });

  return result;
}
