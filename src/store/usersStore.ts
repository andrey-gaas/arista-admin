import { makeAutoObservable } from "mobx";
import { TUser, TUsersListQuery } from "../types/users";
import usersApi from "../api/UsersApi";

type TUsersType = "list";

class UsersStore {
  list: TUser[] | null = null;

  count: number | null = null;

  loading = {
    list: false,
  }

  errors = {
    list: "",
  }

  constructor() {
    makeAutoObservable(this);
  }

  setList(users: TUser[] | null) {
    this.list = users;
  }

  setCount(count: number | null) {
    this.count = count;
  }

  setLoading(value: boolean, type: TUsersType) {
    this.loading[type] = value;
  }

  setErrors(value: string, type: TUsersType) {
    this.errors[type] = value;
  }

  async fetchList(query: TUsersListQuery) {
    const token = localStorage.getItem('token');
    if (token) {
      this.setLoading(true, "list");
      this.setErrors("", "list");
      this.setList(null);
      this.setCount(null);

      try {
        const result = await usersApi.fetchList(token, query);

        if (result.status === 200) {
          this.setList(result.data.list);
          this.setCount(result.data.count);
        } else {
          this.setErrors("Ошибка загрузки списка пользователей", "list");
        }
      } catch (error) {
        console.log(error);
        this.setErrors("Ошибка загрузки списка пользователей", "list");
      } finally {
        this.setLoading(false, 'list');
      }
    }
  }
}

const usersStore = new UsersStore();

export default usersStore;