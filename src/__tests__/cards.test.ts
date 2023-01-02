import { drawCards, getRanks } from "../services/cards";

describe("Services/cards", () => {
  let cards = drawCards();

  describe("draw cards", () => {
    it("cards length is 5", () => {
      expect(cards.length).toBe(5);
    });
    it("contains SDHC as suites", () => {
      const suits = cards.map((a) => a[1]).toString();
      const checkSuits = /[SDHC]/.test(suits);
      expect(checkSuits).toBe(true);
    });
    it("contains 1~13 numbers", () => {
      const numbers = cards.map((a) => a[0]).toString();
      const checkNumbers = /[23456789TJQKA]/.test(numbers);
      expect(checkNumbers).toBe(true);
    });
  });

  describe("getRanks", () => {
    it("Royal Flush (1)", () => {
      expect(getRanks(["TS", "JS", "QS", "KS", "AS"])).toBe(1);
      expect(getRanks(["TD", "JD", "QD", "KD", "AD"])).toBe(1);
      expect(getRanks(["TH", "JH", "QH", "KH", "AH"])).toBe(1);
      expect(getRanks(["TC", "JC", "QC", "KC", "AC"])).toBe(1);
    });
    it("Straight Flush (2)", () => {
      expect(getRanks(["AS", "2S", "3S", "4S", "5S"])).toBe(2);
      expect(getRanks(["2S", "3S", "4S", "5S", "6S"])).toBe(2);
      expect(getRanks(["9S", "TS", "JS", "QS", "KS"])).toBe(2);
    });
    it("Four Cards (3)", () => {
      expect(getRanks(["AS", "AD", "AH", "AC", "2S"])).toBe(3);
      expect(getRanks(["2S", "2D", "2H", "KC", "2C"])).toBe(3);
      expect(getRanks(["KS", "2D", "KH", "KC", "KD"])).toBe(3);
    });
    it("Fulll House (4)", () => {
      expect(getRanks(["AS", "AD", "AH", "2C", "2S"])).toBe(4);
      expect(getRanks(["4S", "4D", "3H", "4C", "3S"])).toBe(4);
      expect(getRanks(["5S", "KD", "KH", "5C", "KS"])).toBe(4);
    });
    it("Flush (5)", () => {
      expect(getRanks(["AS", "3S", "4S", "5S", "6S"])).toBe(5);
      expect(getRanks(["9S", "8S", "7S", "6S", "4S"])).toBe(5);
      expect(getRanks(["AC", "3C", "4C", "5C", "6C"])).toBe(5);
    });
    it("Straight (6)", () => {
      expect(getRanks(["2D", "3S", "4S", "5S", "6S"])).toBe(6);
      expect(getRanks(["AD", "2D", "3S", "4S", "5S"])).toBe(6);
      expect(getRanks(["TD", "QS", "JS", "AS", "KS"])).toBe(6);
    });
    it("Three of Kind (7)", () => {
      expect(getRanks(["AS", "AD", "AH", "2S", "3S"])).toBe(7);
      expect(getRanks(["AS", "AD", "AH", "2S", "3S"])).toBe(7);
      expect(getRanks(["AS", "AD", "AH", "2S", "3S"])).toBe(7);
    });
    it("Two Pair (8)", () => {
      expect(getRanks(["AS", "AD", "2S", "2D", "3S"])).toBe(8);
      expect(getRanks(["AS", "4D", "4S", "9D", "9S"])).toBe(8);
      expect(getRanks(["AS", "AD", "2S", "JD", "JS"])).toBe(8);
    });
    it("JacksOrBetter(9)", () => {
      expect(getRanks(["JS", "JD", "2S", "3D", "4S"])).toBe(9);
      expect(getRanks(["AS", "AD", "2S", "3D", "4S"])).toBe(9);
      expect(getRanks(["JS", "TD", "QS", "QD", "4S"])).toBe(9);
    });
    it("Pair (10)", () => {
      expect(getRanks(["TS", "TD", "4S", "5D", "6S"])).toBe(10);
      expect(getRanks(["TS", "AD", "TS", "5D", "6S"])).toBe(10);
      expect(getRanks(["TS", "2D", "4S", "5D", "2S"])).toBe(10);
    });
    it("High Cards (11)", () => {
      expect(getRanks(["2S", "4D", "5S", "6D", "7S"])).toBe(11);
      expect(getRanks(["JS", "4D", "5S", "6D", "7S"])).toBe(11);
      expect(getRanks(["AS", "4D", "5S", "6D", "7S"])).toBe(11);
    });
  });
});
