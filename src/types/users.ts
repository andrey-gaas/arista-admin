export type TRole = "admin" | "partner" | "manager";

export type TUser = {
  _id: string;
  email: string;
  password: string;
  name: string;
  role: TRole;
  pvz?: string;
  date?: number;
};

// FETCH TYPES
export type TUsersListQuery = {
  role?: TRole;
  name?: string;
  skip: number;
  limit: number;
};
export type TUsersListResult = {
  list: TUser[];
  count: number;
};

export type TUserResult = TUser;

export type TUserEditBody = {
  name?: string;
  email?: string;
  password?: string;
  role?: TRole;
  pvz?: string;
};
export type TUserEditResult = TUser;

export type TUserCreateBody = {
  name: string;
  email: string;
  password: string;
  role: TRole;
  pvz?: string;
};
export type TUserCreateResult = TUser;