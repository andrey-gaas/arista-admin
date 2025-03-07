import axios, { TAxiosResult } from './axiosInstance';
import { TLoginResult, TProfileResult } from '../types/auth';
import { TUserCreateResult, TUserCreateBody } from '../types/users';

class AuthApi {
  async login(email: string, password: string): Promise<TAxiosResult<TLoginResult>> {
    return axios
      .post('/auth/login', { email, password })
      .then((response) => response)
      .catch(({ response }) => ({ ...response }));
  }

  async fetchProfile(token: string): Promise<TAxiosResult<TProfileResult>> {
    return await axios
      .get('/auth/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response)
      .catch(({ response }) => ({ ...response }));
  }

  async fetchRegister(token: string, body: TUserCreateBody): Promise<TAxiosResult<TUserCreateResult>> {
    return await axios
      .post('/auth/registration', body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response)
      .catch(({ response }) => ({ ...response }));
  }
}

const authApi = new AuthApi();

export default authApi;
