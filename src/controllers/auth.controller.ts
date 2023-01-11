import User from "../models/user.model";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import database from "../utils/DI";
import { Error } from "mongoose";
import { MongoError } from "mongodb";

require("dotenv").config();

const dayInSec = 24 * 60 * 60;
const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;

const createToken = (id: string) => {
  return jwt.sign({ id }, `${JWT_TOKEN_SECRET}`, { expiresIn: dayInSec });
};

export const createUser = async (req: Request, res: Response) => {
  const { username, email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Passwords do not match!",
    });
  }
  try {
    const user = await database.postUser(username, email, password);
    if (user._id) {
      const token = createToken(user._id.toString());
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: dayInSec * 1000,
      });
      let { _id, username, email, gem, cash } = user;
      return res.status(201).json({ _id, username, email, gem, cash });
    }
  } catch (error) {
    if ((error as MongoError).code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already exists!",
      });
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return res.status(400).json({ error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id!.toString());
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: dayInSec * 1000,
    });
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      gem: user.gem,
      cash: user.cash,
    });
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return res.status(400).json({ error: error.message });
  }
};

export const logoutUser = (req: Request, res: Response) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.send("logout");
};

export const checkUser = (req: Request, res: Response) => {
  try {
    const { _id, username, email, gem, cash } = res.locals.user;
    res.status(200).json({ _id, username, email, gem, cash });
  } catch (err) {
    res.status(400).json(err);
  }
};

const secureUser = (req: Request, res: Response) => {
  res.send("secure user");
};
