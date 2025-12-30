// クレストの種類
export type CrestType = 'summon' | 'attack' | 'defense' | 'movement' | 'magic' | 'trap';

// 召喚クレストの数字（1-4）
export type SummonNumber = 1 | 2 | 3 | 4;

// ダイスの面
export interface DiceFace {
  crestType: CrestType;
  summonNumber?: SummonNumber; // 召喚クレストの場合のみ
  multiplier?: number; // クレストの倍数（×2など）デフォルトは1
}

// ダイスのレベル
export type DiceLevel = 1 | 2 | 3 | 4;

// ダイス
export interface Dice {
  id: string;
  level: DiceLevel;
  faces: DiceFace[]; // 6面
  owner: string;
  monster?: MonsterInfo; // このダイスのモンスター情報
}

// モンスター情報（ダイスに紐付く）
export interface MonsterInfo {
  name: string;
  attack: number;
  defense: number;
}

// ロールされたダイス（手札用）
export interface RolledDice {
  dice: Dice; // ダイス全体の情報
  rolledFace: DiceFace; // 出た面
  owner: string;
}

// 盤面上のモンスター（展開済みダイス）
export interface DeployedMonster {
  diceId: string;
  monster: MonsterInfo;
  level: DiceLevel;
  position: Position;
  owner: string;
  hp: number; // 現在のHP（初期値は defense）
}

// 盤面の座標
export interface Position {
  x: number;
  y: number;
}

// マスの種類
export interface Tile {
  position: Position;
  type: 'empty' | 'dungeon' | 'monster' | 'master';
  owner?: string;
  deployedMonster?: DeployedMonster; // 展開されたモンスター
}

// プレイヤー
export interface Player {
  id: string;
  name: string;
  lifePoints: number; // ダンジョンマスターへの攻撃回数（3回で負け）
  dicePool: Dice[]; // 未使用のダイス
  hand: RolledDice[]; // 手札（ロールしたダイス）
  position: Position; // ダンジョンマスターの位置
  crests: CrestPool; // 溜まっているクレスト
}

// クレストプール（攻撃、防御、進行、魔法、罠を溜める）
export interface CrestPool {
  attack: number;
  defense: number;
  movement: number;
  magic: number;
  trap: number;
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
  | 'waiting'
  | 'roll'
  | 'summon'     // 召喚フェーズ
  | 'movement'   // 移動フェーズ
  | 'battle'     // 戦闘フェーズ
  | 'end'
  | 'gameover';

// ゲームアクション
export type GameAction =
  | { type: 'ROLL_DICE' }
  | { type: 'SUMMON_MONSTER'; diceIds: string[]; position: Position } // 召喚（同じ数字のクレスト2つ以上使用）
  | { type: 'MOVE_MONSTER'; monsterId: string; position: Position }
  | { type: 'ATTACK'; attackerId: string; targetId: string }
  | { type: 'END_PHASE' } // フェーズ終了
  | { type: 'END_TURN' }  // ターン終了
  | { type: 'SURRENDER' };

// 召喚可能な組み合わせ
export interface SummonableCombination {
  summonNumber: SummonNumber;
  diceIds: string[];
}
