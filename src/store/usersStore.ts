import { makeAutoObservable } from "mobx";
import { TUser, TUserEditBody, TUsersListQuery } from "../types/users";
import usersApi from "../api/UsersApi";

type TUsersType = "list" | "user" | "edit";

class UsersStore {
  list: TUser[] | null = null;
  count: number | null = null;
  user: TUser | null = null;

  loading = {
    list: false,
    user: false,
    edit: false,
  }

  errors = {
    list: "",
    user: "",
    edit: "",
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

  setUser(user: TUser | null) {
    this.user = user;
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

  async fetchUser(id: string) {
    const token = localStorage.getItem('token');
    if (token) {
      this.setLoading(true, "user");
      this.setErrors("", "user");
      this.setUser(null);

      try {
        const result = await usersApi.fetchUser(token, id);

        if (result.status === 200) {
          this.setUser(result.data);
        } else {
          this.setErrors("Ошибка загрузки пользователя", "user");
        }
      } catch (error) {
        console.log(error);
        this.setErrors("Ошибка загрузки пользователя", 'user');
      }
      finally {
        this.setLoading(false, 'user');
      }
    }
  }

  async fetchEditUser(_id: string, body: TUserEditBody) {
    const token = localStorage.getItem('token');
    if (token) {
      this.setLoading(true, "edit");
      this.setErrors("", "edit");

      try {
        const result = await usersApi.fetchEditUser(token, _id, body);

        if (result.status === 200) {
          this.setUser(result.data);
        } else if (result.status === 404) {
          this.setErrors("Пользователь не найден", "edit");
        } else {
          this.setErrors("Ошибка редактирования пользователя", "edit");
        }
      }
      catch (error) {
        console.log(error);
        this.setErrors("Ошибка редактирования пользователя", 'edit');
      } finally {
        this.setLoading(false, 'edit');
      }
    }
  }
}

const usersStore = new UsersStore();

export default usersStore;