import { TUser } from './auth';

export type TMarket = "ozon" | "wb";
export type TOrderStatus = "added" | "works" | "delivered" | "issued" | "rejected" | "all";


export type TOrderAddress = {
  address: string;
  _id: string;
};

export type TOrder = {
  _id: string;
  address: string;
  date: number;
  id: number;
  img: string;
  market: TMarket;
  status: TOrderStatus;
  user: TUser & {
    phone: string;
    code: string;
  };
};

export type TOrderFullData = TOrder & {
  address: TOrderAddress;
};

export type TProduct = {
  code: string;
  title: string;
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

export type TOrderListByPhoneQuery = {
  phone: string;
  skip?: number;
  limit?: number;
};
export type TOrderListByPhoneResult = TOrder[];

export type TOrderQuery = {
  _id: string;
};
export type TOrderResult = TOrderFullData;

export type TEditOrderQuery = {
  status?: TOrderStatus;
};
export type TEditOrderResult = "OK";

export type TRemoveOrderQuery = {
  _id: string;
};
export type TRemoveOrderResult = "OK";