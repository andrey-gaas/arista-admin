import axios, { TAxiosResult } from './axiosInstance';
import {
  TStatiscticsListQuery, TStatisticsListResult
} from '../types/statistics';

class StatisticsApi {
  async fetchStatistics(token: string, query: TStatiscticsListQuery): Promise<TAxiosResult<TStatisticsListResult>> {
    return await axios
      .get('/stat/list', {
        headers: { Authorization: `Bearer ${token}` },
        params: query,
      })
      .then((response) => response)
      .catch(({ response }) => ({ ...response }));
  }
}

const statisticsApi = new StatisticsApi();

export default statisticsApi;
