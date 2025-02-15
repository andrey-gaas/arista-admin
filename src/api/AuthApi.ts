import axios, { TAxiosResult } from './axiosInstance';
import { TLoginResult, TProfileResult } from '../types/auth';

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
}

const authApi = new AuthApi();

export default authApi;
