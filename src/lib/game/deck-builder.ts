import { getAllCards, getCardsByLevel } from './monster-cards';

// デフォルトデッキを生成（初心者用）
export function createDefaultDeck(): string[] {
  const deck: string[] = [];

  // レベル1: 8個
  const level1Cards = getCardsByLevel(1);
  for (let i = 0; i < 8 && i < level1Cards.length; i++) {
    deck.push(level1Cards[i].id);
  }

  // レベル2: 4個
  const level2Cards = getCardsByLevel(2);
  for (let i = 0; i < 4 && i < level2Cards.length; i++) {
    deck.push(level2Cards[i].id);
  }

  // レベル3: 2個
  const level3Cards = getCardsByLevel(3);
  for (let i = 0; i < 2 && i < level3Cards.length; i++) {
    deck.push(level3Cards[i].id);
  }

  // レベル4: 1個
  const level4Cards = getCardsByLevel(4);
  if (level4Cards.length > 0) {
    deck.push(level4Cards[0].id);
  }

  return deck;
}

// ランダムデッキを生成
export function createRandomDeck(): string[] {
  const deck: string[] = [];
  const allCards = getAllCards();

  // ランダムに15個選択（重複あり）
  for (let i = 0; i < 15; i++) {
    const randomIndex = Math.floor(Math.random() * allCards.length);
    deck.push(allCards[randomIndex].id);
  }

  return deck;
}

// デッキの検証（15個のカードIDが必要）
export function validateDeck(deck: string[]): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (deck.length !== 15) {
    errors.push(`デッキは15個のカードが必要です（現在: ${deck.length}個）`);
  }

  // 各カードIDが存在するか確認
  const allCards = getAllCards();
  const validCardIds = new Set(allCards.map(card => card.id));

  deck.forEach((cardId, index) => {
    if (!validCardIds.has(cardId)) {
      errors.push(`カード ${index + 1}: '${cardId}' は存在しません`);
    }
  });

  return {
    valid: errors.length === 0,
    errors
  };
}

// デッキのサマリーを取得
export function getDeckSummary(deck: string[]): {
  total: number;
  byLevel: Record<number, number>;
} {
  const summary = {
    total: deck.length,
    byLevel: { 1: 0, 2: 0, 3: 0, 4: 0 }
  };

  const allCards = getAllCards();
  const cardMap = new Map(allCards.map(card => [card.id, card]));

  deck.forEach(cardId => {
    const card = cardMap.get(cardId);
    if (card) {
      summary.byLevel[card.level]++;
    }
  });

  return summary;
}
