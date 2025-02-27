import axios, { TAxiosResult } from './axiosInstance';
import {
  TTransportationsListQuery, TTransportationsListResult,
  TTransportationCreateBody, TTransportationCreateResult,
} from '../types/transportations';

class TransportationsApi {
  async fetchList(token: string, query: TTransportationsListQuery): Promise<TAxiosResult<TTransportationsListResult>> {
    return await axios
      .get('/transportations', {
        params: query,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response)
      .catch(({ response }) => ({ ...response }));
  }

  async fetchCreate(token: string, body: TTransportationCreateBody): Promise<TAxiosResult<TTransportationCreateResult>> {
    return await axios
      .post('/transportations', body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response)
      .catch(({ response }) => ({ ...response }));
  }
}

const transportationsApi = new TransportationsApi();

export default transportationsApi;
