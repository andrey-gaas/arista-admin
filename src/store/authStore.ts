import { makeAutoObservable } from "mobx";
import authApi from "../api/AuthApi";
import { TAuthUser } from "../types/auth";

type TKeys = "login" | "profile";

class AuthStore {
  constructor() {
    makeAutoObservable(this);
  }

  user: TAuthUser | null = null;

  loading = {
    login: false,
    profile: false,
  };

  errors = {
    login: "",
    profile: "",
  };

  setLoading(value: boolean, key: TKeys) {
    this.loading[key] = value;
  }

  setError(value: string, key: TKeys) {
    this.errors[key] = value;
  }

  setUser(user: TAuthUser | null) {
    this.user = user;
  }

  async fetchLogin(email: string, password: string) {
    this.setLoading(true, 'login');
    this.setError("", 'login');
    this.setUser(null);

    try {
      const result = await authApi.login(email, password);

      if (result.status === 200 && result.data) {
        const user: TAuthUser = {
          name: result.data.name,
          email: result.data.email,
          role: result.data.role,
          pvz: result.data.pvz,
        };
        this.setUser(user);
        localStorage.setItem('token', result.data.token);
      }
    } catch (error) {
      console.error(error);
      this.setError("Ошибка авторизации", 'login');
    } finally {
      this.setLoading(false, 'login');
    }
  }

  async fetchProfile() {
    const token = localStorage.getItem('token');

    if (token && !this.user) {
      this.setLoading(true, "profile");
      this.setError("", 'profile');
      this.setUser(null);

      try {
        const result = await authApi.fetchProfile(token);

        if (result.status === 200 && result.data) {
          this.setUser(result.data);
        }

      } catch (error) {
        console.log(error);
        this.setError("Ошибка загрузки профиля", 'profile');
        localStorage.removeItem('token');
      } finally {
        this.setLoading(false, 'profile');
      }
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.setUser(null);
  }
}

const authStore = new AuthStore();

export default authStore;
