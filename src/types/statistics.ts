import { TMarket, TOrder } from "./orders";

export type TStatisticsOrder = Pick<TOrder, "_id" | "id" | "user" | "address" | "market" | "price" | "profit">;

export type TStatiscticsListQuery = {
  start: number;
  end: number;
  market?: TMarket;
};
export type TStatisticsListResult = TStatisticsOrder[];