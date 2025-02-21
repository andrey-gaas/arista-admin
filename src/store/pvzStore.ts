import { makeAutoObservable } from "mobx";
import { TPvz } from '../types/pvz';
import pvzApi from '../api/PvzApi';

type TPvzTypes = "list";

class PVZStore {
  list: TPvz[] | null = null;

  loading = {
    list: false,
  };

  errors = {
    list: "",
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
}

const pvzStore = new PVZStore();

export default pvzStore;
