import axios, { TAxiosResult } from './axiosInstance';
import {
  TPartnersListQuery, TPartnersListResult,
} from '../types/partners';

class PartnersApi {
  async fetchList(token: string, query: TPartnersListQuery): Promise<TAxiosResult<TPartnersListResult>> {
    return await axios
      .get('/applications/list', {
        params: query,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response)
      .catch(({ response }) => ({ ...response }));
  }
}

const partnersApi = new PartnersApi();

export default partnersApi;
