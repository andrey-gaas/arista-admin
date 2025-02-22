export type TPvzTypes = "arista" | "ozon" | "wb";

export type TAristaPvz = {
  max: string;
  cells: {
    number: number;
    order: string;
  }[];
};

export type TAristaTypePvz = {
  _id: string;
  address: string;
  type: "arista";
  ozon: TAristaPvz;
  wb: TAristaPvz;
};

export type TOtherTypePvz = {
  _id: string;
  address: string;
  type: Exclude<TPvzTypes, "arista">;
};

export type TPvz = TAristaTypePvz | TOtherTypePvz;

// Fetch Types
export type TPvzListQuery = {
  address?: string;
};
export type TPvzListResult = TPvz[];

export type TPvzResult = TPvz;
