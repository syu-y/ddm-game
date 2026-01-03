import type { Position, Tile } from './types';

/**
 * DDM展開パターン
 * 
 * ダイスは6面体なので、展開パターンは6マス（中心1 + 周辺5）
 * 各パターンは相対座標で定義（中心を(0,0)とする）
 * 
 * パターン例：
 * - Pattern 0: 十字型 + 右上
 * - Pattern 1: 十字型 + 右下  
 * - Pattern 2: 十字型 + 左上
 * - Pattern 3: 十字型 + 左下
 * - Pattern 4: 縦長型
 * - Pattern 5: 横長型
 * - Pattern 6: L字型（右）
 * - Pattern 7: L字型（左）
 * - Pattern 8: T字型（上）
 * - Pattern 9: T字型（下）
 */

export const EXPANSION_PATTERNS: Position[][] = [
  // Pattern 0: 十字型 + 右上
  // ■■
  // ■🐉■
  //  ■
  [
    { x: 0, y: 0 },   // 中心（モンスター）
    { x: -1, y: 0 },  // 左
    { x: 1, y: 0 },   // 右
    { x: 0, y: -1 },  // 上
    { x: 0, y: 1 },   // 下
    { x: 1, y: -1 },  // 右上
  ],

  // Pattern 1: 十字型 + 右下
  //  ■
  // ■🐉■
  // ■■
  [
    { x: 0, y: 0 },   // 中心
    { x: -1, y: 0 },  // 左
    { x: 1, y: 0 },   // 右
    { x: 0, y: -1 },  // 上
    { x: 0, y: 1 },   // 下
    { x: 1, y: 1 },   // 右下
  ],

  // Pattern 2: 十字型 + 左上
  // ■■
  // ■🐉■
  //  ■
  [
    { x: 0, y: 0 },   // 中心
    { x: -1, y: 0 },  // 左
    { x: 1, y: 0 },   // 右
    { x: 0, y: -1 },  // 上
    { x: 0, y: 1 },   // 下
    { x: -1, y: -1 }, // 左上
  ],

  // Pattern 3: 十字型 + 左下
  //  ■
  // ■🐉■
  // ■■
  [
    { x: 0, y: 0 },   // 中心
    { x: -1, y: 0 },  // 左
    { x: 1, y: 0 },   // 右
    { x: 0, y: -1 },  // 上
    { x: 0, y: 1 },   // 下
    { x: -1, y: 1 },  // 左下
  ],

  // Pattern 4: 縦長型
  //  ■
  //  ■
  //  🐉
  //  ■
  //  ■
  //  ■
  [
    { x: 0, y: 0 },   // 中心
    { x: 0, y: -2 },  // 上2
    { x: 0, y: -1 },  // 上1
    { x: 0, y: 1 },   // 下1
    { x: 0, y: 2 },   // 下2
    { x: 0, y: 3 },   // 下3
  ],

  // Pattern 5: 横長型
  // ■■🐉■■■
  [
    { x: 0, y: 0 },   // 中心
    { x: -2, y: 0 },  // 左2
    { x: -1, y: 0 },  // 左1
    { x: 1, y: 0 },   // 右1
    { x: 2, y: 0 },   // 右2
    { x: 3, y: 0 },   // 右3
  ],

  // Pattern 6: L字型（右下）
  //  🐉■■
  //  ■
  //  ■
  //  ■
  [
    { x: 0, y: 0 },   // 中心
    { x: 1, y: 0 },   // 右1
    { x: 2, y: 0 },   // 右2
    { x: 0, y: 1 },   // 下1
    { x: 0, y: 2 },   // 下2
    { x: 0, y: 3 },   // 下3
  ],

  // Pattern 7: L字型（左下）
  // ■■🐉
  //    ■
  //    ■
  //    ■
  [
    { x: 0, y: 0 },   // 中心
    { x: -2, y: 0 },  // 左2
    { x: -1, y: 0 },  // 左1
    { x: 0, y: 1 },   // 下1
    { x: 0, y: 2 },   // 下2
    { x: 0, y: 3 },   // 下3
  ],

  // Pattern 8: T字型（上向き）
  //  ■■■
  //   ■
  //   🐉
  //   ■
  [
    { x: 0, y: 0 },   // 中心
    { x: -1, y: -2 }, // 左上
    { x: 0, y: -2 },  // 中上
    { x: 1, y: -2 },  // 右上
    { x: 0, y: -1 },  // 上
    { x: 0, y: 1 },   // 下
  ],

  // Pattern 9: T字型（下向き）
  //   ■
  //   🐉
  //   ■
  //  ■■■
  [
    { x: 0, y: 0 },   // 中心
    { x: 0, y: -1 },  // 上
    { x: 0, y: 1 },   // 下
    { x: -1, y: 2 },  // 左下2
    { x: 0, y: 2 },   // 中下2
    { x: 1, y: 2 },   // 右下2
  ],

  // Pattern 10: ダイヤ型
  // ■ ■
  //■🐉■
  // ■
  [
    { x: 0, y: 0 },   // 中心
    { x: -1, y: -1 }, // 左上
    { x: 1, y: -1 },  // 右上
    { x: -1, y: 0 },  // 左
    { x: 1, y: 0 },   // 右
    { x: 0, y: 1 },   // 下
  ],
];

// タイルが展開可能か確認（中心以外）
function canExpandOnTile(tile: Tile, playerId: string, isCenter: boolean): boolean {
  // 中心は召喚位置なので常にOK
  if (isCenter) return true;

  // 空きマスはOK
  if (tile.type === 'empty') return true;

  // 自分のダンジョンタイルはOK（既存のダンジョンを拡張）
  if (tile.type === 'dungeon' && tile.owner === playerId) return true;

  // それ以外（master, monster, 相手のダンジョン）はNG
  return false;
}

// 展開可能なパターンを取得（盤面に収まり、既存のタイルと重ならないもの）
export function getValidExpansionPatterns(
  board: Tile[][],
  center: Position,
  playerId: string
): Position[][] {
  const validPatterns: Position[][] = [];
  const boardSize = board.length;

  for (const pattern of EXPANSION_PATTERNS) {
    let isValid = true;
    const absolutePositions: Position[] = [];

    for (const relativePos of pattern) {
      const absPos: Position = {
        x: center.x + relativePos.x,
        y: center.y + relativePos.y
      };

      // 盤面外チェック
      if (absPos.x < 0 || absPos.x >= boardSize || absPos.y < 0 || absPos.y >= boardSize) {
        isValid = false;
        break;
      }

      const tile = board[absPos.y][absPos.x];
      const isCenter = (absPos.x === center.x && absPos.y === center.y);

      // 展開可能かチェック
      if (!canExpandOnTile(tile, playerId, isCenter)) {
        isValid = false;
        break;
      }

      absolutePositions.push(absPos);
    }

    if (isValid) {
      validPatterns.push(absolutePositions);
    }
  }

  return validPatterns;
}

// ランダムに展開パターンを選択
export function selectRandomExpansion(validPatterns: Position[][]): Position[] | null {
  if (validPatterns.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * validPatterns.length);
  return validPatterns[randomIndex];
}

/**
 * 展開パターンのインデックスが有効かチェック
 */
export function isValidPatternIndex(index: number): boolean {
  return index >= 0 && index < EXPANSION_PATTERNS.length;
}

/**
 * 展開パターンを取得（安全版）
 */
export function getExpansionPattern(index: number): Position[] {
  if (!isValidPatternIndex(index)) {
    console.warn(`無効な展開パターンインデックス: ${index}。デフォルト（Pattern 0）を使用します。`);
    return EXPANSION_PATTERNS[0];
  }
  return EXPANSION_PATTERNS[index];
}
