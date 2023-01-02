import { drawCards, getRanks } from "../services/cards";

describe("Services/cards", () => {
  let deck = drawCards();

  describe("draw cards", () => {
    it("cards length is 5", () => {
      expect(deck.length).toBe(5);
    });
  });

  describe("getRanks", () => {
    it("Royal Flush (1)", () => {
      expect(getRanks(["TS", "JS", "QS", "KS", "AS"])).toBe(1);
    });
    it("Straight Flush (2)", () => {
      expect(getRanks(["9S", "TS", "JS", "QS", "KS"])).toBe(2);
    });
    it("Four Cards (3)", () => {
      expect(getRanks(["AS", "AD", "AH", "AC", "2S"])).toBe(3);
    });
    it("Fulll House (4)", () => {
      expect(getRanks(["AS", "AD", "AH", "2C", "2S"])).toBe(4);
    });
    it("Flush (5)", () => {
      expect(getRanks(["AS", "3S", "4S", "5S", "6S"])).toBe(5);
    });
    it("Straight (6)", () => {
      expect(getRanks(["2D", "3S", "4S", "5S", "6S"])).toBe(6);
    });
    it("Three of Kind (7)", () => {
      expect(getRanks(["AS", "AD", "AH", "2S", "3S"])).toBe(7);
    });
    it("Two Pair (8)", () => {
      expect(getRanks(["AS", "AD", "2S", "2D", "3S"])).toBe(8);
    });
    it("Pair (9)", () => {
      expect(getRanks(["AS", "AD", "2S", "3D", "4S"])).toBe(9);
    });
    it("JackOrBetter (10)", () => {
      expect(getRanks(["AS", "3D", "4S", "5D", "6S"])).toBe(10);
    });
    it("High Cards (11)", () => {
      expect(getRanks(["2S", "4D", "5S", "6D", "7S"])).toBe(11);
    });
  });
});
