import { Request, Response } from "express";
import { changeCards, drawCards, getRanks } from "../services/cards";
import { PAY_TABLE } from "../types/types";

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
    let total = 0;
    for (let i = 0; i < Number(count); i++) {
      let cards = changeCards(myCards, toChange);
      let rank = getRanks(cards);
      total += PAY_TABLE[rank];
      results.push({ cards, rank });
    }
    res.send({ results, total });
  } catch (err) {
    if (err instanceof Error) {
      res.status(409).json({ message: err.message });
    }
  }
};
