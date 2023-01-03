import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import axios from "axios";
import database from "../utils/DI";
const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;

interface UserAuthInfoRequest extends Request {
  cookies: any;
}

export const requireAuth = (
  req: UserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  let token = req.cookies.jwt;
  // check json web token exists & is verified
  if (token) {
    jwt.verify(
      token,
      `${JWT_TOKEN_SECRET}`,
      (error: unknown, decodedToken: any) => {
        try {
          next();
        } catch (error) {
          res.redirect("/login");
        }
      }
    );
  } else {
    res.redirect("/login");
  }
};

export const getUserCookie = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.jwt;
  let guest = {
    _id: "guest",
    username: "guest",
    email: "guest",
    coins: 100,
  };
  if (token) {
    jwt.verify(
      token,
      `${JWT_TOKEN_SECRET}`,
      async (err: unknown, decodedToken: any) => {
        if (err) {
          res.locals.user = guest;
          next();
        } else {
          let user = await database.findUserById(decodedToken.id);
          res.locals.user = user;
          next();
        }
      }
    );
  } else {
    res.locals.user = guest;
    next();
  }
};

export const reCaptcha = async (
  req: UserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const secret = process.env.RECAPTCHA_SECRET_SERVER;
  const token = req.body.gRecaptchaToken;
  const VERIFY_URL = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`;
  if (token) {
    const result = await axios.post(VERIFY_URL, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    if (result?.data.score > 0.5) {
      console.log("next");
      next();
    } else {
      console.log("fail");
      res.status(200).json({
        status: "failure",
        message: "Google ReCaptcha Failure",
      });
    }
  }
};
