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
