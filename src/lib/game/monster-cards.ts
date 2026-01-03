// このファイルは自動生成されました
import type { MonsterCard } from './types';

export const MONSTER_CARDS: MonsterCard[] = [
  {
    id: 'リリンカーズ',
    name: 'リリンカーズ',
    level: 1,
    summonNumber: 1,
    monster: {
      name: 'リリンカーズ',
      attack: 0,
      defense: 0,
      hp: 10,
      abilities: [
        {
          type: 'CONTROL',
          cost: { /* 罠クレスト10＋自壊 */ },
          effect: '罠クレスト10個と自壊で相手モンスター1体を奪取'
        }
      ],
    },
    expansionPattern: 0,
    diceFaces: [
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'defense', multiplier: 1 },
      { crestType: 'trap', multiplier: 3 }
    ]
  },
  {
    id: '時の魔術師',
    name: '時の魔術師',
    level: 1,
    summonNumber: 1,
    monster: {
      name: '時の魔術師',
      attack: 0,
      defense: 10,
      hp: 10,
      abilities: [
        {
          type: 'DESTROY',
          effect: '召喚時、最も攻撃力が低いモンスターを破壊'
        }
      ],
    },
    expansionPattern: 1,
    diceFaces: [
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'movement', multiplier: 2 },
      { crestType: 'movement', multiplier: 3 }
    ]
  },
  {
    id: 'ドラゴン_パイパー',
    name: 'ドラゴン・パイパー',
    level: 1,
    summonNumber: 1,
    monster: {
      name: 'ドラゴン・パイパー',
      attack: 0,
      defense: 10,
      hp: 10,
      abilities: [
        {
          type: 'SPECIAL',
          effect: '場にいる間、ドラゴンは2ターンに1マスしか移動できない'
        }
      ],
    },
    expansionPattern: 2,
    diceFaces: [
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'defense', multiplier: 1 },
      { crestType: 'magic', multiplier: 1 }
    ]
  },
  {
    id: '13人目の墓守',
    name: '13人目の墓守',
    level: 2,
    summonNumber: 2,
    monster: {
      name: '13人目の墓守',
      attack: 0,
      defense: 10,
      hp: 10,
      abilities: [
        {
          type: 'TUNNEL',
          cost: { /* 魔法クレスト2＋自壊 */ },
          effect: 'トンネル；魔法クレスト2個＋自身を犠牲にして敵1体のHP10削減'
        }
      ],
    },
    expansionPattern: 7,
    diceFaces: [
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'movement', multiplier: 7 },
      { crestType: 'attack', multiplier: 1 },
      { crestType: 'magic', multiplier: 1 }
    ]
  },
  {
    id: 'ミレニアム_シールド',
    name: 'ミレニアム・シールド',
    level: 3,
    summonNumber: 3,
    monster: {
      name: 'ミレニアム・シールド',
      attack: 0,
      defense: 40,
      hp: 10,
      abilities: [
        {
          type: 'SPECIAL',
          effect: '移動不可'
        }
      ],
    },
    expansionPattern: 8,
    diceFaces: [
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'movement', multiplier: 3 },
      { crestType: 'attack', multiplier: 1 },
      { crestType: 'attack', multiplier: 3 },
      { crestType: 'defense', multiplier: 4 }
    ]
  },
  {
    id: '右足の封印_エクゾディアの右足',
    name: '右足の封印 (エクゾディアの右足)',
    level: 3,
    summonNumber: 3,
    monster: {
      name: '右足の封印 (エクゾディアの右足)',
      attack: 10,
      defense: 0,
      hp: 10,

    },
    expansionPattern: 9,
    diceFaces: [
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'movement', multiplier: 2 },
      { crestType: 'movement', multiplier: 3 },
      { crestType: 'attack', multiplier: 2 },
      { crestType: 'defense', multiplier: 1 }
    ]
  },
  {
    id: '左足の封印',
    name: '左足の封印',
    level: 3,
    summonNumber: 3,
    monster: {
      name: '左足の封印',
      attack: 10,
      defense: 0,
      hp: 10,

    },
    expansionPattern: 10,
    diceFaces: [
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'movement', multiplier: 2 },
      { crestType: 'attack', multiplier: 1 },
      { crestType: 'defense', multiplier: 1 },
      { crestType: 'magic', multiplier: 1 }
    ]
  },
  {
    id: '右腕の封印',
    name: '右腕の封印',
    level: 3,
    summonNumber: 3,
    monster: {
      name: '右腕の封印',
      attack: 10,
      defense: 0,
      hp: 10,

    },
    expansionPattern: 11,
    diceFaces: [
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'movement', multiplier: 2 },
      { crestType: 'movement', multiplier: 3 },
      { crestType: 'attack', multiplier: 4 },
      { crestType: 'defense', multiplier: 2 }
    ]
  },
  {
    id: '左腕の封印',
    name: '左腕の封印',
    level: 3,
    summonNumber: 3,
    monster: {
      name: '左腕の封印',
      attack: 10,
      defense: 0,
      hp: 10,

    },
    expansionPattern: 8,
    diceFaces: [
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'movement', multiplier: 1 },
      { crestType: 'movement', multiplier: 3 },
      { crestType: 'attack', multiplier: 1 },
      { crestType: 'defense', multiplier: 1 }
    ]
  },
  {
    id: 'ベビー_ドラゴン',
    name: 'ベビー・ドラゴン',
    level: 1,
    summonNumber: 1,
    monster: {
      name: 'ベビー・ドラゴン',
      attack: 10,
      defense: 10,
      hp: 10,
      abilities: [
        {
          type: 'FLYING',
          effect: '飛行；クラス特有効果を受けない'
        }
      ],
    },
    expansionPattern: 1,
    diceFaces: [
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'attack', multiplier: 1 },
      { crestType: 'magic', multiplier: 1 }
    ]
  },
  {
    id: 'リュウ_キシン',
    name: 'リュウ・キシン',
    level: 2,
    summonNumber: 2,
    monster: {
      name: 'リュウ・キシン',
      attack: 10,
      defense: 10,
      hp: 10,

    },
    expansionPattern: 6,
    diceFaces: [
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'movement', multiplier: 1 },
      { crestType: 'attack', multiplier: 2 },
      { crestType: 'attack', multiplier: 2 }
    ]
  },
  {
    id: '守護神の翼竜_ウィングド_ドラゴン_1',
    name: '守護神の翼竜 (ウィングド・ドラゴン #1)',
    level: 2,
    summonNumber: 2,
    monster: {
      name: '守護神の翼竜 (ウィングド・ドラゴン #1)',
      attack: 10,
      defense: 10,
      hp: 10,
      abilities: [
        {
          type: 'FLYING',
          effect: '飛行；場にいる間トンネルを無効化'
        }
      ],
    },
    expansionPattern: 7,
    diceFaces: [
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'movement', multiplier: 2 },
      { crestType: 'movement', multiplier: 3 },
      { crestType: 'magic', multiplier: 1 }
    ]
  },
  {
    id: 'マッシュルーム_マン',
    name: 'マッシュルーム・マン',
    level: 1,
    summonNumber: 1,
    monster: {
      name: 'マッシュルーム・マン',
      attack: 10,
      defense: 10,
      hp: 10,

    },
    expansionPattern: 0,
    diceFaces: [
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'attack', multiplier: 2 },
      { crestType: 'magic', multiplier: 1 }
    ]
  },
  {
    id: 'シャドウ_スペクター',
    name: 'シャドウ・スペクター',
    level: 1,
    summonNumber: 1,
    monster: {
      name: 'シャドウ・スペクター',
      attack: 10,
      defense: 10,
      hp: 10,

    },
    expansionPattern: 1,
    diceFaces: [
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'attack', multiplier: 2 },
      { crestType: 'magic', multiplier: 1 }
    ]
  },
  {
    id: 'ビーバー_ウォリアー',
    name: 'ビーバー・ウォリアー',
    level: 1,
    summonNumber: 1,
    monster: {
      name: 'ビーバー・ウォリアー',
      attack: 10,
      defense: 10,
      hp: 10,

    },
    expansionPattern: 2,
    diceFaces: [
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'movement', multiplier: 2 },
      { crestType: 'attack', multiplier: 2 }
    ]
  },
  {
    id: 'ロック_オーガ_グロット_1',
    name: 'ロック・オーガ・グロット #1',
    level: 1,
    summonNumber: 1,
    monster: {
      name: 'ロック・オーガ・グロット #1',
      attack: 10,
      defense: 10,
      hp: 10,
      abilities: [
        {
          type: 'STAT_UP_DEF',
          effect: '場にいる間、魔法使い族の守備力10アップ'
        }
      ],
    },
    expansionPattern: 3,
    diceFaces: [
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'magic', multiplier: 2 },
      { crestType: 'trap', multiplier: 1 }
    ]
  },
  {
    id: 'ゾンビ_ウォリアー',
    name: 'ゾンビ・ウォリアー',
    level: 1,
    summonNumber: 1,
    monster: {
      name: 'ゾンビ・ウォリアー',
      attack: 10,
      defense: 10,
      hp: 10,
      abilities: [
        {
          type: 'STAT_UP_ATK',
          effect: '場にいる間、不死族の攻撃力10アップ'
        }
      ],
    },
    expansionPattern: 0,
    diceFaces: [
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'attack', multiplier: 1 },
      { crestType: 'defense', multiplier: 2 }
    ]
  },
  {
    id: 'サギー_ザ_ダーククラウン',
    name: 'サギー・ザ・ダーククラウン',
    level: 1,
    summonNumber: 1,
    monster: {
      name: 'サギー・ザ・ダーククラウン',
      attack: 10,
      defense: 10,
      hp: 10,
      abilities: [
        {
          type: 'DAMAGE_REDUCE',
          cost: { /* 守備クレスト2 */ },
          effect: '守備クレスト2個で仲間へのダメージを10軽減'
        }
      ],
    },
    expansionPattern: 1,
    diceFaces: [
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'defense', multiplier: 1 },
      { crestType: 'trap', multiplier: 1 }
    ]
  },
  {
    id: 'スネークヘア',
    name: 'スネークヘア',
    level: 1,
    summonNumber: 1,
    monster: {
      name: 'スネークヘア',
      attack: 10,
      defense: 10,
      hp: 10,
      abilities: [
        {
          type: 'FLYING',
          effect: '飛行；場にいる間、不死族の守備力10アップ'
        }
      ],
    },
    expansionPattern: 2,
    diceFaces: [
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'movement', multiplier: 1 },
      { crestType: 'magic', multiplier: 1 }
    ]
  },
  {
    id: 'カルボナーラ戦士',
    name: 'カルボナーラ戦士',
    level: 1,
    summonNumber: 1,
    monster: {
      name: 'カルボナーラ戦士',
      attack: 10,
      defense: 10,
      hp: 10,
      abilities: [
        {
          type: 'STAT_UP_ATK',
          effect: '場にいる間、戦士族の攻撃力10アップ'
        }
      ],
    },
    expansionPattern: 3,
    diceFaces: [
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'movement', multiplier: 2 },
      { crestType: 'trap', multiplier: 1 }
    ]
  },
  {
    id: 'サンガン',
    name: 'サンガン',
    level: 1,
    summonNumber: 1,
    monster: {
      name: 'サンガン',
      attack: 10,
      defense: 10,
      hp: 10,

    },
    expansionPattern: 0,
    diceFaces: [
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'attack', multiplier: 2 },
      { crestType: 'magic', multiplier: 4 }
    ]
  },
  {
    id: 'キラー_ニードル',
    name: 'キラー・ニードル',
    level: 1,
    summonNumber: 1,
    monster: {
      name: 'キラー・ニードル',
      attack: 10,
      defense: 10,
      hp: 10,
      abilities: [
        {
          type: 'FLYING',
          effect: '弓攻撃(飛行モンスターを攻撃可)'
        }
      ],
    },
    expansionPattern: 1,
    diceFaces: [
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'movement', multiplier: 1 },
      { crestType: 'attack', multiplier: 1 }
    ]
  },
  {
    id: 'クリボー',
    name: 'クリボー',
    level: 1,
    summonNumber: 1,
    monster: {
      name: 'クリボー',
      attack: 10,
      defense: 10,
      hp: 10,

    },
    expansionPattern: 2,
    diceFaces: [
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'attack', multiplier: 4 },
      { crestType: 'defense', multiplier: 2 }
    ]
  },
  {
    id: 'マンモスの墓場',
    name: 'マンモスの墓場',
    level: 1,
    summonNumber: 1,
    monster: {
      name: 'マンモスの墓場',
      attack: 10,
      defense: 10,
      hp: 10,
      abilities: [
        {
          type: 'TUNNEL',
          effect: 'トンネル；場にいる間、獣族の攻撃力10アップ'
        }
      ],
    },
    expansionPattern: 3,
    diceFaces: [
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'movement', multiplier: 5 },
      { crestType: 'magic', multiplier: 2 }
    ]
  },
  {
    id: 'ジェリーフィッシュ',
    name: 'ジェリーフィッシュ',
    level: 1,
    summonNumber: 1,
    monster: {
      name: 'ジェリーフィッシュ',
      attack: 10,
      defense: 10,
      hp: 10,
      abilities: [
        {
          type: 'STAT_UP_DEF',
          effect: '場にいる間、獣族の守備力10アップ'
        }
      ],
    },
    expansionPattern: 0,
    diceFaces: [
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'movement', multiplier: 1 },
      { crestType: 'magic', multiplier: 2 }
    ]
  },
  {
    id: 'クラウン_ゾンビ',
    name: 'クラウン・ゾンビ',
    level: 1,
    summonNumber: 1,
    monster: {
      name: 'クラウン・ゾンビ',
      attack: 10,
      defense: 10,
      hp: 10,
      abilities: [
        {
          type: 'TUNNEL',
          effect: 'トンネル；種族指定の効果を受けない'
        }
      ],
    },
    expansionPattern: 1,
    diceFaces: [
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'movement', multiplier: 2 },
      { crestType: 'trap', multiplier: 4 }
    ]
  },
  {
    id: 'プチドラゴン',
    name: 'プチドラゴン',
    level: 1,
    summonNumber: 1,
    monster: {
      name: 'プチドラゴン',
      attack: 10,
      defense: 10,
      hp: 10,
      abilities: [
        {
          type: 'STAT_UP_ATK',
          effect: '場にいる間、ドラゴン族の攻撃力10アップ'
        }
      ],
    },
    expansionPattern: 2,
    diceFaces: [
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'attack', multiplier: 1 },
      { crestType: 'trap', multiplier: 1 }
    ]
  },
  {
    id: 'ぬいぐるみ',
    name: 'ぬいぐるみ',
    level: 1,
    summonNumber: 1,
    monster: {
      name: 'ぬいぐるみ',
      attack: 10,
      defense: 10,
      hp: 10,

    },
    expansionPattern: 3,
    diceFaces: [
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'movement', multiplier: 2 },
      { crestType: 'defense', multiplier: 1 }
    ]
  },
  {
    id: 'フライング_ペンギン',
    name: 'フライング・ペンギン',
    level: 2,
    summonNumber: 2,
    monster: {
      name: 'フライング・ペンギン',
      attack: 10,
      defense: 10,
      hp: 10,

    },
    expansionPattern: 4,
    diceFaces: [
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'defense', multiplier: 1 },
      { crestType: 'magic', multiplier: 1 },
      { crestType: 'trap', multiplier: 1 }
    ]
  },
  {
    id: '悪魔の鏡',
    name: '悪魔の鏡',
    level: 2,
    summonNumber: 2,
    monster: {
      name: '悪魔の鏡',
      attack: 10,
      defense: 10,
      hp: 10,

    },
    expansionPattern: 5,
    diceFaces: [
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'attack', multiplier: 1 },
      { crestType: 'defense', multiplier: 2 },
      { crestType: 'trap', multiplier: 2 }
    ]
  },
  {
    id: 'パロット_ドラゴン',
    name: 'パロット・ドラゴン',
    level: 1,
    summonNumber: 1,
    monster: {
      name: 'パロット・ドラゴン',
      attack: 10,
      defense: 10,
      hp: 10,
      abilities: [
        {
          type: 'FLYING',
          effect: '飛行；場にいる間、ドラゴン族の守備力10アップ'
        }
      ],
    },
    expansionPattern: 2,
    diceFaces: [
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'movement', multiplier: 2 },
      { crestType: 'trap', multiplier: 1 }
    ]
  },
  {
    id: 'ミスティック_ランプ',
    name: 'ミスティック・ランプ',
    level: 1,
    summonNumber: 1,
    monster: {
      name: 'ミスティック・ランプ',
      attack: 10,
      defense: 10,
      hp: 10,
      abilities: [
        {
          type: 'STAT_UP_ATK',
          effect: '場にいる間、魔法使い族の攻撃力10アップ'
        }
      ],
    },
    expansionPattern: 3,
    diceFaces: [
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'magic', multiplier: 1 },
      { crestType: 'magic', multiplier: 1 }
    ]
  },
  {
    id: 'マンイーター_バグ',
    name: 'マンイーター・バグ',
    level: 1,
    summonNumber: 1,
    monster: {
      name: 'マンイーター・バグ',
      attack: 10,
      defense: 10,
      hp: 10,

    },
    expansionPattern: 0,
    diceFaces: [
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'movement', multiplier: 1 },
      { crestType: 'attack', multiplier: 2 }
    ]
  },
  {
    id: 'スケルエンジェル',
    name: 'スケルエンジェル',
    level: 1,
    summonNumber: 1,
    monster: {
      name: 'スケルエンジェル',
      attack: 10,
      defense: 10,
      hp: 10,
      abilities: [
        {
          type: 'STAT_UP_DEF',
          effect: '場にいる間、戦士族の守備力10アップ'
        }
      ],
    },
    expansionPattern: 1,
    diceFaces: [
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'movement', multiplier: 1 },
      { crestType: 'magic', multiplier: 1 }
    ]
  },
  {
    id: 'ハネハネ',
    name: 'ハネハネ',
    level: 1,
    summonNumber: 1,
    monster: {
      name: 'ハネハネ',
      attack: 10,
      defense: 10,
      hp: 10,

    },
    expansionPattern: 2,
    diceFaces: [
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'defense', multiplier: 4 },
      { crestType: 'magic', multiplier: 1 }
    ]
  },
  {
    id: 'ペンギン_ソルジャー',
    name: 'ペンギン・ソルジャー',
    level: 1,
    summonNumber: 1,
    monster: {
      name: 'ペンギン・ソルジャー',
      attack: 10,
      defense: 10,
      hp: 10,

    },
    expansionPattern: 3,
    diceFaces: [
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'movement', multiplier: 2 },
      { crestType: 'movement', multiplier: 3 }
    ]
  },
  {
    id: 'ウィッチズ_アプレンティス',
    name: 'ウィッチズ・アプレンティス',
    level: 1,
    summonNumber: 1,
    monster: {
      name: 'ウィッチズ・アプレンティス',
      attack: 10,
      defense: 10,
      hp: 10,

    },
    expansionPattern: 0,
    diceFaces: [
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'movement', multiplier: 2 },
      { crestType: 'trap', multiplier: 1 }
    ]
  },
  {
    id: 'レッド_アーチャー_ガール',
    name: 'レッド・アーチャー・ガール',
    level: 1,
    summonNumber: 1,
    monster: {
      name: 'レッド・アーチャー・ガール',
      attack: 10,
      defense: 10,
      hp: 10,

    },
    expansionPattern: 1,
    diceFaces: [
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'movement', multiplier: 1 },
      { crestType: 'defense', multiplier: 2 }
    ]
  },
  {
    id: 'ダーク_アイズ_イリュージョニスト',
    name: 'ダーク・アイズ・イリュージョニスト',
    level: 4,
    summonNumber: 4,
    monster: {
      name: 'ダーク・アイズ・イリュージョニスト',
      attack: 10,
      defense: 10,
      hp: 10,
      abilities: [
        {
          type: 'NEGATE',
          cost: { /* 罠クレスト5 */ },
          effect: '罠クレスト5個で仲間への攻撃や効果を無効'
        }
      ],
    },
    expansionPattern: 6,
    diceFaces: [
      { crestType: 'summon', summonNumber: 4, multiplier: 1 },
      { crestType: 'movement', multiplier: 1 },
      { crestType: 'attack', multiplier: 2 },
      { crestType: 'defense', multiplier: 2 },
      { crestType: 'magic', multiplier: 1 },
      { crestType: 'trap', multiplier: 3 }
    ]
  },
  {
    id: 'サウザンド_アイズ_サクリファイス',
    name: 'サウザンド・アイズ・サクリファイス',
    level: 4,
    summonNumber: 4,
    monster: {
      name: 'サウザンド・アイズ・サクリファイス',
      attack: 10,
      defense: 10,
      hp: 10,
      abilities: [
        {
          type: 'CONTROL',
          cost: { /* 罠クレスト8 */ },
          effect: '罠クレスト8個で敵1体をターン終了まで支配'
        }
      ],
    },
    expansionPattern: 7,
    diceFaces: [
      { crestType: 'summon', summonNumber: 4, multiplier: 1 },
      { crestType: 'movement', multiplier: 2 },
      { crestType: 'attack', multiplier: 1 },
      { crestType: 'defense', multiplier: 2 },
      { crestType: 'magic', multiplier: 5 },
      { crestType: 'trap', multiplier: 1 }
    ]
  },
  {
    id: 'ロード_オブ_d',
    name: 'ロード・オブ・D',
    level: 2,
    summonNumber: 2,
    monster: {
      name: 'ロード・オブ・D',
      attack: 10,
      defense: 10,
      hp: 10,
      abilities: [
        {
          type: 'SPECIAL',
          effect: '場にいる間、ドラゴン族を保護'
        }
      ],
    },
    expansionPattern: 4,
    diceFaces: [
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'movement', multiplier: 1 },
      { crestType: 'attack', multiplier: 1 },
      { crestType: 'magic', multiplier: 2 }
    ]
  },
  {
    id: '人造人間_サイコ_ショッカー',
    name: '人造人間－サイコ・ショッカー',
    level: 3,
    summonNumber: 3,
    monster: {
      name: '人造人間－サイコ・ショッカー',
      attack: 10,
      defense: 10,
      hp: 10,

    },
    expansionPattern: 9,
    diceFaces: [
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'movement', multiplier: 1 },
      { crestType: 'attack', multiplier: 3 },
      { crestType: 'defense', multiplier: 2 },
      { crestType: 'trap', multiplier: 1 }
    ]
  },
  {
    id: 'ツインヘッド_ドラゴン',
    name: 'ツインヘッド・ドラゴン',
    level: 1,
    summonNumber: 1,
    monster: {
      name: 'ツインヘッド・ドラゴン',
      attack: 10,
      defense: 10,
      hp: 10,
      abilities: [
        {
          type: 'TUNNEL',
          effect: 'トンネル；召喚時に罠クレスト1個獲得'
        }
      ],
    },
    expansionPattern: 2,
    diceFaces: [
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'defense', multiplier: 1 },
      { crestType: 'magic', multiplier: 2 }
    ]
  },
  {
    id: 'フェラル_インプ',
    name: 'フェラル・インプ',
    level: 2,
    summonNumber: 2,
    monster: {
      name: 'フェラル・インプ',
      attack: 10,
      defense: 20,
      hp: 10,
      abilities: [
        {
          type: 'FLYING',
          effect: '場にいる間、飛行持ちを無効化'
        }
      ],
    },
    expansionPattern: 7,
    diceFaces: [
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'movement', multiplier: 3 },
      { crestType: 'attack', multiplier: 5 },
      { crestType: 'defense', multiplier: 1 }
    ]
  },
  {
    id: 'アクア_マドール',
    name: 'アクア・マドール',
    level: 1,
    summonNumber: 1,
    monster: {
      name: 'アクア・マドール',
      attack: 10,
      defense: 20,
      hp: 10,

    },
    expansionPattern: 0,
    diceFaces: [
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'attack', multiplier: 2 },
      { crestType: 'trap', multiplier: 1 }
    ]
  },
  {
    id: '一つ目巨人_ヒトツメ_ジャイアント',
    name: '一つ目巨人 (ヒトツメ・ジャイアント)',
    level: 2,
    summonNumber: 2,
    monster: {
      name: '一つ目巨人 (ヒトツメ・ジャイアント)',
      attack: 20,
      defense: 10,
      hp: 10,

    },
    expansionPattern: 5,
    diceFaces: [
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'attack', multiplier: 2 },
      { crestType: 'defense', multiplier: 2 },
      { crestType: 'magic', multiplier: 1 }
    ]
  },
  {
    id: 'ケルティック_ガーディアン',
    name: 'ケルティック・ガーディアン',
    level: 2,
    summonNumber: 2,
    monster: {
      name: 'ケルティック・ガーディアン',
      attack: 20,
      defense: 10,
      hp: 10,

    },
    expansionPattern: 6,
    diceFaces: [
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'movement', multiplier: 3 },
      { crestType: 'magic', multiplier: 3 },
      { crestType: 'trap', multiplier: 1 }
    ]
  },
  {
    id: 'ジャイアント_フリー',
    name: 'ジャイアント・フリー',
    level: 1,
    summonNumber: 1,
    monster: {
      name: 'ジャイアント・フリー',
      attack: 20,
      defense: 10,
      hp: 10,

    },
    expansionPattern: 3,
    diceFaces: [
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'movement', multiplier: 1 },
      { crestType: 'trap', multiplier: 1 }
    ]
  },
  {
    id: '剣の女王カナン',
    name: '剣の女王カナン',
    level: 2,
    summonNumber: 2,
    monster: {
      name: '剣の女王カナン',
      attack: 20,
      defense: 10,
      hp: 10,

    },
    expansionPattern: 4,
    diceFaces: [
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'movement', multiplier: 1 },
      { crestType: 'defense', multiplier: 1 },
      { crestType: 'defense', multiplier: 1 }
    ]
  },
  {
    id: '三つ目ゾンビ',
    name: '三つ目ゾンビ',
    level: 1,
    summonNumber: 1,
    monster: {
      name: '三つ目ゾンビ',
      attack: 20,
      defense: 10,
      hp: 10,

    },
    expansionPattern: 1,
    diceFaces: [
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'attack', multiplier: 1 },
      { crestType: 'defense', multiplier: 4 }
    ]
  },
  {
    id: 'フェイスレス_メイジ',
    name: 'フェイスレス・メイジ',
    level: 3,
    summonNumber: 3,
    monster: {
      name: 'フェイスレス・メイジ',
      attack: 20,
      defense: 30,
      hp: 10,

    },
    expansionPattern: 10,
    diceFaces: [
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'movement', multiplier: 3 },
      { crestType: 'movement', multiplier: 3 },
      { crestType: 'attack', multiplier: 1 },
      { crestType: 'defense', multiplier: 2 }
    ]
  },
  {
    id: 'ジェミニ_エルフ',
    name: 'ジェミニ・エルフ',
    level: 3,
    summonNumber: 3,
    monster: {
      name: 'ジェミニ・エルフ',
      attack: 40,
      defense: 10,
      hp: 10,

    },
    expansionPattern: 11,
    diceFaces: [
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'movement', multiplier: 1 },
      { crestType: 'attack', multiplier: 1 },
      { crestType: 'defense', multiplier: 3 },
      { crestType: 'trap', multiplier: 4 }
    ]
  },
  {
    id: 'ハーピィ_レディ',
    name: 'ハーピィ・レディ',
    level: 2,
    summonNumber: 2,
    monster: {
      name: 'ハーピィ・レディ',
      attack: 10,
      defense: 10,
      hp: 20,
      abilities: [
        {
          type: 'FLYING',
          cost: { /* 魔法クレスト3 */ },
          effect: '飛行；魔法クレスト3個でトンネル持ちモンスター1体破壊'
        }
      ],
    },
    expansionPattern: 4,
    diceFaces: [
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'movement', multiplier: 1 },
      { crestType: 'movement', multiplier: 1 },
      { crestType: 'magic', multiplier: 3 }
    ]
  },
  {
    id: '美しき首狩りの女',
    name: '美しき首狩りの女',
    level: 3,
    summonNumber: 3,
    monster: {
      name: '美しき首狩りの女',
      attack: 10,
      defense: 10,
      hp: 20,

    },
    expansionPattern: 9,
    diceFaces: [
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'movement', multiplier: 4 },
      { crestType: 'defense', multiplier: 1 },
      { crestType: 'defense', multiplier: 1 },
      { crestType: 'magic', multiplier: 2 }
    ]
  },
  {
    id: 'ヤランゾ',
    name: 'ヤランゾ',
    level: 2,
    summonNumber: 2,
    monster: {
      name: 'ヤランゾ',
      attack: 10,
      defense: 10,
      hp: 20,
      abilities: [
        {
          type: 'SPECIAL',
          cost: { /* 任意クレスト3 */ },
          effect: '召喚時、クレスト3個を任意のクレスト1個に変換'
        }
      ],
    },
    expansionPattern: 6,
    diceFaces: [
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'movement', multiplier: 2 },
      { crestType: 'attack', multiplier: 1 },
      { crestType: 'defense', multiplier: 1 }
    ]
  },
  {
    id: 'ジライアグモ',
    name: 'ジライアグモ',
    level: 1,
    summonNumber: 1,
    monster: {
      name: 'ジライアグモ',
      attack: 10,
      defense: 10,
      hp: 20,
      abilities: [
        {
          type: 'TUNNEL',
          effect: 'トンネル'
        }
      ],
    },
    expansionPattern: 3,
    diceFaces: [
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'defense', multiplier: 6 },
      { crestType: 'magic', multiplier: 1 }
    ]
  },
  {
    id: 'ブラスト_リザード',
    name: 'ブラスト・リザード',
    level: 2,
    summonNumber: 2,
    monster: {
      name: 'ブラスト・リザード',
      attack: 10,
      defense: 10,
      hp: 20,
      abilities: [
        {
          type: 'DESTROY',
          cost: { /* 罠クレスト3 */ },
          effect: '罠クレスト3個でXモンスター1体破壊し魔法クレストX個獲得'
        }
      ],
    },
    expansionPattern: 4,
    diceFaces: [
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'attack', multiplier: 1 },
      { crestType: 'defense', multiplier: 1 },
      { crestType: 'trap', multiplier: 4 }
    ]
  },
  {
    id: 'マジシャン_エルフ_ミスティカル_エルフ',
    name: 'マジシャン・エルフ (ミスティカル・エルフ)',
    level: 1,
    summonNumber: 1,
    monster: {
      name: 'マジシャン・エルフ (ミスティカル・エルフ)',
      attack: 10,
      defense: 20,
      hp: 20,
      abilities: [
        {
          type: 'HEAL',
          effect: '召喚時に味方のHPを10回復'
        }
      ],
    },
    expansionPattern: 1,
    diceFaces: [
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'movement', multiplier: 2 },
      { crestType: 'magic', multiplier: 4 }
    ]
  },
  {
    id: '沼地の守備隊_スワンプ_バトルガード',
    name: '沼地の守備隊 (スワンプ・バトルガード)',
    level: 2,
    summonNumber: 2,
    monster: {
      name: '沼地の守備隊 (スワンプ・バトルガード)',
      attack: 10,
      defense: 20,
      hp: 20,
      abilities: [
        {
          type: 'STAT_UP_ATK',
          cost: { /* 攻撃クレスト1 */ },
          effect: '攻撃時に攻撃クレスト1個で攻撃力10アップ'
        }
      ],
    },
    expansionPattern: 6,
    diceFaces: [
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'movement', multiplier: 2 },
      { crestType: 'attack', multiplier: 2 },
      { crestType: 'trap', multiplier: 1 }
    ]
  },
  {
    id: 'コウモリドラゴン',
    name: 'コウモリドラゴン',
    level: 2,
    summonNumber: 2,
    monster: {
      name: 'コウモリドラゴン',
      attack: 10,
      defense: 20,
      hp: 20,

    },
    expansionPattern: 7,
    diceFaces: [
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'movement', multiplier: 1 },
      { crestType: 'attack', multiplier: 1 },
      { crestType: 'defense', multiplier: 1 }
    ]
  },
  {
    id: '暗黒城の魔術師',
    name: '暗黒城の魔術師',
    level: 2,
    summonNumber: 2,
    monster: {
      name: '暗黒城の魔術師',
      attack: 10,
      defense: 20,
      hp: 20,
      abilities: [
        {
          type: 'DAMAGE_REDUCE',
          cost: { /* 任意クレスト2 */ },
          effect: 'クレスト2個で被ダメージを20軽減'
        }
      ],
    },
    expansionPattern: 4,
    diceFaces: [
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'movement', multiplier: 1 },
      { crestType: 'defense', multiplier: 1 },
      { crestType: 'defense', multiplier: 1 }
    ]
  },
  {
    id: '巨岩の戦士',
    name: '巨岩の戦士',
    level: 2,
    summonNumber: 2,
    monster: {
      name: '巨岩の戦士',
      attack: 10,
      defense: 30,
      hp: 20,
      abilities: [
        {
          type: 'DESTROY',
          cost: { /* 魔法クレスト2 */ },
          effect: '魔法クレスト2個で障害物1つ破壊'
        }
      ],
    },
    expansionPattern: 5,
    diceFaces: [
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'movement', multiplier: 2 },
      { crestType: 'attack', multiplier: 2 },
      { crestType: 'trap', multiplier: 1 }
    ]
  },
  {
    id: 'メタル_ガーディアン',
    name: 'メタル・ガーディアン',
    level: 2,
    summonNumber: 2,
    monster: {
      name: 'メタル・ガーディアン',
      attack: 10,
      defense: 30,
      hp: 20,

    },
    expansionPattern: 6,
    diceFaces: [
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'movement', multiplier: 1 },
      { crestType: 'attack', multiplier: 1 },
      { crestType: 'defense', multiplier: 1 }
    ]
  },
  {
    id: '進化の繭',
    name: '進化の繭',
    level: 2,
    summonNumber: 2,
    monster: {
      name: '進化の繭',
      attack: 10,
      defense: 40,
      hp: 20,

    },
    expansionPattern: 7,
    diceFaces: [
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'attack', multiplier: 1 },
      { crestType: 'magic', multiplier: 1 },
      { crestType: 'trap', multiplier: 3 }
    ]
  },
  {
    id: 'バトル_ウォリアー',
    name: 'バトル・ウォリアー',
    level: 1,
    summonNumber: 1,
    monster: {
      name: 'バトル・ウォリアー',
      attack: 20,
      defense: 10,
      hp: 20,
      abilities: [
        {
          type: 'RANGE_ATTACK',
          effect: '弓攻撃；召喚時に攻撃クレスト1個獲得'
        }
      ],
    },
    expansionPattern: 0,
    diceFaces: [
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'attack', multiplier: 1 },
      { crestType: 'magic', multiplier: 1 }
    ]
  },
  {
    id: 'ダンシング_エルフ',
    name: 'ダンシング・エルフ',
    level: 1,
    summonNumber: 1,
    monster: {
      name: 'ダンシング・エルフ',
      attack: 20,
      defense: 10,
      hp: 20,

    },
    expansionPattern: 1,
    diceFaces: [
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'attack', multiplier: 1 },
      { crestType: 'magic', multiplier: 1 }
    ]
  },
  {
    id: 'dark_magician',
    name: 'ブラック・マジシャン・ガール',
    level: 3,
    summonNumber: 3,
    monster: {
      name: 'ブラック・マジシャン・ガール',
      attack: 20,
      defense: 10,
      hp: 20,
      abilities: [
        {
          type: 'DESTROY',
          effect: '破壊された魔法使い族モンスターのATKとDEFを引き継ぐ'
        }
      ],
    },
    expansionPattern: 10,
    diceFaces: [
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'movement', multiplier: 1 },
      { crestType: 'attack', multiplier: 1 },
      { crestType: 'defense', multiplier: 1 },
      { crestType: 'trap', multiplier: 1 }
    ]
  },
  {
    id: 'ストライク_ニンジャ',
    name: 'ストライク・ニンジャ',
    level: 3,
    summonNumber: 3,
    monster: {
      name: 'ストライク・ニンジャ',
      attack: 20,
      defense: 10,
      hp: 20,
      abilities: [
        {
          type: 'SPECIAL',
          cost: { /* 進行クレスト1／罠クレスト2 */ },
          effect: '進行クレスト1個で3マス移動；罠クレスト2個で自身を無敵化'
        }
      ],
    },
    expansionPattern: 11,
    diceFaces: [
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'movement', multiplier: 1 },
      { crestType: 'movement', multiplier: 3 },
      { crestType: 'attack', multiplier: 1 },
      { crestType: 'defense', multiplier: 1 }
    ]
  },
  {
    id: 'バトル_ステア',
    name: 'バトル・ステア',
    level: 2,
    summonNumber: 2,
    monster: {
      name: 'バトル・ステア',
      attack: 20,
      defense: 20,
      hp: 20,

    },
    expansionPattern: 4,
    diceFaces: [
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'movement', multiplier: 3 },
      { crestType: 'defense', multiplier: 1 },
      { crestType: 'trap', multiplier: 4 }
    ]
  },
  {
    id: '炎の剣士_フレイム_ソードマン',
    name: '炎の剣士 (フレイム・ソードマン)',
    level: 2,
    summonNumber: 2,
    monster: {
      name: '炎の剣士 (フレイム・ソードマン)',
      attack: 20,
      defense: 20,
      hp: 20,

    },
    expansionPattern: 5,
    diceFaces: [
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'movement', multiplier: 1 },
      { crestType: 'movement', multiplier: 2 },
      { crestType: 'attack', multiplier: 2 }
    ]
  },
  {
    id: '封印されしエクゾディア',
    name: '封印されしエクゾディア',
    level: 4,
    summonNumber: 4,
    monster: {
      name: '封印されしエクゾディア',
      attack: 20,
      defense: 20,
      hp: 20,
      abilities: [
        {
          type: 'AUTO_WIN',
          effect: '四肢が全て揃うと自動勝利'
        }
      ],
    },
    expansionPattern: 6,
    diceFaces: [
      { crestType: 'summon', summonNumber: 4, multiplier: 1 },
      { crestType: 'movement', multiplier: 1 },
      { crestType: 'movement', multiplier: 7 },
      { crestType: 'attack', multiplier: 2 },
      { crestType: 'defense', multiplier: 4 },
      { crestType: 'trap', multiplier: 1 }
    ]
  },
  {
    id: 'バトル_オックス',
    name: 'バトル・オックス',
    level: 2,
    summonNumber: 2,
    monster: {
      name: 'バトル・オックス',
      attack: 20,
      defense: 20,
      hp: 20,

    },
    expansionPattern: 7,
    diceFaces: [
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'movement', multiplier: 2 },
      { crestType: 'defense', multiplier: 1 },
      { crestType: 'magic', multiplier: 2 }
    ]
  },
  {
    id: 'カース_オブ_ドラゴン',
    name: 'カース・オブ・ドラゴン',
    level: 3,
    summonNumber: 3,
    monster: {
      name: 'カース・オブ・ドラゴン',
      attack: 20,
      defense: 20,
      hp: 20,
      abilities: [
        {
          type: 'FLYING',
          effect: '飛行'
        }
      ],
    },
    expansionPattern: 8,
    diceFaces: [
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'movement', multiplier: 1 },
      { crestType: 'movement', multiplier: 3 },
      { crestType: 'attack', multiplier: 1 },
      { crestType: 'defense', multiplier: 3 }
    ]
  },
  {
    id: 'ラーバ_モス',
    name: 'ラーバ・モス',
    level: 1,
    summonNumber: 1,
    monster: {
      name: 'ラーバ・モス',
      attack: 20,
      defense: 20,
      hp: 20,

    },
    expansionPattern: 1,
    diceFaces: [
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'summon', summonNumber: 1, multiplier: 1 },
      { crestType: 'movement', multiplier: 1 },
      { crestType: 'defense', multiplier: 1 }
    ]
  },
  {
    id: 'ハーピィ_レディ三姉妹',
    name: 'ハーピィ・レディ三姉妹',
    level: 3,
    summonNumber: 3,
    monster: {
      name: 'ハーピィ・レディ三姉妹',
      attack: 20,
      defense: 20,
      hp: 20,
      abilities: [
        {
          type: 'TUNNEL',
          cost: { /* 魔法クレスト4 */ },
          effect: '魔法クレスト4個でトンネル持ちモンスター全て破壊'
        }
      ],
    },
    expansionPattern: 10,
    diceFaces: [
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'movement', multiplier: 2 },
      { crestType: 'attack', multiplier: 3 },
      { crestType: 'defense', multiplier: 1 },
      { crestType: 'trap', multiplier: 2 }
    ]
  },
  {
    id: 'ドクロ_ライダー',
    name: 'ドクロ・ライダー',
    level: 3,
    summonNumber: 3,
    monster: {
      name: 'ドクロ・ライダー',
      attack: 20,
      defense: 20,
      hp: 20,

    },
    expansionPattern: 11,
    diceFaces: [
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'movement', multiplier: 1 },
      { crestType: 'attack', multiplier: 1 },
      { crestType: 'defense', multiplier: 2 },
      { crestType: 'magic', multiplier: 2 }
    ]
  },
  {
    id: 'ペンデュラム_マシン',
    name: 'ペンデュラム・マシン',
    level: 3,
    summonNumber: 3,
    monster: {
      name: 'ペンデュラム・マシン',
      attack: 20,
      defense: 30,
      hp: 20,

    },
    expansionPattern: 8,
    diceFaces: [
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'movement', multiplier: 1 },
      { crestType: 'attack', multiplier: 1 },
      { crestType: 'magic', multiplier: 3 },
      { crestType: 'trap', multiplier: 1 }
    ]
  },
  {
    id: 'ローグ_ドール',
    name: 'ローグ・ドール',
    level: 3,
    summonNumber: 3,
    monster: {
      name: 'ローグ・ドール',
      attack: 30,
      defense: 20,
      hp: 20,
      abilities: [
        {
          type: 'HEAL',
          cost: { /* 魔法クレスト3 */ },
          effect: '魔法クレスト3個で味方2体のHPを10回復'
        }
      ],
    },
    expansionPattern: 9,
    diceFaces: [
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'movement', multiplier: 1 },
      { crestType: 'attack', multiplier: 1 },
      { crestType: 'attack', multiplier: 1 },
      { crestType: 'defense', multiplier: 1 }
    ]
  },
  {
    id: 'サウザンド_ドラゴン',
    name: 'サウザンド・ドラゴン',
    level: 2,
    summonNumber: 2,
    monster: {
      name: 'サウザンド・ドラゴン',
      attack: 30,
      defense: 20,
      hp: 20,

    },
    expansionPattern: 6,
    diceFaces: [
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'movement', multiplier: 2 },
      { crestType: 'attack', multiplier: 7 },
      { crestType: 'defense', multiplier: 1 }
    ]
  },
  {
    id: 'リュウキシン_パワード',
    name: 'リュウキシン・パワード',
    level: 2,
    summonNumber: 2,
    monster: {
      name: 'リュウキシン・パワード',
      attack: 30,
      defense: 20,
      hp: 20,

    },
    expansionPattern: 7,
    diceFaces: [
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'movement', multiplier: 2 },
      { crestType: 'attack', multiplier: 1 },
      { crestType: 'defense', multiplier: 1 }
    ]
  },
  {
    id: 'ゾア',
    name: 'ゾア',
    level: 3,
    summonNumber: 3,
    monster: {
      name: 'ゾア',
      attack: 30,
      defense: 20,
      hp: 20,

    },
    expansionPattern: 8,
    diceFaces: [
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'movement', multiplier: 4 },
      { crestType: 'attack', multiplier: 1 },
      { crestType: 'defense', multiplier: 1 },
      { crestType: 'defense', multiplier: 2 }
    ]
  },
  {
    id: '双頭のサンダー_ドラゴン',
    name: '双頭のサンダー・ドラゴン',
    level: 3,
    summonNumber: 3,
    monster: {
      name: '双頭のサンダー・ドラゴン',
      attack: 40,
      defense: 20,
      hp: 20,

    },
    expansionPattern: 9,
    diceFaces: [
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'movement', multiplier: 1 },
      { crestType: 'attack', multiplier: 2 },
      { crestType: 'magic', multiplier: 2 },
      { crestType: 'trap', multiplier: 2 }
    ]
  },
  {
    id: 'ゲイター_ドラゴン',
    name: 'ゲイター・ドラゴン',
    level: 2,
    summonNumber: 2,
    monster: {
      name: 'ゲイター・ドラゴン',
      attack: 10,
      defense: 10,
      hp: 30,
      abilities: [
        {
          type: 'DAMAGE_REDUCE',
          cost: { /* 守備クレストX */ },
          effect: '守備クレストX個で被ダメージを10×X軽減'
        }
      ],
    },
    expansionPattern: 6,
    diceFaces: [
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'movement', multiplier: 1 },
      { crestType: 'defense', multiplier: 1 },
      { crestType: 'trap', multiplier: 1 }
    ]
  },
  {
    id: 'ナイト_オブ_ツインソード',
    name: 'ナイト・オブ・ツインソード',
    level: 2,
    summonNumber: 2,
    monster: {
      name: 'ナイト・オブ・ツインソード',
      attack: 10,
      defense: 10,
      hp: 30,
      abilities: [
        {
          type: 'SPECIAL',
          cost: { /* 進行クレスト1 */ },
          effect: '進行クレスト1個で2マス移動；1ターンに最大3回攻撃'
        }
      ],
    },
    expansionPattern: 7,
    diceFaces: [
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'movement', multiplier: 1 },
      { crestType: 'attack', multiplier: 1 },
      { crestType: 'defense', multiplier: 1 }
    ]
  },
  {
    id: 'サンダー_ボール',
    name: 'サンダー・ボール',
    level: 3,
    summonNumber: 3,
    monster: {
      name: 'サンダー・ボール',
      attack: 10,
      defense: 10,
      hp: 30,
      abilities: [
        {
          type: 'DESTROY',
          cost: { /* 罠クレスト3 */ },
          effect: '罠クレスト3個でXモンスター1体破壊し魔法クレストX個獲得'
        }
      ],
    },
    expansionPattern: 8,
    diceFaces: [
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'movement', multiplier: 1 },
      { crestType: 'movement', multiplier: 3 },
      { crestType: 'attack', multiplier: 2 },
      { crestType: 'defense', multiplier: 2 }
    ]
  },
  {
    id: 'スロット_マシン',
    name: 'スロット・マシン',
    level: 3,
    summonNumber: 3,
    monster: {
      name: 'スロット・マシン',
      attack: 20,
      defense: 20,
      hp: 30,

    },
    expansionPattern: 9,
    diceFaces: [
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'movement', multiplier: 2 },
      { crestType: 'attack', multiplier: 2 },
      { crestType: 'defense', multiplier: 1 },
      { crestType: 'trap', multiplier: 1 }
    ]
  },
  {
    id: 'オルゴース_ザ_リレントレス',
    name: 'オルゴース・ザ・リレントレス',
    level: 3,
    summonNumber: 3,
    monster: {
      name: 'オルゴース・ザ・リレントレス',
      attack: 20,
      defense: 20,
      hp: 30,
      abilities: [
        {
          type: 'STAT_UP_ATK',
          cost: { /* 魔法クレスト2 */ },
          effect: '魔法クレスト2個で攻撃力10アップ'
        }
      ],
    },
    expansionPattern: 10,
    diceFaces: [
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'movement', multiplier: 1 },
      { crestType: 'movement', multiplier: 3 },
      { crestType: 'attack', multiplier: 2 },
      { crestType: 'defense', multiplier: 1 }
    ]
  },
  {
    id: 'パンプキング',
    name: 'パンプキング',
    level: 3,
    summonNumber: 3,
    monster: {
      name: 'パンプキング',
      attack: 20,
      defense: 30,
      hp: 30,
      abilities: [
        {
          type: 'DAMAGE_REDUCE',
          cost: { /* 守備クレスト3 */ },
          effect: '守備クレスト3個でダメージ30軽減'
        }
      ],
    },
    expansionPattern: 11,
    diceFaces: [
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'movement', multiplier: 1 },
      { crestType: 'attack', multiplier: 2 },
      { crestType: 'defense', multiplier: 3 },
      { crestType: 'magic', multiplier: 2 }
    ]
  },
  {
    id: 'メテオ_ドラゴン',
    name: 'メテオ・ドラゴン',
    level: 3,
    summonNumber: 3,
    monster: {
      name: 'メテオ・ドラゴン',
      attack: 20,
      defense: 30,
      hp: 30,
      abilities: [
        {
          type: 'FLYING',
          effect: '飛行'
        }
      ],
    },
    expansionPattern: 8,
    diceFaces: [
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'movement', multiplier: 3 },
      { crestType: 'movement', multiplier: 4 },
      { crestType: 'defense', multiplier: 1 },
      { crestType: 'magic', multiplier: 1 }
    ]
  },
  {
    id: '雷電娘々',
    name: '雷電娘々',
    level: 4,
    summonNumber: 4,
    monster: {
      name: '雷電娘々',
      attack: 30,
      defense: 30,
      hp: 30,
      abilities: [
        {
          type: 'SPECIAL',
          cost: { /* 罠クレスト3 */ },
          effect: '罠クレスト3個でダメージを仲間に肩代わり'
        }
      ],
    },
    expansionPattern: 13,
    diceFaces: [
      { crestType: 'summon', summonNumber: 4, multiplier: 1 },
      { crestType: 'movement', multiplier: 1 },
      { crestType: 'movement', multiplier: 3 },
      { crestType: 'attack', multiplier: 3 },
      { crestType: 'defense', multiplier: 1 },
      { crestType: 'trap', multiplier: 1 }
    ]
  },
  {
    id: '風神ヒュー',
    name: '風神ヒュー',
    level: 4,
    summonNumber: 4,
    monster: {
      name: '風神ヒュー',
      attack: 30,
      defense: 30,
      hp: 30,
      abilities: [
        {
          type: 'SPECIAL',
          cost: { /* 罠クレスト3 */ },
          effect: '罠クレスト3個でダメージを仲間に肩代わり'
        }
      ],
    },
    expansionPattern: 6,
    diceFaces: [
      { crestType: 'summon', summonNumber: 4, multiplier: 1 },
      { crestType: 'movement', multiplier: 3 },
      { crestType: 'attack', multiplier: 1 },
      { crestType: 'defense', multiplier: 1 },
      { crestType: 'magic', multiplier: 1 },
      { crestType: 'trap', multiplier: 1 }
    ]
  },
  {
    id: '水神スー',
    name: '水神スー',
    level: 4,
    summonNumber: 4,
    monster: {
      name: '水神スー',
      attack: 30,
      defense: 30,
      hp: 30,
      abilities: [
        {
          type: 'SPECIAL',
          cost: { /* 罠クレスト3 */ },
          effect: '罠クレスト3個でダメージを仲間に肩代わり'
        }
      ],
    },
    expansionPattern: 7,
    diceFaces: [
      { crestType: 'summon', summonNumber: 4, multiplier: 1 },
      { crestType: 'movement', multiplier: 1 },
      { crestType: 'attack', multiplier: 1 },
      { crestType: 'defense', multiplier: 2 },
      { crestType: 'magic', multiplier: 1 },
      { crestType: 'trap', multiplier: 1 }
    ]
  },
  {
    id: 'メタルゾア',
    name: 'メタルゾア',
    level: 4,
    summonNumber: 4,
    monster: {
      name: 'メタルゾア',
      attack: 30,
      defense: 30,
      hp: 30,

    },
    expansionPattern: 12,
    diceFaces: [
      { crestType: 'summon', summonNumber: 4, multiplier: 1 },
      { crestType: 'movement', multiplier: 8 },
      { crestType: 'attack', multiplier: 1 },
      { crestType: 'defense', multiplier: 8 },
      { crestType: 'magic', multiplier: 1 },
      { crestType: 'trap', multiplier: 4 }
    ]
  },
  {
    id: 'dark_magician',
    name: 'ブラック・マジシャン',
    level: 4,
    summonNumber: 4,
    monster: {
      name: 'ブラック・マジシャン',
      attack: 40,
      defense: 20,
      hp: 30,

    },
    expansionPattern: 13,
    diceFaces: [
      { crestType: 'summon', summonNumber: 4, multiplier: 1 },
      { crestType: 'movement', multiplier: 2 },
      { crestType: 'attack', multiplier: 1 },
      { crestType: 'defense', multiplier: 2 },
      { crestType: 'magic', multiplier: 1 },
      { crestType: 'trap', multiplier: 1 }
    ]
  },
  {
    id: 'red_eyes_black_dragon',
    name: 'レッドアイズ・ブラックドラゴン',
    level: 4,
    summonNumber: 4,
    monster: {
      name: 'レッドアイズ・ブラックドラゴン',
      attack: 40,
      defense: 20,
      hp: 30,
      abilities: [
        {
          type: 'FLYING',
          effect: '飛行'
        }
      ],
    },
    expansionPattern: 6,
    diceFaces: [
      { crestType: 'summon', summonNumber: 4, multiplier: 1 },
      { crestType: 'movement', multiplier: 2 },
      { crestType: 'attack', multiplier: 1 },
      { crestType: 'defense', multiplier: 2 },
      { crestType: 'magic', multiplier: 2 },
      { crestType: 'trap', multiplier: 2 }
    ]
  },
  {
    id: 'メテオ_ブラック_ドラゴン',
    name: 'メテオ・ブラック・ドラゴン',
    level: 4,
    summonNumber: 4,
    monster: {
      name: 'メテオ・ブラック・ドラゴン',
      attack: 40,
      defense: 20,
      hp: 30,
      abilities: [
        {
          type: 'FLYING',
          effect: '飛行'
        }
      ],
    },
    expansionPattern: 7,
    diceFaces: [
      { crestType: 'summon', summonNumber: 4, multiplier: 1 },
      { crestType: 'movement', multiplier: 1 },
      { crestType: 'attack', multiplier: 1 },
      { crestType: 'defense', multiplier: 1 },
      { crestType: 'magic', multiplier: 1 },
      { crestType: 'trap', multiplier: 1 }
    ]
  },
  {
    id: 'レッドアイズ_ブラックメタルドラゴン',
    name: 'レッドアイズ・ブラックメタルドラゴン',
    level: 4,
    summonNumber: 4,
    monster: {
      name: 'レッドアイズ・ブラックメタルドラゴン',
      attack: 40,
      defense: 40,
      hp: 30,
      abilities: [
        {
          type: 'FLYING',
          effect: '飛行'
        }
      ],
    },
    expansionPattern: 12,
    diceFaces: [
      { crestType: 'summon', summonNumber: 4, multiplier: 1 },
      { crestType: 'movement', multiplier: 2 },
      { crestType: 'attack', multiplier: 1 },
      { crestType: 'defense', multiplier: 1 },
      { crestType: 'magic', multiplier: 3 },
      { crestType: 'trap', multiplier: 2 }
    ]
  },
  {
    id: 'ミスティック_ホースマン',
    name: 'ミスティック・ホースマン',
    level: 2,
    summonNumber: 2,
    monster: {
      name: 'ミスティック・ホースマン',
      attack: 20,
      defense: 10,
      hp: 40,
      abilities: [
        {
          type: 'STAT_UP_ATK',
          cost: { /* 魔法クレスト1 */ },
          effect: '魔法クレスト1個で自分の攻撃力10アップ（1ターン1回）'
        }
      ],
    },
    expansionPattern: 5,
    diceFaces: [
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'summon', summonNumber: 2, multiplier: 1 },
      { crestType: 'movement', multiplier: 2 },
      { crestType: 'attack', multiplier: 1 },
      { crestType: 'defense', multiplier: 1 }
    ]
  },
  {
    id: 'マジシャン_ドラゴン',
    name: 'マジシャン・ドラゴン',
    level: 3,
    summonNumber: 3,
    monster: {
      name: 'マジシャン・ドラゴン',
      attack: 20,
      defense: 10,
      hp: 40,
      abilities: [
        {
          type: 'SPECIAL',
          cost: { /* 罠クレスト3／魔法クレスト3 */ },
          effect: '罠クレスト3個で相手の守備力を自分に加える；魔法クレスト3個で3×3範囲を全滅'
        }
      ],
    },
    expansionPattern: 10,
    diceFaces: [
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'movement', multiplier: 4 },
      { crestType: 'attack', multiplier: 1 },
      { crestType: 'defense', multiplier: 1 },
      { crestType: 'defense', multiplier: 3 }
    ]
  },
  {
    id: 'グレート_モス',
    name: 'グレート・モス',
    level: 3,
    summonNumber: 3,
    monster: {
      name: 'グレート・モス',
      attack: 20,
      defense: 30,
      hp: 40,

    },
    expansionPattern: 11,
    diceFaces: [
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'movement', multiplier: 1 },
      { crestType: 'movement', multiplier: 2 },
      { crestType: 'attack', multiplier: 1 },
      { crestType: 'defense', multiplier: 1 }
    ]
  },
  {
    id: 'ラビッド_ホースマン',
    name: 'ラビッド・ホースマン',
    level: 3,
    summonNumber: 3,
    monster: {
      name: 'ラビッド・ホースマン',
      attack: 30,
      defense: 20,
      hp: 40,
      abilities: [
        {
          type: 'STAT_UP_ATK',
          cost: { /* 攻撃クレストX */ },
          effect: '攻撃クレストX個で攻撃力10×Xアップ'
        }
      ],
    },
    expansionPattern: 8,
    diceFaces: [
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'summon', summonNumber: 3, multiplier: 1 },
      { crestType: 'movement', multiplier: 2 },
      { crestType: 'attack', multiplier: 2 },
      { crestType: 'defense', multiplier: 1 },
      { crestType: 'magic', multiplier: 1 }
    ]
  },
  {
    id: 'バレル_ドラゴン',
    name: 'バレル・ドラゴン',
    level: 4,
    summonNumber: 4,
    monster: {
      name: 'バレル・ドラゴン',
      attack: 30,
      defense: 30,
      hp: 40,

    },
    expansionPattern: 13,
    diceFaces: [
      { crestType: 'summon', summonNumber: 4, multiplier: 1 },
      { crestType: 'movement', multiplier: 6 },
      { crestType: 'defense', multiplier: 1 },
      { crestType: 'magic', multiplier: 1 },
      { crestType: 'trap', multiplier: 2 },
      { crestType: 'trap', multiplier: 2 }
    ]
  },
  {
    id: 'サモンド_スカル',
    name: 'サモンド・スカル',
    level: 4,
    summonNumber: 4,
    monster: {
      name: 'サモンド・スカル',
      attack: 40,
      defense: 20,
      hp: 40,

    },
    expansionPattern: 6,
    diceFaces: [
      { crestType: 'summon', summonNumber: 4, multiplier: 1 },
      { crestType: 'movement', multiplier: 3 },
      { crestType: 'movement', multiplier: 3 },
      { crestType: 'attack', multiplier: 1 },
      { crestType: 'defense', multiplier: 1 },
      { crestType: 'magic', multiplier: 1 }
    ]
  },
  {
    id: 'ドラゴン_チャンピオン',
    name: 'ドラゴン・チャンピオン',
    level: 4,
    summonNumber: 4,
    monster: {
      name: 'ドラゴン・チャンピオン',
      attack: 40,
      defense: 30,
      hp: 40,
      abilities: [
        {
          type: 'FLYING',
          effect: '飛行'
        }
      ],
    },
    expansionPattern: 7,
    diceFaces: [
      { crestType: 'summon', summonNumber: 4, multiplier: 1 },
      { crestType: 'movement', multiplier: 4 },
      { crestType: 'attack', multiplier: 3 },
      { crestType: 'defense', multiplier: 1 },
      { crestType: 'magic', multiplier: 2 },
      { crestType: 'trap', multiplier: 1 }
    ]
  },
  {
    id: 'マジシャン_オブ_ブラックカオス',
    name: 'マジシャン・オブ・ブラックカオス',
    level: 4,
    summonNumber: 4,
    monster: {
      name: 'マジシャン・オブ・ブラックカオス',
      attack: 40,
      defense: 30,
      hp: 40,

    },
    expansionPattern: 12,
    diceFaces: [
      { crestType: 'summon', summonNumber: 4, multiplier: 1 },
      { crestType: 'movement', multiplier: 1 },
      { crestType: 'attack', multiplier: 2 },
      { crestType: 'defense', multiplier: 1 },
      { crestType: 'magic', multiplier: 1 },
      { crestType: 'trap', multiplier: 1 }
    ]
  },
  {
    id: 'ブラック_デーモンズ_ドラゴン',
    name: 'ブラック・デーモンズ・ドラゴン',
    level: 4,
    summonNumber: 4,
    monster: {
      name: 'ブラック・デーモンズ・ドラゴン',
      attack: 40,
      defense: 40,
      hp: 40,
      abilities: [
        {
          type: 'FLYING',
          effect: '飛行'
        }
      ],
    },
    expansionPattern: 13,
    diceFaces: [
      { crestType: 'summon', summonNumber: 4, multiplier: 1 },
      { crestType: 'movement', multiplier: 3 },
      { crestType: 'attack', multiplier: 1 },
      { crestType: 'attack', multiplier: 1 },
      { crestType: 'defense', multiplier: 3 },
      { crestType: 'magic', multiplier: 1 }
    ]
  },
  {
    id: 'マイティ_メイジ',
    name: 'マイティ・メイジ',
    level: 4,
    summonNumber: 4,
    monster: {
      name: 'マイティ・メイジ',
      attack: 30,
      defense: 20,
      hp: 50,
      abilities: [
        {
          type: 'SPECIAL',
          cost: { /* 魔法クレスト1 */ },
          effect: '魔法クレスト1個で2マス先の敵を攻撃'
        }
      ],
    },
    expansionPattern: 6,
    diceFaces: [
      { crestType: 'summon', summonNumber: 4, multiplier: 1 },
      { crestType: 'movement', multiplier: 2 },
      { crestType: 'movement', multiplier: 4 },
      { crestType: 'attack', multiplier: 1 },
      { crestType: 'magic', multiplier: 1 },
      { crestType: 'trap', multiplier: 1 }
    ]
  },
  {
    id: 'クロコザウルス',
    name: 'クロコザウルス',
    level: 4,
    summonNumber: 4,
    monster: {
      name: 'クロコザウルス',
      attack: 30,
      defense: 20,
      hp: 50,
      abilities: [
        {
          type: 'STAT_UP_ATK',
          cost: { /* 攻撃クレストX */ },
          effect: '攻撃クレストX個で攻撃力10×Xアップ(1ターン3回)'
        }
      ],
    },
    expansionPattern: 7,
    diceFaces: [
      { crestType: 'summon', summonNumber: 4, multiplier: 1 },
      { crestType: 'movement', multiplier: 1 },
      { crestType: 'attack', multiplier: 2 },
      { crestType: 'defense', multiplier: 1 },
      { crestType: 'magic', multiplier: 1 },
      { crestType: 'trap', multiplier: 3 }
    ]
  },
  {
    id: 'blue_eyes_white_dragon',
    name: 'ブルーアイズ・ホワイト・ドラゴン',
    level: 4,
    summonNumber: 4,
    monster: {
      name: 'ブルーアイズ・ホワイト・ドラゴン',
      attack: 40,
      defense: 30,
      hp: 50,
      abilities: [
        {
          type: 'FLYING',
          effect: '飛行'
        }
      ],
    },
    expansionPattern: 12,
    diceFaces: [
      { crestType: 'summon', summonNumber: 4, multiplier: 1 },
      { crestType: 'movement', multiplier: 1 },
      { crestType: 'movement', multiplier: 2 },
      { crestType: 'attack', multiplier: 4 },
      { crestType: 'defense', multiplier: 1 },
      { crestType: 'magic', multiplier: 1 }
    ]
  },
  {
    id: 'ブラック_ルスター_ソルジャー',
    name: 'ブラック・ルスター・ソルジャー',
    level: 4,
    summonNumber: 4,
    monster: {
      name: 'ブラック・ルスター・ソルジャー',
      attack: 40,
      defense: 30,
      hp: 50,

    },
    expansionPattern: 13,
    diceFaces: [
      { crestType: 'summon', summonNumber: 4, multiplier: 1 },
      { crestType: 'movement', multiplier: 2 },
      { crestType: 'attack', multiplier: 1 },
      { crestType: 'defense', multiplier: 1 },
      { crestType: 'magic', multiplier: 1 },
      { crestType: 'trap', multiplier: 2 }
    ]
  },
  {
    id: 'パーフェクト_アルティメット_グレートモス',
    name: 'パーフェクト・アルティメット・グレートモス',
    level: 4,
    summonNumber: 4,
    monster: {
      name: 'パーフェクト・アルティメット・グレートモス',
      attack: 40,
      defense: 40,
      hp: 50,
      abilities: [
        {
          type: 'FLYING',
          effect: '飛行'
        }
      ],
    },
    expansionPattern: 6,
    diceFaces: [
      { crestType: 'summon', summonNumber: 4, multiplier: 1 },
      { crestType: 'movement', multiplier: 4 },
      { crestType: 'attack', multiplier: 2 },
      { crestType: 'defense', multiplier: 1 },
      { crestType: 'trap', multiplier: 1 },
      { crestType: 'trap', multiplier: 2 }
    ]
  },
  {
    id: 'ゲート_ガーディアン',
    name: 'ゲート・ガーディアン',
    level: 4,
    summonNumber: 4,
    monster: {
      name: 'ゲート・ガーディアン',
      attack: 40,
      defense: 40,
      hp: 50,
      abilities: [
        {
          type: 'SPECIAL',
          cost: { /* 罠クレスト3 */ },
          effect: '罠クレスト3個でダメージを仲間に肩代わり'
        }
      ],
    },
    expansionPattern: 7,
    diceFaces: [
      { crestType: 'summon', summonNumber: 4, multiplier: 1 },
      { crestType: 'movement', multiplier: 2 },
      { crestType: 'attack', multiplier: 1 },
      { crestType: 'defense', multiplier: 2 },
      { crestType: 'magic', multiplier: 3 },
      { crestType: 'trap', multiplier: 2 }
    ]
  },
  {
    id: 'ブルーアイズ_アルティメット_ドラゴン',
    name: 'ブルーアイズ・アルティメット・ドラゴン',
    level: 4,
    summonNumber: 4,
    monster: {
      name: 'ブルーアイズ・アルティメット・ドラゴン',
      attack: 50,
      defense: 40,
      hp: 60,
      abilities: [
        {
          type: 'SPECIAL',
          effect: '移動が1マスに制限'
        }
      ],
    },
    expansionPattern: 12,
    diceFaces: [
      { crestType: 'summon', summonNumber: 4, multiplier: 1 },
      { crestType: 'movement', multiplier: 1 },
      { crestType: 'attack', multiplier: 1 },
      { crestType: 'defense', multiplier: 1 },
      { crestType: 'magic', multiplier: 2 },
      { crestType: 'trap', multiplier: 1 }
    ]
  }
];

// カードIDからMonsterCardを取得
export function getMonsterCard(cardId: string): MonsterCard | undefined {
  return MONSTER_CARDS.find(card => card.id === cardId);
}

// レベル別にカードをフィルタ
export function getCardsByLevel(level: 1 | 2 | 3 | 4): MonsterCard[] {
  return MONSTER_CARDS.filter(card => card.level === level);
}

// すべてのカードを取得
export function getAllCards(): MonsterCard[] {
  return [...MONSTER_CARDS];
}

// レベルとIDからランダムにカードを選択
export function getRandomCardByLevel(level: 1 | 2 | 3 | 4): MonsterCard {
  const cards = getCardsByLevel(level);
  const randomIndex = Math.floor(Math.random() * cards.length);
  return cards[randomIndex];
}
