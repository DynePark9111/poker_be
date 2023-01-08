export const RANK = {
  "0": "",
  "1": "Royal Flush",
  "2": "Straight Flush",
  "3": "Four Cards",
  "4": "Full House",
  "5": "Flush",
  "6": "Straight",
  "7": "Triple",
  "8": "Two Pair",
  "9": "Jacks or Better",
  "10": "One Pair",
  "11": "High Card",
} as const;

export const PAY_TABLE = {
  "0": 0,
  "1": 250,
  "2": 50,
  "3": 25,
  "4": 9,
  "5": 6,
  "6": 4,
  "7": 3,
  "8": 2,
  "9": 1,
  "10": 0,
  "11": 0,
} as const;

export type RANK_TYPE = keyof typeof RANK;
export type PAY_TABLE_TYPE = keyof typeof PAY_TABLE;
