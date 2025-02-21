export type TUserRole = "admin";

export type TUser = {
  _id: string;
  name: string;
  email: string;
  role: TUserRole;
};

// FetchTypes
export type TLoginResult = TUser & {
  token: string;
};

export type TProfileResult = Omit<TUser, "token">;
