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

  setError(value: string) {
    this.error = value;
  }

  async fetchLogin(email: string, password: string) {
    this.loading = true;
    this.error = "";

    try {
      const result = await authApi.login(email, password);

      if (result.status === 200 && result.data) {
        this.user = result.data;
        localStorage.setItem('token', result.data.token);
      }
    } catch (error) {
      console.error(error);
      this.error = "Ошибка авторизации";
    } finally {
      this.loading = false;
    }
  }
}

const authStore = new AuthStore();

export default authStore;
