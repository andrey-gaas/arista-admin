import { TPvz } from './pvz';
import { TUser } from './users';

export type TTransportationStatus = "active" | "delivered";

export type TTransportation = {
  _id: string;
  status: TTransportationStatus;
  from: "Fulfillment center" | TPvz;
  to: "Fulfillment center" | TPvz;
  products: string[];
  createdAt: Date;
  creator: TUser;
  completed?: TUser;
  finishedAt?: Date;
};

// Fetch Types
export type TTransportationsListQuery = {
  status?: TTransportationStatus;
  type?: 'return' | 'delivery';
};
export type TTransportationsListResult = TTransportation[];

export type TTransportationCreateBody = {
  from: string;
  to: string;
  products: string[];
};
export type TTransportationCreateResult = "OK";

export type TTransportationFinishBody = string[];
export type TTransportationFinishResult = "OK";