import { TMarket, TOrder } from "./orders";

export type TStatisticsOrder = Pick<TOrder, "_id" | "id" | "address" | "market" | "price" | "profit" | "dateIssued">;

export type TStatiscticsListQuery = {
  start: number;
  end: number;
  market?: TMarket;
};
export type TStatisticsListResult = TStatisticsOrder[];