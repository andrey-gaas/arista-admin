import { makeAutoObservable } from "mobx";
import ordersApi from "../api/OrdersApi";
import { TOrder, TOrderStatus, TEditOrderQuery } from '../types/orders';

type TOrdersType = "list" | "order" | "status" | "remove" | "message" | "edit";

class OrdersStore {
  orders: TOrder[] | null = null;
  timer: NodeJS.Timeout | null = null;
  order: TOrder | null = null;

  loading = {
    list: false,
    order: false,
    status: false,
    message: false,
    remove: false,
    edit: false,
  };

  errors = {
    list: "",
    order: "",
    status: "",
    message: "",
    remove: "",
    edit: "",
  };

  constructor() {
    makeAutoObservable(this);
  }

  setOrder(order: TOrder | null) {
    this.order = order;
  }

  setLoading(value: boolean, key: TOrdersType) {
    this.loading[key] = value;
  }

  setError(error: string, key: TOrdersType) {
    this.errors[key] = error;
  }

  setOrders(orders: TOrder[] | null) {
    this.orders = orders;
  }

  setTimer(value: NodeJS.Timeout | null) {
    this.timer = value;
  }

  async fetchOrdersByStatus(status?: TOrderStatus, skip?: number, limit?: number) {
    this.setLoading(true, 'list');
    this.setError("", 'list');
    this.setOrders(null);
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const result = await ordersApi.fetchListByStatus(token, { status, skip, limit });

        if (result.status === 200) {
          this.setOrders(result.data);
        } else {
          this.setError("Ошибка загрузки списка заказов", 'list');
        }
      } catch (error) {
        console.log(error);
        this.setError("Ошибка загрузки списка заказов", 'list');
      } finally {
        this.setLoading(false, 'list');
      }
    }
  }

  async fetchOrdersByQRCode(code: string, skip?: number, limit?: number) {
    this.setError("", 'list');
    this.setOrders(null);

    if (!code) {
      return this.setError("Просканируйте QR-код", 'list');
    }

    this.setLoading(true, 'list');
    const token = localStorage.getItem('token');

    if (this.timer) {
      clearTimeout(this.timer);
      this.setTimer(null);
    }

    if (token) {
      const timer = setTimeout(async () => {
        try {
          const result = await ordersApi.fetchListByQRCode(token, { code, skip, limit });

          if (result.status === 200) {
            if (result.data.length === 0) {
              this.setError("Заказов, готовых к выдаче, не найдено", 'list');
            } else {
              this.setOrders(result.data);
            }
          }
          else if (result.status === 404) {
            this.setError("Заказов, готовых к выдаче, не найдено", 'list');
          } else {
            this.setError("Ошибка загрузки пользователя", 'list');
          }
        } catch (error) {
          console.log(error);
          this.setError("Ошибка загрузки списка заказов", 'list');
        } finally {
          this.setLoading(false, 'list');
        }
      }, 500);
      this.setTimer(timer);
    }
  }

  async fetchOrdersByBarcode(barcode: string, skip?: number, limit?: number) {
    this.setError("", 'list');
    this.setOrders(null);

    if (!barcode) {
      return this.setError("Просканируйте товар", 'list');
    }

    this.setLoading(true, 'list');
    const token = localStorage.getItem('token');

    if (this.timer) {
      clearTimeout(this.timer);
      this.setTimer(null);
    }

    if (token) {
      const timer = setTimeout(async () => {
        try {
          const result = await ordersApi.fetchListByBarcode(token, { barcode, skip, limit });

          if (result.status === 200) {
            this.setOrders(result.data);
          } else if (result.status === 404) {
            this.setError("Заказ не найден", 'list');
          } else {
            this.setError("Ошибка загрузки списка заказов", 'list');
          }
        } catch (error) {
          console.log(error);
          this.setError("Ошибка загрузки списка заказов", 'list');
        } finally {
          this.setLoading(false, 'list');
        }
      }, 500);
      this.setTimer(timer);
    }
  }

  async fetchOrdersByPhone(phone: string, skip?: number, limit?: number) {
    this.setError("", 'list');
    this.setOrders(null);

    if (!phone) {
      return this.setError("Введите номер телефона", 'list');
    }

    this.setLoading(true, 'list');
    const token = localStorage.getItem('token');

    if (this.timer) {
      clearTimeout(this.timer);
      this.setTimer(null);
    }

    if (token) {
      const timer = setTimeout(async () => {
        try {
          const result = await ordersApi.fetchListByPhone(token, { phone, skip, limit });

          if (result.status === 200) {
            if (result.data.length === 0) {
              this.setError("Заказы не найдены", 'list');
            } else {
              this.setOrders(result.data);
            }
          } else {
            this.setError("Ошибка загрузки списка заказов", 'list');
          }
        } catch (error) {
          console.log(error);
          this.setError("Ошибка загрузки списка заказов", 'list');
        } finally {
          this.setLoading(false, 'list');
        }
      }, 500);
      this.setTimer(timer);
    }
  }

  async fetchOrder(_id: string) {
    this.setLoading(true, 'order');
    this.setError("", 'order');
    this.setOrder(null);

    const token = localStorage.getItem('token');

    if (token) {
      try {
        const result = await ordersApi.fetchOrder(token, _id, { cell: 1 });

        if (result.status === 200) {
          this.setOrder(result.data);
        } else if (result.status === 404) {
          this.setError("Заказ не найден", 'order');
        } else {
          this.setError("Ошибка загрузки заказа", 'order');
        }
      } catch (error) {
        console.log(error);
        this.setError("Ошибка загрузки заказа", 'order');
      } finally {
        this.setLoading(false, 'order');
      }
    }
  }

  async fetchEditOrder(_id: string, body: TEditOrderQuery) {
    const token = localStorage.getItem('token');

    if (token) {
      this.setError("", 'edit');
      this.setLoading(true, 'edit');

      try {
        const result = await ordersApi.fetchEditOrder(token, _id, body);

        if (result.status === 200) {
          this.setOrder(result.data);
          if (this.orders) {
            this.setOrders(this.orders?.filter(item => item._id !== _id));
          }
        }
      } catch (error) {
        console.log(error);
        this.setError("Ошибка редактирования заказа", 'edit');
      } finally {
        this.setLoading(false, 'edit');
      }
    }

  }

  async removeOrder(_id: string) {
    this.setLoading(true, 'remove');
    this.setError("", 'remove');

    const token = localStorage.getItem('token');

    if (token) {
      try {
        const result = await ordersApi.fetchRemoveOrder(token, { _id });

        if (result.status === 200) {
          if (this.orders) {
            this.setOrders(this.orders.filter(order => order._id !== _id));
          }
          this.setOrder(null);
        } else {
          this.setError("Ошибка удаления заказа", 'remove');
        }
      } catch (error) {
        console.log(error);
        this.setError("Ошибка удаления заказа", 'remove');
      } finally {
        this.setLoading(false, 'remove');
      }
    }
  }

  async setMessage(message: string, _id: string) {
    this.setLoading(true, 'message');
    this.setError("", 'message');

    const token = localStorage.getItem('token');

    if (token) {
      try {
        const result = await ordersApi.fetchEditOrder(token, _id, { message });

        if (result.status === 200) {
          return true;
        }
        if (result.status !== 200) {
          this.setError("Ошибка сохранения сообщения", 'message');
          return false;
        }
      } catch (error) {
        console.log(error);
        this.setError("Ошибка сохранения сообщения", 'remove');
      } finally {
        this.setLoading(false, 'message');
      }
    }
  }
};

const ordersStore = new OrdersStore();

export default ordersStore;
