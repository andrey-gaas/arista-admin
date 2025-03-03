import axios, { TAxiosResult } from './axiosInstance';
import {
  TUsersListQuery, TUsersListResult,
} from '../types/users';

class UsersApi {
  async fetchList(token: string, query: TUsersListQuery): Promise<TAxiosResult<TUsersListResult>> {
    return await axios
      .get('/admins/list', {
        params: query,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response)
      .catch(({ response }) => ({ ...response }));
  }
}

const usersApi = new UsersApi();

export default usersApi;
