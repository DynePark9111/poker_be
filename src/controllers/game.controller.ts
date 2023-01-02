import { Request, Response } from "express";
import { changeCards, drawCards, getRanks } from "../services/cards";

const getInitialCards = async (req: Request, res: Response) => {
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

const postChangeCards = async (req: Request, res: Response) => {
  try {
    let { myCards, toChange } = req.body;
    let cards = changeCards(myCards, toChange);
    let result = getRanks(cards);

    res.send({ cards, result });
  } catch (err) {
    if (err instanceof Error) {
      res.status(409).json({ message: err.message });
    }
  }
};

module.exports = {
  getInitialCards,
  postChangeCards,
};
