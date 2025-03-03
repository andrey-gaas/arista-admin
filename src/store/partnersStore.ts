import { makeAutoObservable } from "mobx";
import { TPartner, TPartnersListQuery } from "../types/partners";
import partnersApi from "../api/PartnersApi";

type TPartnerType = "list";

class PartnersStore {
  list: null | TPartner[] = null;
  count: null | number = null;

  loading = {
    list: false,
  };

  errors = {
    list: "",
  };

  constructor() {
    makeAutoObservable(this);
  }

  setList(list: TPartner[] | null) {
    this.list = list;
  }

  setLoading(loading: boolean, type: TPartnerType) {
    this.loading[type] = loading;
  }

  setError(error: string, type: TPartnerType) {
    this.errors[type] = error;
  }

  setCount(count: number | null) {
    this.count = count;
  }

  async fetchList(query: TPartnersListQuery) {
    const token = localStorage.getItem('token');

    if (token) {
      this.setLoading(true, 'list');
      this.setError("", 'list');

      try {
        const result = await partnersApi.fetchList(token, query);

        if (result.status === 200) {
          this.setList(result.data.list);
          this.setCount(result.data.count);
        } else {
          this.setError("Ошибка загрузки списка заявок", 'list');
        }
      } catch (error) {
        console.log(error);
        this.setError("Ошибка загрузки списка заявок", 'list');
      } finally {
        this.setLoading(false, 'list');
      }
    }
  }
}

const parnersStore = new PartnersStore();

export default parnersStore;
