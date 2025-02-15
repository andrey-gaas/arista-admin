import axios, { TAxiosResult } from './axiosInstance';
import { TOrderListResult, TOrderListQuery } from '../types/orders';

class OrdersApi {
  async fetchList(token: string, query: TOrderListQuery): Promise<TAxiosResult<TOrderListResult>> {
    return axios
      .get('/order/list', {
        params: query,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response)
      .catch(({ response }) => ({ ...response }));
  }
}

const ordersApi = new OrdersApi();

export default ordersApi;
