import { TUser } from './users';

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
  dateIssued?: number;
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
  pvz?: string;
};
export type TOrderListResult = TOrder[];

export type TOrderListByQRCodeQuery = {
  pvz?: string;
  skip?: number;
  limit?: number;
};
export type TOrderListByQRCodeResult = TOrder[];

export type TOrderListByBarcodeQuery = {
  pvz?: string;
  skip?: number;
  limit?: number;
};
export type TOrderListByBarcodeResult = TOrder[];

export type TOrderListByPhoneQuery = {
  phone: string;
  pvz?: string;
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
