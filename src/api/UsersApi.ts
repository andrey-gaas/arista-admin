import axios, { TAxiosResult } from './axiosInstance';
import {
  TUsersListQuery, TUsersListResult,
  TUserResult,
  TUserEditBody, TUserEditResult,
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

  async fetchUser(token: string, _id: string): Promise<TAxiosResult<TUserResult>> {
    return await axios
      .get(`/admins/item/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response)
      .catch(({ response }) => ({ ...response }));
  }

  async fetchEditUser(token: string, _id: string, body: TUserEditBody): Promise<TAxiosResult<TUserEditResult>> {
    return await axios
      .put(`/admins/edit/${_id}`, body, {
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
