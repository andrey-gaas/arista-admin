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