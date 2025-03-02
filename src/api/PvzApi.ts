import axios, { TAxiosResult } from './axiosInstance';
import {
  TPvzListQuery, TPvzListResult,
  TPvzResult,
  TPvzEditQuery, TPvzEditResult,
  TPvzCreateBody, TPvzCreateResult,
  TPvzRemoveResult,
  TPvzSetCellBody, TPvzSetCellResult,
  TPvzRemoveCellQuery, TPvzRemoveCellResult,
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

  async fetchCreatePvz(token: string, body: TPvzCreateBody): Promise<TAxiosResult<TPvzCreateResult>> {
    return await axios
      .post('/pvz/create', body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response)
      .catch(({ response }) => ({ ...response }));
  }

  async fetchRemovePvz(token: string, _id: string): Promise<TAxiosResult<TPvzRemoveResult>> {
    return await axios
      .delete(`/pvz/delete/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response)
      .catch(({ response }) => ({ ...response }));
  }

  async fetchSetCell(token: string, _id: string, body: TPvzSetCellBody): Promise<TAxiosResult<TPvzSetCellResult>> {
    return await axios
      .put(`/pvz/add-product/${_id}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response)
      .catch(({ response }) => ({ ...response }));
  }

  async fetchRemoveCell(token: string, _id: string, body: TPvzRemoveCellQuery): Promise<TAxiosResult<TPvzRemoveCellResult>> {
    return await axios
      .put(`/pvz/remove-product/${_id}`, body, {
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
