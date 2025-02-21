import axios, { TAxiosResult } from './axiosInstance';
import {
  TPvzListQuery, TPvzListResult,
} from '../types/pvz';

class PvzApi {
  async fetchList(token: string, query: TPvzListQuery): Promise<TAxiosResult<TPvzListResult>> {
    return axios
      .get('/pvz/list', {
        params: query,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response)
      .catch(({ response }) => ({ ...response }));
  }
}

const pvzApi = new PvzApi();

export default pvzApi;
