import axios, { TAxiosResult } from './axiosInstance';
import {
  TOrderListResult, TOrderListByStatusQuery,
  TOrderListByQRCodeQuery, TOrderListByQRCodeResult,
  TOrderListByBarcodeQuery, TOrderListByBarcodeResult,
} from '../types/orders';

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

  async fetchListByBarcode(token: string, query: TOrderListByBarcodeQuery): Promise<TAxiosResult<TOrderListByBarcodeResult>> {
    return await axios
      .get(`/order/code-order/${query.barcode}`, {
        params: { skip: query.skip, limit: query.limit },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
  }
}

const ordersApi = new OrdersApi();

export default ordersApi;
