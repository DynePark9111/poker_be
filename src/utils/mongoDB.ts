import mongoose from "mongoose";
import dotenv from "dotenv";
import User, { UserType } from "../models/user.model";
import { database } from "./DI";

export type findUser = UserType | null;

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;

async function connect() {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(`${MONGODB_URI}`, { dbName: `poker` });
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Could not connect to db");
    process.exit(1);
  }
}

async function findUserById(id: string) {
  let user: findUser = await User.findById(id);
  return user ? user : null;
}

async function findUserByEmail(email: string) {
  let user: findUser = await User.findOne({ email });
  return user ? user : null;
}

async function postUser(username: string, email: string, password: string) {
  const user: UserType = await User.create({ username, email, password });
  return user;
}

const mongoDB: database = {
  connect,
  findUserById,
  findUserByEmail,
  postUser,
};

export default mongoDB;
