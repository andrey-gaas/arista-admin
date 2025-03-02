import { TUser } from './auth';

export type TMarket = "ozon" | "wb";
export type TOrderStatus = "added" | "works" | "delivered" | "issued" | "rejected" | "all";


export type TOrderAddress = {
  address?: string;
  _id: string;
};

export type TOrder = {
  _id: string;
  address: TOrderAddress;
  date: number;
  id: number;
  img: string;
  market: TMarket;
  status: TOrderStatus;
  user: TUser & {
    phone: string;
    code: string;
  };
  message?: string;
  products: TProduct[];
  price: number;
  profit: number;
  cell: number;
};

export type TProduct = {
  code: string;
  status: 'added' | 'in_transit' | 'delivered';
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
  cell: number;
};
export type TOrderResult = TOrder;

export type TEditOrderQuery = {
  status?: TOrderStatus;
  products?: TProduct[];
  price?: number;
  profit?: number;
  message?: string;
};
export type TEditOrderResult = TOrder;

export type TRemoveOrderQuery = {
  _id: string;
};
export type TRemoveOrderResult = "OK";
