import { UserPublic } from "../models/user.model";
import mongoDB, { findUser } from "./mongoDB";

export type database = {
  connect: () => Promise<void>;
  findUserById: (id: string) => Promise<findUser>;
  findUserByEmail: (email: string) => Promise<findUser>;
  postUser: (
    username: string,
    email: string,
    password: string
  ) => Promise<UserPublic>;
};

const database: database = mongoDB;

export default database;
