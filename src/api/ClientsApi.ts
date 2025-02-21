import axios, { TAxiosResult } from './axiosInstance';
import {
  TClientsListQuery, TClientsListResult,
  TClientQuery, TClientResult,
  TClientEditBody, TClientEditResult,
} from '../types/clients';

class ClientsApi {
  async fetchList(token: string, query: TClientsListQuery): Promise<TAxiosResult<TClientsListResult>> {
    return axios
      .get('/user/list', {
        params: query,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response)
      .catch(({ response }) => ({ ...response }));
  }

  async fetchClient(token: string, query: TClientQuery): Promise<TAxiosResult<TClientResult>> {
    return axios
      .get(`/user/item/${query.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response)
      .catch(({ response }) => ({ ...response }));
  }

  async fetchEditClient(token: string, id: string, body: TClientEditBody): Promise<TAxiosResult<TClientEditResult>> {
    return axios
      .put(`/user/item/${id}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response)
      .catch(({ response }) => ({ ...response }));
  }
}

const clientsApi = new ClientsApi();

export default clientsApi;
