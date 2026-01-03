import type { Tile, Position } from './types';

export const BOARD_SIZE = 13;

// 盤面を初期化
export function createBoard(): Tile[][] {
  const board: Tile[][] = [];

  for (let y = 0; y < BOARD_SIZE; y++) {
    const row: Tile[] = [];
    for (let x = 0; x < BOARD_SIZE; x++) {
      row.push({
        position: { x, y },
        type: 'empty'
      });
    }
    board.push(row);
  }

  return board;
}

// タイルを取得
export function getTile(board: Tile[][], position: Position): Tile | undefined {
  if (!isInBounds(position, BOARD_SIZE)) {
    return undefined;
  }
  return board[position.y][position.x];
}

// タイルを設定
export function setTile(board: Tile[][], tile: Tile): void {
  if (!isInBounds(tile.position, BOARD_SIZE)) {
    console.error('盤面外の位置です:', tile.position);
    return;
  }
  board[tile.position.y][tile.position.x] = tile;
}

// 盤面内かチェック
export function isInBounds(position: Position, boardSize: number): boolean {
  return position.x >= 0 && position.x < boardSize &&
    position.y >= 0 && position.y < boardSize;
}

// 隣接マスを取得（上下左右）
export function getAdjacentPositions(position: Position): Position[] {
  return [
    { x: position.x, y: position.y - 1 }, // 上
    { x: position.x, y: position.y + 1 }, // 下
    { x: position.x - 1, y: position.y }, // 左
    { x: position.x + 1, y: position.y }, // 右
  ];
}

// モンスターを配置可能な位置かチェック
export function canDeployAt(board: Tile[][], position: Position, playerId: string): boolean {
  const tile = getTile(board, position);

  if (!tile) {
    return false;
  }

  // 空きマスでない場合は配置不可
  if (tile.type !== 'empty') {
    return false;
  }

  // 自分のマスターまたは自分のダンジョン/モンスターに隣接しているかチェック
  const adjacentPositions = getAdjacentPositions(position);

  for (const adjPos of adjacentPositions) {
    const adjTile = getTile(board, adjPos);

    if (!adjTile) continue;

    // 自分のマスター、ダンジョン、またはモンスターに隣接していればOK
    if (adjTile.owner === playerId) {
      if (adjTile.type === 'master' || adjTile.type === 'dungeon' || adjTile.type === 'monster') {
        return true;
      }
    }
  }

  return false;
}

// 2つの位置が隣接しているかチェック
export function isAdjacent(pos1: Position, pos2: Position): boolean {
  const dx = Math.abs(pos1.x - pos2.x);
  const dy = Math.abs(pos1.y - pos2.y);

  // 上下左右のいずれかに隣接（斜めは含まない）
  return (dx === 1 && dy === 0) || (dx === 0 && dy === 1);
}

// 指定した位置から指定した距離内のマスを取得
export function getPositionsInRange(center: Position, range: number): Position[] {
  const positions: Position[] = [];

  for (let dy = -range; dy <= range; dy++) {
    for (let dx = -range; dx <= range; dx++) {
      // マンハッタン距離でチェック
      if (Math.abs(dx) + Math.abs(dy) <= range) {
        const pos = { x: center.x + dx, y: center.y + dy };
        if (isInBounds(pos, BOARD_SIZE)) {
          positions.push(pos);
        }
      }
    }
  }

  return positions;
}
