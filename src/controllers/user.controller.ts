import { Request, Response } from "express";
import User from "../models/user.model";

const options = { new: true };

export const patchUserGem = async (req: Request, res: Response) => {
  try {
    let { gem, _id } = res.locals.user;
    let reqGem = req.body.gem;
    let nowGem = gem + reqGem;
    const data = await User.findByIdAndUpdate(_id, { gem: nowGem }, options);
    res.status(201).json({ gem: data!.gem });
  } catch (err) {
    if (res.locals.user === null) {
      res.status(401).json({ error: "no user" });
    } else {
      res.status(400).json(err);
    }
  }
};

export const patchUserCash = async (req: Request, res: Response) => {
  try {
    let { cash, _id } = res.locals.user;
    let reqCash: number = req.body.cash;
    let nowCash = cash + reqCash;
    const data = await User.findByIdAndUpdate(_id, { cash: nowCash }, options);
    res.status(201).json({ cash: data!.cash });
  } catch (err) {
    if (res.locals.user === null) {
      res.status(401).json({ error: "no user" });
    } else {
      res.status(400).json(err);
    }
  }
};
