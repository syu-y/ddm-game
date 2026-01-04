import type { Position, Tile } from './types';

/**
 * DDM展開パターン
 * 
 * ダイスは6面体なので、展開パターンは6マス（中心1 + 周辺5）
 * 各パターンは相対座標で定義（中心を(0,0)とする）
 * 
 * パターン例：
 * - Pattern 0: T字
 * - Pattern 1: 直線＋上下1
 * - Pattern 2: 直線＋上下2
 * - Pattern 3: 直線＋上下3
 * - Pattern 4: 直線＋上下4
 * - Pattern 5: 直線＋上下5
 * - Pattern 6: L字型（右）
 * - Pattern 7: L字型（左）
 * - Pattern 8: T字型（上）
 * - Pattern 9: T字型（下）
 */

export const EXPANSION_PATTERNS: Position[][] = [
  // Pattern 0: T字
  // ■
  // ■□■■
  // ■
  [
    { x: 0, y: 0 },   // 中心（モンスター）
    { x: 1, y: 0 },   // 右
    { x: 2, y: 0 },   // 右2マス
    { x: -1, y: -1 },   // 左上
    { x: -1, y: 0 },  // 左
    { x: -1, y: 1 },   // 左下
  ],

  // Pattern 1: 直線＋上下1
  // ■
  // ■□■■
  //  ■
  [
    { x: 0, y: 0 },   // 中心
    { x: -1, y: 0 },  // 左
    { x: 1, y: 0 },   // 右
    { x: 2, y: 0 },   // 右2マス
    { x: -1, y: -1 },  // 左上
    { x: 0, y: 1 },   // 下
  ],

  // Pattern 2: 直線＋上下2
  // ■
  // ■□■■
  //   ■
  [
    { x: 0, y: 0 },   // 中心
    { x: -1, y: 0 },  // 左
    { x: 1, y: 0 },   // 右
    { x: 2, y: 0 },   // 右2マス
    { x: -1, y: -1 },  // 左上
    { x: 1, y: 1 },   // 右下
  ],

  // Pattern 3: 直線＋上下3
  // ■
  // ■□■■
  //    ■
  [
    { x: 0, y: 0 },   // 中心
    { x: -1, y: 0 },  // 左
    { x: 1, y: 0 },   // 右
    { x: 2, y: 0 },   // 右2マス
    { x: -1, y: -1 },  // 左上
    { x: 2, y: 1 },   // 右下
  ],

  // Pattern 4: 直線＋上下4
  //  ■
  // ■□■■
  //  ■
  [
    { x: 0, y: 0 },   // 中心
    { x: -1, y: 0 },  // 左
    { x: 1, y: 0 },   // 右
    { x: 2, y: 0 },   // 右2マス
    { x: 0, y: -1 },  // 上
    { x: 0, y: 1 },   // 下
  ],

  // Pattern 5: 直線＋上下5
  //  ■
  // ■□■■
  //   ■
  [
    { x: 0, y: 0 },   // 中心
    { x: -1, y: 0 },  // 左
    { x: 1, y: 0 },   // 右
    { x: 2, y: 0 },   // 右2マス
    { x: 0, y: -1 },  // 上
    { x: 1, y: 1 },   // 右下
  ],

  // Pattern 6: 階段1
  // ■■
  //  □■■
  //   ■
  [
    { x: 0, y: 0 },   // 中心
    { x: -1, y: -1 }, // 左上
    { x: 0, y: -1 },  // 上
    { x: 1, y: 0 },   // 右
    { x: 2, y: 0 },   // 右1マス
    { x: 1, y: 1 },   // 右下
  ],

  // Pattern 7: 階段2
  // ■■
  //  □■■
  //  ■
  [
    { x: 0, y: 0 },   // 中心
    { x: -1, y: -1 }, // 左上
    { x: 0, y: -1 },  // 上
    { x: 1, y: 0 },   // 右
    { x: 2, y: 0 },   // 右1マス
    { x: 0, y: 1 },   // 下
  ],

  // Pattern 8: 階段3
  // ■■
  //  □■
  //   ■■
  [
    { x: 0, y: 0 },   // 中心
    { x: -1, y: -1 }, // 左上
    { x: 0, y: -1 },  // 上
    { x: 1, y: 0 },   // 右
    { x: 0, y: 1 },   // 下
    { x: 1, y: 1 },   // 右下
  ],

  // Pattern 9: 階段4
  // ■■
  //  □■■
  //    ■
  [
    { x: 0, y: 0 },   // 中心
    { x: -1, y: -1 }, // 左上
    { x: 0, y: -1 },  // 上
    { x: 1, y: 0 },   // 右
    { x: 2, y: 0 },   // 右2
    { x: 2, y: 1 },   // 右下
  ],

  // Pattern 10: 雷型
  // ■■□
  //   ■■■
  [
    { x: 0, y: 0 },   // 中心
    { x: -1, y: 0 }, // 左
    { x: -2, y: 0 },  // 左2
    { x: 0, y: 1 },  // 下
    { x: 1, y: 1 },   // 右下
    { x: 2, y: 1 },   // 右下2
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

/**
 * 展開パターンを時計回りに90度回転
 * @param pattern 元のパターン
 * @returns 回転後のパターン
 */
export function rotatePatternClockwise(pattern: Position[]): Position[] {
  return pattern.map(pos => ({
    x: -pos.y,  // 時計回りに90度: (x, y) → (-y, x)
    y: pos.x
  }));
}

/**
 * 展開パターンを指定角度回転
 * @param pattern 元のパターン
 * @param rotation 回転角度（0, 90, 180, 270）
 * @returns 回転後のパターン
 */
export function rotatePattern(pattern: Position[], rotation: number): Position[] {
  const normalizedRotation = ((rotation % 360) + 360) % 360;

  switch (normalizedRotation) {
    case 0:
      return pattern;
    case 90:
      return rotatePatternClockwise(pattern);
    case 180:
      return rotatePatternClockwise(rotatePatternClockwise(pattern));
    case 270:
      return rotatePatternClockwise(rotatePatternClockwise(rotatePatternClockwise(pattern)));
    default:
      console.warn(`無効な回転角度: ${rotation}。0度として扱います。`);
      return pattern;
  }
}
