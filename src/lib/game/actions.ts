/* eslint-disable @typescript-eslint/no-unused-vars */
import type { GameState, GameAction, RolledDice, CrestType, DeployedMonster, Position, Tile } from './types';
import { getCurrentPlayer } from './game-logic';
import { rollDice } from './dice';
import { canDeployAt, isInBounds, setTile, BOARD_SIZE } from './board';
import { EXPANSION_PATTERNS, rotatePattern } from './dice-expansion';

// ゲームアクションを処理
export function processAction(state: GameState, action: GameAction, playerId: string): boolean {
  // 自分のターンでない場合は無視
  if (state.currentTurn !== playerId) {
    return false;
  }

  switch (action.type) {
    case 'ROLL_DICE':
      return handleRollDice(state);

    case 'SUMMON_MONSTER':
      return handleSummonMonster(state, action, playerId);

    case 'END_PHASE':
      return handleEndPhase(state);

    case 'END_TURN':
      return handleEndTurn(state);

    default:
      return false;
  }
}

// ダイスロール処理
function handleRollDice(state: GameState): boolean {
  if (state.phase !== 'roll') {
    return false;
  }

  const player = getCurrentPlayer(state);

  // ダイスプールが空の場合
  if (player.dicePool.length === 0) {
    console.log('ダイスプールが空です');
    return false;
  }

  // 3つのダイスをロール
  const rollCount = Math.min(3, player.dicePool.length);
  const rolledDice: RolledDice[] = [];

  for (let i = 0; i < rollCount; i++) {
    const dice = player.dicePool.pop()!;
    const face = rollDice(dice);

    rolledDice.push({
      dice: dice,
      rolledFace: face,
      owner: player.id
    });

    // クレストを溜める（召喚クレスト以外）
    if (face.crestType !== 'summon') {
      addCrestToPool(player, face.crestType, face.multiplier || 1);
    }

    console.log(`ダイスロール[${i + 1}]: ${face.crestType}`, face);
  }

  // 手札に追加
  player.hand.push(...rolledDice);

  console.log(`手札に追加: ${rolledDice.length}個のダイス`);
  console.log(`現在の手札: ${player.hand.length}枚`);
  console.log('クレストプール:', player.crests);

  // 次のフェーズへ
  state.phase = 'summon';

  return true;
}

// モンスター召喚処理
function handleSummonMonster(
  state: GameState,
  action: GameAction,
  playerId: string
): boolean {

  if (state.phase !== 'summon' || action.type !== 'SUMMON_MONSTER') {
    console.log('召喚フェーズではありません');
    return false;
  }

  console.log('🎯 召喚アクション受信:', {
    playerId,
    diceIds: action.diceIds,
    position: action.position,
    rotation: action.rotation
  });

  // 1. プレイヤーを取得
  const player = getCurrentPlayer(state);
  if (!player) return false

  // 2. ダイスの所有権チェック
  const playerDice = player.hand.filter(rd => action.diceIds.includes(rd.dice.id));
  if (playerDice.length !== action.diceIds.length) {
    console.error('❌ 無効なダイスID');
    return false;
  }

  // 3. 召喚数字の一致チェック
  const firstSummonNumber = playerDice[0].rolledFace.summonNumber;
  const allSameNumber = playerDice.every(
    rd => rd.rolledFace.crestType === 'summon' &&
      rd.rolledFace.summonNumber === firstSummonNumber
  );

  if (!allSameNumber || playerDice.length < 2) {
    console.error('❌ 召喚条件を満たしていません');
    return false;
  }

  // 4. 展開パターンを取得して回転
  const selectedDice = playerDice.findIndex((dice) => dice.dice.id === action.selectedDiceId)
  const dice = playerDice[selectedDice].dice;
  const originalPattern = EXPANSION_PATTERNS[dice.expansionPattern];

  console.log('🔍 展開パターン:', {
    patternIndex: dice.expansionPattern,
    originalPattern,
    rotation: action.rotation
  });

  // 回転を適用
  const rotatedPattern = rotatePattern(originalPattern, action.rotation);

  console.log('✅ 回転後のパターン:', rotatedPattern);

  // 5. 展開パターンの絶対座標を計算
  const absolutePositions = rotatedPattern.map(relativePos => ({
    x: action.position.x + relativePos.x,
    y: action.position.y + relativePos.y
  }));
  console.log('✅ 回転後の展開位置:', absolutePositions);
  // 6. 配置可能性の検証

  // 6-1. 配置位置が有効か
  if (!canDeployAt(state.board, action.position, playerId)) {
    console.error('❌ 配置できない位置');
    return false;
  }

  // 6-2. 展開パターンの全マスが配置可能か
  for (const relativePos of rotatedPattern) {
    const absX = action.position.x + relativePos.x;
    const absY = action.position.y + relativePos.y;

    // 盤面外チェック
    if (absX < 0 || absX >= BOARD_SIZE || absY < 0 || absY >= BOARD_SIZE) {
      console.error('❌ 盤面外:', { absX, absY });
      return false;
    }

    // ⚠️ 重要：board[y][x] の順序でアクセス
    const tile = state.board[absY][absX];
    const isCenter = (absX === action.position.x && absY === action.position.y);

    console.log('🔍 タイル検証:', {
      position: { x: absX, y: absY },
      isCenter,
      tileType: tile.type,
      tileOwner: tile.owner
    });

    if (isCenter) {
      // 中心は空きマスである必要がある
      if (tile.type !== 'empty') {
        console.error('❌ 配置位置が空いていません');
        return false;
      }
    } else {
      // 中心以外は空きマスのみOK
      if (tile.type !== 'empty') {
        console.error('❌ 展開パターンを配置できません:', {
          position: { x: absX, y: absY },
          tileType: tile.type,
          tileOwner: tile.owner
        });
        return false;
      }
    }
  }

  // 7. モンスター召喚の実行

  // 7-1. 手札からダイスを削除
  player.hand = player.hand.filter(rd => !action.diceIds.includes(rd.dice.id));

  console.log('✅ ダイス削除完了:', {
    removedCount: action.diceIds.length,
    remainingHand: player.hand.length
  });

  // 7-2. モンスターを盤面に配置
  const monster = dice.monster;

  // ⚠️ 重要：board[y][x] の順序
  state.board[action.position.y][action.position.x] = {
    type: 'monster',
    owner: playerId,
    position: action.position,
    deployedMonster: {
      diceId: dice.id,
      monster: monster,
      level: dice.level,
      position: action.position,
      owner: player.id,
      hp: monster.hp,
    }
  };

  console.log('✅ モンスター配置完了:', {
    position: action.position,
    monster: monster.name,
    level: dice.level
  });

  // 7-3. 展開パターンをダンジョンとして配置
  for (const relativePos of rotatedPattern) {
    const absX = action.position.x + relativePos.x;
    const absY = action.position.y + relativePos.y;

    // 中心（モンスター）はスキップ
    if (absX === action.position.x && absY === action.position.y) continue;

    // ⚠️ 重要：board[y][x] の順序
    // 空きマスの場合のみダンジョンに変換
    if (state.board[absY][absX].type === 'empty') {
      state.board[absY][absX] = {
        type: 'dungeon',
        owner: player.id,
        position: {
          x: absX,
          y: absY
        }
      };
      console.log('✅ ダンジョン配置:', { x: absX, y: absY });
    }
    // 既に自分のダンジョンの場合はそのまま
  }

  console.log('🎉 召喚完了！');

  return true;
}

// 展開可能なマスか確認
function canExpandOnTile(tile: Tile, playerId: string): boolean {
  // 空きマスはOK
  if (tile.type === 'empty') return true;

  // 自分のダンジョンタイルはOK
  if (tile.type === 'dungeon' && tile.owner === playerId) return true;

  // それ以外（master, monster, 相手のダンジョン）はNG
  return false;
}

// クレストをプールに追加
function addCrestToPool(player: import('./types').Player, crestType: CrestType, amount: number): void {
  switch (crestType) {
    case 'attack':
      player.crests.attack += amount;
      break;
    case 'defense':
      player.crests.defense += amount;
      break;
    case 'movement':
      player.crests.movement += amount;
      break;
    case 'magic':
      player.crests.magic += amount;
      break;
    case 'trap':
      player.crests.trap += amount;
      break;
  }
}

// フェーズ終了処理
function handleEndPhase(state: GameState): boolean {
  switch (state.phase) {
    case 'summon':
      state.phase = 'movement';
      break;
    case 'movement':
      state.phase = 'battle';
      break;
    case 'battle':
      state.phase = 'end';
      break;
    default:
      return false;
  }

  console.log(`フェーズ移行: ${state.phase}`);
  return true;
}

// ターン終了処理
function handleEndTurn(state: GameState): boolean {
  const currentIndex = state.players.findIndex(p => p.id === state.currentTurn);
  const nextIndex = (currentIndex + 1) % state.players.length;

  // 現在のプレイヤーの手札をクリア
  const currentPlayer = state.players[currentIndex];
  currentPlayer.hand = [];

  // ターン交代
  state.currentTurn = state.players[nextIndex].id;
  state.phase = 'roll';

  console.log(`ターン交代: ${state.players[nextIndex].name}のターン`);
  console.log(`${currentPlayer.name}の手札をクリア（クレストは保持）`);

  return true;
}
