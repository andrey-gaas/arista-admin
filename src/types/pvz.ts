export type TPvzTypes = "arista" | "ozon" | "wb";

export type TAristaPvz = {
  max: string;
  cells: {
    number: number;
    order: string;
  }[];
};

// Для `arista` включаем `ozon` и `wb`
export type TAristaTypePvz = {
  _id: string;
  address: string;
  type: "arista";
  ozon: TAristaPvz;
  wb: TAristaPvz;
};

// Для других типов `ozon` и `wb` отсутствуют
export type TOtherTypePvz = {
  _id: string;
  address: string;
  type: Exclude<TPvzTypes, "arista">; // Исключаем "arista"
};

// Объединяем оба типа
export type TPvz = TAristaTypePvz | TOtherTypePvz;