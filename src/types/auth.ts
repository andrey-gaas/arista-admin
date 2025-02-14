export type TUserRole = "admin";

export type TUser = {
  name: string;
  email: string;
  role: TUserRole;
  token: string;
};

// FetchTypes
export type TLoginResult = TUser;
