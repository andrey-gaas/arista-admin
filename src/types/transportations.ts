export type TTransportationStatus = "active" | "delivered"

export type TTransportation = {
  _id: string;
  status: TTransportationStatus;
  from: string;
  to: string;
  products: string[];
};

// Fetch Types
export type TTransportationsListQuery = {
  status?: TTransportationStatus;
  type?: 'return' | 'delivery';
};
export type TTransportationsListResult = TTransportation[];