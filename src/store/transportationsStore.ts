import { makeAutoObservable } from "mobx";
import transportationsApi from "../api/TransportationApi";
import { TTransportation, TTransportationCreateBody, TTransportationsListQuery } from '../types/transportations';

type TTransportationsTypes = "list" | "create";

class TransportationsStore {
  list: TTransportation[] | null = null;

  loading = {
    list: false,
    create: false,
  };

  errors = {
    list: "",
    create: "",
  };

  constructor() {
    makeAutoObservable(this);
  }

  setList(list: TTransportation[] | null) {
    this.list = list;
  }

  setLoading(value: boolean, key: TTransportationsTypes) {
    this.loading[key] = value;
  }

  setError(error: string, key: TTransportationsTypes) {
    this.errors[key] = error;
  }

  async fetchList(query: TTransportationsListQuery) {
    const token = localStorage.getItem('token');

    if (token) {
      this.setLoading(true, 'list');
      this.setError("", 'list');
      this.setList(null);

      try {
        const result = await transportationsApi.fetchList(token, query);

        if (result.status === 200) {
          this.setList(result.data);
        }
      } catch (error) {
        console.log(error);
        this.setError("Ошибка загрузки списка заказов", 'list');
      } finally {
        this.setLoading(false, 'list');
      }
    }
  }

  async fetchCreate(body: TTransportationCreateBody) {
    const token = localStorage.getItem('token');
    if (token) {
      this.setLoading(true, 'create');
      this.setError("", 'create');

      try {
        const result = await transportationsApi.fetchCreate(token, body);

        if (result.status === 201) {
          return true;
        } else {
          this.setError("Ошибка создания перевозки", 'create');
        }
      } catch (error) {
        console.log(error);
        this.setError("Ошибка создания перевозки", 'create');
      } finally {
        this.setLoading(false, 'create');
      }
    }
  }
}

const transporationsStore = new TransportationsStore();

export default transporationsStore;
