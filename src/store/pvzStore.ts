import { makeAutoObservable } from "mobx";
import { TPvz } from '../types/pvz';

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
}

const pvzStore = new PVZStore();

export default pvzStore;
