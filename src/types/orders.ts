import { TUser } from './auth';

export type TMarket = "ozon" | "wb";
export type TOrderStatus = "added" | "works" | "delivered" | "issued" | "rejected";

export type TOrder = {
  address: string;
  date: number;
  id: number;
  img: string;
  market: TMarket;
  status: TOrderStatus;
  user: TUser;
};

// Fetch Types
export type TOrderListQuery = {
  status?: TOrderStatus;
  user?: string; // user._id
  phone?: number;
  skip?: number;
  limit?: number;
};
export type TOrderListResult = TOrder[];