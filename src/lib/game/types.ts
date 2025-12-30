// ダイスの面
export interface DiceFace {
  type: 'monster' | 'magic' | 'trap' | 'summon' | 'movement';
  level?: number; // モンスターのレベル(1-4)
  crest?: Crest; // 属性
}

// 属性
export type Crest = 'dark' | 'light' | 'fire' | 'water' | 'earth' | 'wind';

// ダイス
export interface Dice {
  id: string;
  faces: DiceFace[];
  owner: string;
}

// ロールされたダイス（手札用）
export interface RolledDice {
  diceId: string;
  face: DiceFace;
  owner: string;
}

// モンスター
export interface Monster {
  id: string;
  name: string;
  level: number;
  attack: number;
  defense: number;
  crest: Crest;
  position: Position;
  owner: string;
}

// 盤面の座標
export interface Position {
  x: number;
  y: number;
}

// マスの種類
export interface Tile {
  position: Position;
  type: 'empty' | 'dungeon' | 'monster' | 'player';
  owner?: string;
  crest?: Crest;
  monster?: Monster;
}

// プレイヤー
export interface Player {
  id: string;
  name: string;
  lifePoints: number;
  dicePool: Dice[];
  hand: RolledDice[]; // 
  position: Position; // ダイスマスターの位置
}

// ゲーム状態
export interface GameState {
  id: string;
  players: [Player, Player];
  board: Tile[][];
  currentTurn: string; // プレイヤーID
  phase: GamePhase;
  winner?: string;
}

// ゲームフェーズ
export type GamePhase =
  | 'waiting'      // 対戦相手待ち
  | 'roll'         // ダイスロール
  | 'summon'       // 召喚フェーズ
  | 'move'         // 移動フェーズ
  | 'attack'       // 攻撃フェーズ
  | 'end'          // ターン終了
  | 'gameover';    // ゲーム終了

// ゲームアクション
export type GameAction =
  | { type: 'ROLL_DICE' }
  | { type: 'SUMMON_MONSTER'; diceId: string; position: Position }
  | { type: 'MOVE_MONSTER'; monsterId: string; position: Position }
  | { type: 'ATTACK'; attackerId: string; targetId: string }
  | { type: 'END_TURN' }
  | { type: 'SURRENDER' };
