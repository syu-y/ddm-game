import type { Tile, Position, Player } from './types';

const BOARD_SIZE = 13;

// 空の盤面を生成
export function createEmptyBoard(): Tile[][] {
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

// プレイヤーの初期位置を設定（ダンジョンマスター）
export function setPlayerPositions(board: Tile[][], player1: Player, player2: Player): void {
  // プレイヤー1は左下（中央）
  const p1Pos = { x: 0, y: Math.floor(BOARD_SIZE / 2) };
  player1.position = p1Pos;
  board[p1Pos.y][p1Pos.x] = {
    position: p1Pos,
    type: 'master', // 'player' から 'master' に変更
    owner: player1.id
  };

  // プレイヤー2は右上（中央）
  const p2Pos = { x: BOARD_SIZE - 1, y: Math.floor(BOARD_SIZE / 2) };
  player2.position = p2Pos;
  board[p2Pos.y][p2Pos.x] = {
    position: p2Pos,
    type: 'master', // 'player' から 'master' に変更
    owner: player2.id
  };
}

// マスが盤面内か確認
export function isInBounds(pos: Position): boolean {
  return pos.x >= 0 && pos.x < BOARD_SIZE && pos.y >= 0 && pos.y < BOARD_SIZE;
}

// 2つの位置が隣接しているか確認
export function isAdjacent(pos1: Position, pos2: Position): boolean {
  const dx = Math.abs(pos1.x - pos2.x);
  const dy = Math.abs(pos1.y - pos2.y);
  return (dx === 1 && dy === 0) || (dx === 0 && dy === 1);
}

// マスを取得
export function getTile(board: Tile[][], pos: Position): Tile | null {
  if (!isInBounds(pos)) return null;
  return board[pos.y][pos.x];
}

// マスを更新
export function setTile(board: Tile[][], tile: Tile): void {
  if (!isInBounds(tile.position)) return;
  board[tile.position.y][tile.position.x] = tile;
}

// 指定位置が自軍のマスター or 自軍のダンジョンに隣接しているか確認
export function canDeployAt(board: Tile[][], pos: Position, playerId: string): boolean {
  if (!isInBounds(pos)) return false;

  const tile = getTile(board, pos);
  if (!tile || tile.type !== 'empty') return false;

  // 上下左右の隣接マスをチェック
  const adjacentPositions = [
    { x: pos.x - 1, y: pos.y },
    { x: pos.x + 1, y: pos.y },
    { x: pos.x, y: pos.y - 1 },
    { x: pos.x, y: pos.y + 1 }
  ];

  for (const adjPos of adjacentPositions) {
    const adjTile = getTile(board, adjPos);
    if (adjTile && adjTile.owner === playerId &&
      (adjTile.type === 'master' || adjTile.type === 'dungeon' || adjTile.type === 'monster')) {
      return true;
    }
  }

  return false;
}
