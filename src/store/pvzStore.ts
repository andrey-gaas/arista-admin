import { makeAutoObservable } from "mobx";
import { TPvz, TPvzEditQuery, TPvzCreateBody } from '../types/pvz';
import pvzApi from '../api/PvzApi';

type TPvzTypes = "list" | "pvz" | "edit" | "create";

class PVZStore {
  list: TPvz[] | null = null;
  pvz: TPvz | null = null;

  loading = {
    list: false,
    pvz: false,
    edit: false,
    create: false,
  };

  errors = {
    list: "",
    pvz: "",
    edit: "",
    create: "",
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

  async fetchEditPvz(id: string, body: TPvzEditQuery) {
    const token = localStorage.getItem('token');

    if (token) {
      this.setLoading(true, "edit");
      this.setError("", "edit");

      try {
        const result = await pvzApi.fetchEditPvz(token, id, body);

        if (result.status === 200) {
          this.setPvz(result.data);
          if (this.list) {
            this.setList(this.list?.map(item => item._id === id ? result.data : item));
          }
        } else {
          this.setError("Ошибка редактирования пункта выдачи заказа", 'edit')
        }
      } catch (error) {
        console.log(error);
        this.setError("Ошибка редактирования пункта выдачи заказа", 'edit');
      } finally {
        this.setLoading(false, 'edit');
      }
    }
  }

  async fetchCreatePvz(body: TPvzCreateBody) {
    const token = localStorage.getItem('token');

    if (token) {
      this.setLoading(true, "create");
      this.setError("", "create");

      try {
        const result = await pvzApi.fetchCreatePvz(token, body);

        if (result.status === 201) {
          if (this.list) {
            this.setList([...this.list, result.data]);
          }

          return result.data;
        } else {
          this.setError("Ошибка создания пункта выдачи заказа", 'create')
        }
      } catch (error) {
        console.log(error);
        this.setError("Ошибка создания пункта выдачи заказа", 'create');
      } finally {
        this.setLoading(false, 'create');
      }
    }
  }
}

const pvzStore = new PVZStore();

export default pvzStore;
