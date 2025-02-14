import { makeAutoObservable } from "mobx";
import authApi from "../api/AuthApi";
import { TUser } from "../types/auth";

class AuthStore {
  constructor() {
    makeAutoObservable(this);
  }

  user: TUser | null = null;
  loading = false;
  error = "";

  async fetchLogin(email: string, password: string) {
    this.loading = true;
    this.error = "";

    try {
      const result = await authApi.login(email, password);

      if (result.status === 200) {
        this.user = result.data;
        this.loading = false;
      }
    } catch (error) {
      console.error(error);
      this.loading = false;
      this.error = "Ошибка авторизации";
    }
  }
}

const authStore = new AuthStore();

export default authStore;
