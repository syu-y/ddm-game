import type { Dice, DiceFace, Crest } from './types';
import { v4 as uuidv4 } from 'uuid';

const CRESTS: Crest[] = ['dark', 'light', 'fire', 'water', 'earth', 'wind'];

// ダイスの面を生成（ランダム）
function generateDiceFaces(): DiceFace[] {
  const faces: DiceFace[] = [];

  // 6面のダイスを生成
  for (let i = 0; i < 6; i++) {
    const rand = Math.random();

    if (rand < 0.5) {
      // モンスター（50%）
      faces.push({
        type: 'monster',
        level: Math.floor(Math.random() * 4) + 1, // レベル1-4
        crest: CRESTS[Math.floor(Math.random() * CRESTS.length)]
      });
    } else if (rand < 0.7) {
      // 移動（20%）
      faces.push({
        type: 'movement'
      });
    } else if (rand < 0.85) {
      // 召喚クレスト（15%）
      faces.push({
        type: 'summon',
        crest: CRESTS[Math.floor(Math.random() * CRESTS.length)]
      });
    } else if (rand < 0.95) {
      // 魔法（10%）
      faces.push({
        type: 'magic'
      });
    } else {
      // 罠（5%）
      faces.push({
        type: 'trap'
      });
    }
  }

  return faces;
}

// ダイスを生成
export function createDice(owner: string): Dice {
  return {
    id: uuidv4(),
    faces: generateDiceFaces(),
    owner
  };
}

// ダイスをロール（ランダムな面を返す）
export function rollDice(dice: Dice): DiceFace {
  const randomIndex = Math.floor(Math.random() * dice.faces.length);
  return dice.faces[randomIndex];
}

// ダイスプールを生成（各プレイヤー15個）
export function createDicePool(owner: string, count: number = 15): Dice[] {
  const pool: Dice[] = [];
  for (let i = 0; i < count; i++) {
    pool.push(createDice(owner));
  }
  return pool;
}
