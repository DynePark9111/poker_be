import mongoose, { Types, Model } from "mongoose";
import isEmail from "validator/lib/isEmail";
import * as argon2 from "argon2";
import database from "../utils/DI";
const Schema = mongoose.Schema;

export type UserPublic = {
  _id?: Types.ObjectId;
  username: string;
  email: string;
  gem: number;
  cash: number;
};

export interface UserType extends UserPublic {
  password: string;
  joinedAt: Date;
  lastLoggedIn: Date;
}

interface IUserModel extends Model<UserType> {
  login: (email: string, password: string) => Promise<UserType>;
}

const UserSchema = new Schema<UserType>({
  _id: {
    type: Types.ObjectId,
    auto: true,
  },
  username: {
    type: String,
    required: [true, "username is required"],
    minlength: [2, "minimum 2 characters"],
    maxlength: [12, "maximum 12 characters"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    lowercase: true,
    unique: true,
    validate: [isEmail, "enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minlength: [8, "minimum 8 characters"],
    maxlength: [16, "maximum 16 characters"],
  },
  gem: {
    type: Number,
    default: 10000,
  },
  cash: {
    type: Number,
    default: 0,
  },
  joinedAt: { type: Date, immutable: true, default: () => Date.now() },
  lastLoggedIn: { type: Date, default: () => Date.now() },
});

UserSchema.pre("save", async function (next) {
  this.password = await argon2.hash(this.password);
  next();
});

UserSchema.statics.login = async function (email: string, password: string) {
  const user = await database.findUserByEmail(email);
  if (user) {
    return verfiyUser(user.password, password, user);
  }
  throw Error("incorrect email");
};

async function verfiyUser(
  password: string,
  checkPassword: string,
  user: UserPublic
) {
  const auth = await argon2.verify(password, checkPassword);
  if (auth) {
    return user;
  }
  throw Error("incorrect password");
}

const User = mongoose.model<UserType, IUserModel>("user", UserSchema);

export default User;
