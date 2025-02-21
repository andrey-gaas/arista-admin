import axios, { TAxiosResult } from './axiosInstance';
import { TClientsListQuery, TClientsListResult } from '../types/clients';

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
}

const clientsApi = new ClientsApi();

export default clientsApi;
