import { TPvz } from './pvz';

export type TTransportationStatus = "active" | "delivered";

export type TTransportation = {
  _id: string;
  status: TTransportationStatus;
  from: "Fulfillment center" | TPvz;
  to: "Fulfillment center" | TPvz;
  products: string[];
};

// Fetch Types
export type TTransportationsListQuery = {
  status?: TTransportationStatus;
  type?: 'return' | 'delivery';
};
export type TTransportationsListResult = TTransportation[];