import { RANK_TYPE } from "../types/types";

type cards = string[];

export function getRanks(cards: cards) {
  const faces = cards
    .map((a) => String.fromCharCode(77 - ORDER.indexOf(a[0])))
    .sort();
  const suits = cards.map((a) => a[1]).sort();
  const values = cards.map((a) => a[0]).sort();
  const counts = faces.reduce(count, {});
  const duplicates: any = Object.values(counts).reduce(count, {});
  const flush = suits[0] === suits[4];
  const first = faces[0].charCodeAt(0);
  const lowStraight = values.join("") === "2345A";
  const straight =
    lowStraight || faces.every((f, index) => f.charCodeAt(0) - first === index);
  const jacksOrBetter = /JJ|QQ|KK|AA/.test(values.join("").toString());
  const tenOrBetter = values.join("") === "AJKQT";

  let rank: RANK_TYPE =
    (flush && straight && tenOrBetter && 1) ||
    (flush && straight && 2) ||
    (duplicates[4] && 3) ||
    (duplicates[3] && duplicates[2] && 4) ||
    (flush && 5) ||
    (straight && 6) ||
    (duplicates[3] && 7) ||
    (duplicates[2] > 1 && 8) ||
    (duplicates[2] && jacksOrBetter && 9) ||
    // (duplicates[2] && 10) ||
    10;
  return rank;

  function count(c: any, a: any) {
    c[a] = (c[a] || 0) + 1;
    return c;
  }
}

// utils.js
// Fisher–Yates shuffle
function shuffle(cards: cards) {
  let currentIndex = cards.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [cards[currentIndex], cards[randomIndex]] = [
      cards[randomIndex],
      cards[currentIndex],
    ];
  }
  return cards;
}

export function drawCards() {
  return shuffle(DECK).slice(0, 5);
}

export function changeCards(fiveCards: cards, cardsToChange: cards) {
  if (cardsToChange.length === 0) {
    return fiveCards;
  }
  let shuffled = shuffle(DECK);
  let set = new Set(shuffled);
  const updatedSet = new Set([...set].filter((x) => !fiveCards.includes(x)));

  let result: string[] = [];
  fiveCards.forEach((card, i) => {
    cardsToChange.includes(card)
      ? result.push([...updatedSet][i])
      : result.push(card);
  });
  return result;
}

const ORDER = "23456789TJQKA";
const DECK = [
  "2S",
  "3S",
  "4S",
  "5S",
  "6S",
  "7S",
  "8S",
  "9S",
  "TS",
  "JS",
  "QS",
  "KS",
  "AS",
  "2D",
  "3D",
  "4D",
  "5D",
  "6D",
  "7D",
  "8D",
  "9D",
  "TD",
  "JD",
  "QD",
  "KD",
  "AD",
  "2H",
  "3H",
  "4H",
  "5H",
  "6H",
  "7H",
  "8H",
  "9H",
  "TH",
  "JH",
  "QH",
  "KH",
  "AH",
  "2C",
  "3C",
  "4C",
  "5C",
  "6C",
  "7C",
  "8C",
  "9C",
  "TC",
  "JC",
  "QC",
  "KC",
  "AC",
];

function arraySubtract(original: string[], subtract: string[]) {
  const result = [];
  for (const element of original) {
    if (!subtract.includes(element)) {
      result.push(element);
    }
  }
  return result;
}
