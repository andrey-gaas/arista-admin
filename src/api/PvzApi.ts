import axios, { TAxiosResult } from './axiosInstance';
import {
  TPvzListQuery, TPvzListResult,
  TPvzResult,
  TPvzEditQuery, TPvzEditResult,
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

  async fetchPvz(token: string, id: string): Promise<TAxiosResult<TPvzResult>> {
    return axios
      .get(`/pvz/item/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response)
      .catch(({ response }) => ({ ...response }));
  }

  async fetchEditPvz(token: string, id: string, body: TPvzEditQuery): Promise<TAxiosResult<TPvzEditResult>> {
    return await axios
      .put(`/pvz/edit/${id}`, body, {
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
