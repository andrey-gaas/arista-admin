import { makeAutoObservable } from "mobx";
import transportationsApi from "../api/TransportationApi";
import { TTransportation, TTransportationsListQuery } from '../types/transportations';

type TTransportationsTypes = "list";

class TransportationsStore {
  list: TTransportation[] | null = null;

  loading = {
    list: false,
  };

  errors = {
    list: "",
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

        console.log(query);


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
}

const transporationsStore = new TransportationsStore();

export default transporationsStore;
