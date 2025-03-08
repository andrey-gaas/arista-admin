import { TUser } from "./users";

export type TAuthUser = Omit<TUser, "_id" | "password" | "date">;

// FetchTypes
export type TLoginResult = TUser & {
  token: string;
};

export type TProfileResult = Omit<TUser, "token">;
