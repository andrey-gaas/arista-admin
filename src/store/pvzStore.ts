import { makeAutoObservable } from "mobx";
import { TPvz } from '../types/pvz';
import pvzApi from '../api/PvzApi';

type TPvzTypes = "list" | "pvz";

class PVZStore {
  list: TPvz[] | null = null;
  pvz: TPvz | null = null;

  loading = {
    list: false,
    pvz: false,
  };

  errors = {
    list: "",
    pvz: "",
  };

  constructor() {
    makeAutoObservable(this);
  }

  setLoading(value: boolean, key: TPvzTypes) {
    this.loading[key] = value;
  }

  setError(error: string, key: TPvzTypes) {
    this.errors[key] = error;
  }

  setList(list: TPvz[] | null) {
    this.list = list;
  }

  setPvz(pvz: TPvz | null) {
    this.pvz = pvz;
  }

  async fetchList(search: string) {
    const token = localStorage.getItem('token');

    if (token) {
      this.setLoading(true, "list");
      this.setError("", "list");
      this.setList(null);

      try {
        const result = await pvzApi.fetchList(token, { address: search });

        if (result.status === 200) {
          this.setList(result.data);
        } else {
          this.setError("Ошибка загрузки списка пунктов выдачи заказов", 'list')
        }
      } catch (error) {
        console.log(error);
        this.setError("Ошибка загрузки списка пунктов выдачи заказов", 'list')
      } finally {
        this.setLoading(false, 'list');
      }
    }
  }

  async fetchPvz(id: string) {
    const token = localStorage.getItem('token');

    if (token) {
      this.setLoading(true, "pvz");
      this.setError("", "pvz");
      this.setPvz(null);

      try {
        const result = await pvzApi.fetchPvz(token, id);

        if (result.status === 200) {
          this.setPvz(result.data);
        } else {
          this.setError("Ошибка загрузки пункта выдачи заказа", 'pvz')
        }
      } catch (error) {
        console.log(error);
        this.setError("Ошибка загрузки пункта выдачи заказа", 'pvz');
      } finally {
        this.setLoading(false, 'pvz');
      }
    }
  }
}

const pvzStore = new PVZStore();

export default pvzStore;
