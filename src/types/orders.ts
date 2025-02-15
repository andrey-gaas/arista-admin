import { TUser } from './auth';

export type TMarket = "ozon" | "wb";
export type TOrderStatus = "added" | "works" | "delivered" | "issued" | "rejected" | "all";

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
export type TOrderListByStatusQuery = {
  status?: TOrderStatus;
  skip?: number;
  limit?: number;
};
export type TOrderListResult = TOrder[];

export type TOrderListByQRCodeQuery = {
  code: string;
  skip?: number;
  limit?: number;
};
export type TOrderListByQRCodeResult = TOrder[];

export type TOrderListByBarcodeQuery = {
  barcode: string;
  skip?: number;
  limit?: number;
};
export type TOrderListByBarcodeResult = TOrder[];