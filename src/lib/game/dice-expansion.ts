import type { Position, Tile } from './types';

// ダイス展開パターン（中心を0,0として相対座標）
// 十字型は禁止されているため除外
export const EXPANSION_PATTERNS: Position[][] = [
  // パターン1: 横一列
  [
    { x: -2, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 }
  ],

  // パターン2: 縦一列
  [
    { x: 0, y: -2 },
    { x: 0, y: -1 },
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 }
  ],

  // パターン3: L字型（右上）
  [
    { x: 0, y: 0 },
    { x: 0, y: -1 },
    { x: 0, y: -2 },
    { x: 1, y: 0 },
    { x: 2, y: 0 }
  ],

  // パターン4: L字型（左上）
  [
    { x: 0, y: 0 },
    { x: 0, y: -1 },
    { x: 0, y: -2 },
    { x: -1, y: 0 },
    { x: -2, y: 0 }
  ],

  // パターン5: L字型（右下）
  [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: 1, y: 0 },
    { x: 2, y: 0 }
  ],

  // パターン6: L字型（左下）
  [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: -1, y: 0 },
    { x: -2, y: 0 }
  ],

  // パターン7: T字型（上）
  [
    { x: -1, y: 0 },
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: 0, y: -2 }
  ],

  // パターン8: T字型（下）
  [
    { x: -1, y: 0 },
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 }
  ],

  // パターン9: T字型（左）
  [
    { x: 0, y: -1 },
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
    { x: -2, y: 0 }
  ],

  // パターン10: T字型（右）
  [
    { x: 0, y: -1 },
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: 2, y: 0 }
  ],

  // パターン11: ブロック型（2x3 横）
  [
    { x: -1, y: 0 },
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: -1, y: -1 },
    { x: 0, y: -1 }
  ],

  // パターン12: ブロック型（2x3 縦）
  [
    { x: 0, y: -1 },
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: -1 },
    { x: -1, y: 0 }
  ],

  // パターン13: Z字型
  [
    { x: -1, y: -1 },
    { x: 0, y: -1 },
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 }
  ],

  // パターン14: S字型
  [
    { x: 1, y: -1 },
    { x: 0, y: -1 },
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 1 }
  ]
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
