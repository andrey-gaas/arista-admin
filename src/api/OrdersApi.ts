import axios, { TAxiosResult } from './axiosInstance';
import {
  TOrderListResult, TOrderListByStatusQuery,
  TOrderListByQRCodeQuery, TOrderListByQRCodeResult,
  TOrderListByBarcodeQuery, TOrderListByBarcodeResult,
  TOrderListByPhoneQuery, TOrderListByPhoneResult,
  TOrderQuery, TOrderResult,
  TEditOrderQuery, TEditOrderResult,
  TRemoveOrderQuery, TRemoveOrderResult,
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

  async fetchListByPhone(token: string, query: TOrderListByPhoneQuery): Promise<TAxiosResult<TOrderListByPhoneResult>> {
    return await axios
      .get('/order/list', {
        params: query,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response)
      .catch(({ response }) => ({ ...response }));
  }

  async fetchOrder(token: string, _id: string, query: TOrderQuery): Promise<TAxiosResult<TOrderResult>> {
    return await axios
      .get(`/order/item/${_id}`, {
        params: query,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response)
      .catch(({ response }) => ({ ...response }));
  }

  async fetchEditOrder(token: string, _id: string, body: TEditOrderQuery): Promise<TAxiosResult<TEditOrderResult>> {
    return await axios
      .put(
        `/order/edit/${_id}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((response) => response)
      .catch(({ response }) => ({ ...response }));
  }

  async fetchRemoveOrder(token: string, query: TRemoveOrderQuery): Promise<TAxiosResult<TRemoveOrderResult>> {
    return await axios
      .delete(
        `/order/remove/${query._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((response) => response)
      .catch(({ response }) => ({ ...response }));

  }
}

const ordersApi = new OrdersApi();

export default ordersApi;
