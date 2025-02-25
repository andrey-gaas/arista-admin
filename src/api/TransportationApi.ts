import axios, { TAxiosResult } from './axiosInstance';
import {
  TTransportationsListQuery, TTransportationsListResult,
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
  }
}

const transportationsApi = new TransportationsApi();

export default transportationsApi;
