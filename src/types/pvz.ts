import { TMarket } from './orders';

export type TMarketplace = {
  max: number;
  cells: {
    number: number;
    order: string;
  }[];
};

export type TPvz = {
  _id: string;
  address: string;
  ozon: TMarketplace;
  wb: TMarketplace;
};

// Fetch Types
export type TPvzListQuery = {
  address?: string;
};
export type TPvzListResult = TPvz[];

export type TPvzResult = TPvz;

export type TPvzEditQuery = {
  address?: string;
  ozon?: number;
  wb?: number;
};
export type TPvzEditResult = TPvz;

export type TPvzCreateBody = {
  address: string;
  ozon: number;
  wb: number;
};
export type TPvzCreateResult = TPvz;

export type TPvzRemoveResult = "OK";

export type TPvzSetCellBody = {
  order: string;
  type: TMarket;
};
export type TPvzSetCellResult = {
  cellNumber: number;
};

export type TPvzRemoveCellQuery = {
  order: string;
  type: TMarket;
};
export type TPvzRemoveCellResult = "OK";