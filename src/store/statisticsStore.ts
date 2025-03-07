import { makeAutoObservable } from "mobx";
import statisticsApi from '../api/StatisticsApi';
import { TStatisticsOrder, TStatiscticsListQuery } from "../types/statistics";

class StatisticsStore {
  orders: TStatisticsOrder[] | null = null;

  loading = false;
  error = "";

  constructor() {
    makeAutoObservable(this);
  }

  setLoading(value: boolean) {
    this.loading = value;
  };

  setError(error: string) {
    this.error = error;
  };

  setOrders(value: TStatisticsOrder[] | null) {
    this.orders = value;
  }

  async fetchStatistics(query: TStatiscticsListQuery) {
    const token = localStorage.getItem('token');

    if (token) {
      this.setLoading(true);
      this.setError("");

      try {
        const result = await statisticsApi.fetchStatistics(token, query);

        if (result.status === 200) {
          this.setOrders(result.data);
        }
      } catch (error) {
        console.log(error);
        this.setError("Ошибка загрузки статистики");
      } finally {
        this.setLoading(false);
      }
    }
  }
}

const statisticsStore = new StatisticsStore();

export default statisticsStore;
