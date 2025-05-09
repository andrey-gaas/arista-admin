export type TClient = {
  _id: string;
  name: string;
  phone: string;
  code: string;
  password: string;
  date: number;
  isBlocked?: boolean;
};

// Fetch Types
export type TClientsListQuery = {
  name?: string;
  code?: string;
  phone?: string;
};
export type TClientsListResult = TClient[];

export type TClientQuery = {
  id: string;
};
export type TClientResult = TClient;

export type TClientEditBody = {
  isBlocked: boolean,
};
export type TClientEditResult = TClient;