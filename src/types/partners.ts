export type TPartner = {
  _id: string;
  name: string;
  city: string;
  phone: string;
  car: boolean;
  premises: boolean;
  id: number;
};

// FETCH TYPE
export type TPartnersListQuery = {
  skip: number;
  limit: number;
};
export type TPartnersListResult = {
  list: TPartner[];
  count: number;
};

export type TPartnerResult = TPartner;