import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
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
