import { makeAutoObservable } from "mobx";
import clientsApi from "../api/ClientsApi";
import { TClient, TClientsListQuery } from "../types/clients";

type TClientType = 'list' | 'client';

class ClientsStore {
  clients: TClient[] | null = null;
  client: TClient | null = null;

  loading = {
    list: false,
    client: false,
  };

  errors = {
    list: "",
    client: "",
  };

  timer: NodeJS.Timeout | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setClients(clients: TClient[] | null) {
    this.clients = clients;
  }

  setClient(client: TClient | null) {
    this.client = client;
  }

  setLoading(value: boolean, type: TClientType) {
    this.loading[type] = value;
  }

  setError(error: string, type: TClientType) {
    this.errors[type] = error;
  }

  setTimer(value: NodeJS.Timeout | null) {
    this.timer = value;
  }

  async fetchList(query: TClientsListQuery) {
    const token = localStorage.getItem('token');

    if (token) {
      this.setError("", 'list');
      this.setLoading(true, 'list');
      this.setClients(null);

      if (this.timer) {
        clearTimeout(this.timer);
        this.setTimer(null);
      }

      const timer = setTimeout(async () => {
        try {
          const result = await clientsApi.fetchList(token, query);

          if (result.status === 200) {
            this.setClients(result.data);
          } else {
            this.setError("Ошибка загрузки списка пользователей", 'list');
          }
        } catch (error) {
          console.log(error);
          this.setError("Ошибка загрузки списка пользователей", 'list');
        } finally {
          this.setLoading(false, 'list');
        }
      }, 500);
      this.setTimer(timer);
    }
  }

  async fetchClient(id: string) {
    const token = localStorage.getItem('token');

    if (token) {
      this.setError("", 'client');
      this.setLoading(true, 'client');
      this.setClient(null);

      try {
        const result = await clientsApi.fetchClient(token, { id });

        if (result.status === 200) {
          this.setClient(result.data);
        } else if (result.status === 404) {
          this.setError("Клиент не найден", 'client');
        } else {
          this.setError("Ошибка загрузки пользователя", 'client');
        }
      } catch (error) {
        console.log(error);
        this.setError("Ошибка загрузки пользователя", 'client');
      } finally {
        this.setLoading(false, 'client');
      }
    }
  }
}
const clientsStore = new ClientsStore();

export default clientsStore;
