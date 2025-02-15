import axios, { TAxiosResult } from './axiosInstance';
import { TOrderListResult, TOrderListByStatusQuery } from '../types/orders';

class OrdersApi {
  async fetchListByStatus(token: string, query: TOrderListByStatusQuery): Promise<TAxiosResult<TOrderListResult>> {
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
