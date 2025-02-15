import { makeAutoObservable } from "mobx";
import ordersApi from "../api/OrdersApi";
import { TOrder, TOrderStatus } from '../types/orders';

type TOrdersType = "list";

class OrdersStore {
  orders: TOrder[] | null = null;

  loading = {
    list: false,
  };

  errors = {
    list: "",
  };

  constructor() {
    makeAutoObservable(this);
  }

  setLoading(value: boolean, key: TOrdersType) {
    this.loading[key] = value;
  }

  setError(error: string, key: TOrdersType) {
    this.errors[key] = error;
  }

  setOrders(orders: TOrder[]) {
    this.orders = orders;
  }

  async fetchOrdersByStatus(status?: TOrderStatus, skip?: number, limit?: number) {
    this.setLoading(true, 'list');
    this.setError("", 'list');
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const result = await ordersApi.fetchListByStatus(token, {
          status,
          skip,
          limit,
        });

        console.log(result);
      } catch(error) {
        console.log(error);
        this.setError("Ошибка загрузки списка заказов", 'list');
      } finally {
        this.setLoading(false, 'list');
      }
    }
  }
}

const ordersStore = new OrdersStore();

export default ordersStore;
