import axios, { TAxiosResult } from './axiosInstance';
import { TOrderListResult, TOrderListByStatusQuery, TOrderListByQRCodeQuery, TOrderListByQRCodeResult } from '../types/orders';

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

  async fetchListByQRCode(token: string, query: TOrderListByQRCodeQuery): Promise<TAxiosResult<TOrderListByQRCodeResult>> {
    return axios
      .get(`/order/code/${query.code}`, {
        params: { skip: query.skip, limit: query.limit },
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
