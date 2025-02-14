import axios, { TAxiosResult } from './axiosInstance';
import { TLoginResult } from '../types/auth';

class AuthApi {
  async login(email: string, password: string): Promise<TAxiosResult<TLoginResult>> {
    return axios
      .post('/auth/login', { email, password })
      .then((response) => response)
      .catch(({ response }) => ({ ...response }));
  }
}

const authApi = new AuthApi();

export default authApi;
