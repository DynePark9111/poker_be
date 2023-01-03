import { Request, Response } from "express";
import { changeCards, drawCards, getRanks } from "../services/cards";

export const getInitialCards = async (req: Request, res: Response) => {
  try {
    let cards = drawCards();
    let rank = getRanks(cards);
    res.status(200).json({ cards, rank });
  } catch (err) {
    if (err instanceof Error) {
      res.status(409).json({ message: err.message });
    }
  }
};

export const postChangeCards = async (req: Request, res: Response) => {
  try {
    let { myCards, toChange, count = 1 } = req.body;
    let results = [];
    for (let i = 0; i < Number(count); i++) {
      let cards = changeCards(myCards, toChange);
      let rank = getRanks(cards);
      results.push({ cards, rank });
    }
    res.send({ results });
  } catch (err) {
    if (err instanceof Error) {
      res.status(409).json({ message: err.message });
    }
  }
};
