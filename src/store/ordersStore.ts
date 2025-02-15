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
        const result = await ordersApi.fetchListByStatus(token, { status, skip, limit });

        if (result.status) {
          console.log('result by status', result);
        } else {
          this.setError("Ошибка загрузки списка заказов", 'list');
        }
      } catch(error) {
        console.log(error);
        this.setError("Ошибка загрузки списка заказов", 'list');
      } finally {
        this.setLoading(false, 'list');
      }
    }
  }

  async fetchOrdersByQRCode(code: string, skip?: number, limit?: number) {
    this.setLoading(true, 'list');
    this.setError("", 'list');
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const result = await ordersApi.fetchListByQRCode(token, { code, skip, limit });

        if (result.status === 200) {
          console.log('result by qr-code', result);
        }
        else if (result.status === 404) {
          this.setError("Пользователь не найден", 'list');
        } else {
          this.setError("Ошибка загрузки пользователя", 'list');
        }
      } catch (error) {
        console.log(error);
        this.setError("Ошибка загрузки списка заказов", 'list');
      } finally {
        this.setLoading(false, 'list');
      }
    }
  }

  async fetchOrdersByBarcode(barcode: string, skip?: number, limit?: number) {
    this.setLoading(true, 'list');
    this.setError("", 'list');
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const result = await ordersApi.fetchListByBarcode(token, { barcode, skip, limit });

        if (result.status === 200) {
          console.log('result by barcode', result);
        } else if (result.status === 404) {
          this.setError("Заказ не найден", 'list');
        } else {
          this.setError("Ошибка загрузки списка заказов", 'list');
        }
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
