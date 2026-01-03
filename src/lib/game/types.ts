// ゲームの型定義

// 基本型
export type DiceLevel = 1 | 2 | 3 | 4;
export type SummonNumber = 1 | 2 | 3 | 4;
export type CrestType = 'summon' | 'attack' | 'defense' | 'movement' | 'magic' | 'trap';
export type GamePhase = 'roll' | 'summon' | 'movement' | 'battle' | 'end';

// 位置
export interface Position {
  x: number;
  y: number;
}

// クレストの面
export interface DiceFace {
  crestType: CrestType;
  summonNumber?: SummonNumber; // 召喚クレストの場合
  multiplier?: number; // ×2など
}

// 特殊能力の種類
export type AbilityType =
  | 'FLYING' // 飛行
  | 'TUNNEL' // トンネル
  | 'TRON' // トロンの効果
  | 'STAT_UP_ATK' // 攻撃力アップ
  | 'STAT_UP_DEF' // 防御力アップ
  | 'DAMAGE_REDUCE' // ダメージ軽減
  | 'DESTROY' // 破壊効果
  | 'HEAL' // 回復
  | 'RANGE_ATTACK' // 遠隔攻撃/弓攻撃
  | 'AUTO_WIN' // 自動勝利
  | 'CONTROL'  // コントロール
  | 'NEGATE' //防御
  | 'SPECIAL'; // その他の特殊能力

// 特殊能力
export interface MonsterAbility {
  type: AbilityType;
  cost?: { // 発動コスト
    magic?: number;
    attack?: number;
    defense?: number;
    movement?: number;
    trap?: number;
  };
  effect: string; // 効果の説明
  value?: number; // 効果の数値（ダメージ、移動距離など）
}

// モンスター情報
export interface MonsterInfo {
  name: string;
  attack: number;
  defense: number;
  hp: number; // 初期HP（通常は防御力と同じだが、一部モンスターは異なる）
  abilities?: MonsterAbility[]; // 特殊能力のリスト
}

// ダイス
export interface Dice {
  id: string;
  level: DiceLevel;
  faces: DiceFace[]; // 6面
  owner: string;
  monster: MonsterInfo;
  expansionPattern: number; // 展開パターンのインデックス
}

// ロール済みダイス
export interface RolledDice {
  dice: Dice;
  rolledFace: DiceFace;
  owner: string;
}

// 盤面上のモンスター
export interface DeployedMonster {
  diceId: string;
  monster: MonsterInfo;
  level: DiceLevel;
  position: Position;
  owner: string;
  hp: number;
}

// マスの種類
export interface Tile {
  position: Position;
  type: 'empty' | 'dungeon' | 'monster' | 'master';
  owner?: string;
  deployedMonster?: DeployedMonster;
}

// クレストプール
export interface CrestPool {
  attack: number;
  defense: number;
  movement: number;
  magic: number;
  trap: number;
}

// プレイヤー
export interface Player {
  id: string;
  name: string;
  crests: CrestPool; // 蓄積されるクレスト
  dicePool: Dice[]; // ダイスプール（未ロール）
  hand: RolledDice[]; // 手札（ロール済み）
  masterPosition: Position;
  masterHP: number;
}

// ゲーム状態
export interface GameState {
  roomId: string;
  players: Player[];
  board: Tile[][];
  currentTurn: string; // プレイヤーID
  phase: GamePhase;
  turnCount: number;
}

// ゲームアクション
export type GameAction =
  | { type: 'ROLL_DICE' }
  | { type: 'SUMMON_MONSTER'; diceIds: string[]; position: Position }
  | { type: 'MOVE_MONSTER'; fromPosition: Position; toPosition: Position }
  | { type: 'ATTACK_MONSTER'; attackerPosition: Position; targetPosition: Position }
  | { type: 'END_PHASE' }
  | { type: 'END_TURN' };

// 召喚可能な組み合わせ
export interface SummonableCombination {
  summonNumber: SummonNumber;
  diceIds: string[];
}

// モンスターカード（デッキ構築用）
export interface MonsterCard {
  id: string;
  name: string;
  level: DiceLevel;
  summonNumber: SummonNumber;
  monster: MonsterInfo;
  expansionPattern: number; // EXPANSION_PATTERNSのインデックス
  diceFaces: DiceFace[]; // 6面のクレスト構成
}
