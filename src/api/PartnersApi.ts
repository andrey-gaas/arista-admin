import axios, { TAxiosResult } from './axiosInstance';
import {
  TPartnersListQuery, TPartnersListResult,
  TPartnerResult,
} from '../types/partners';

class PartnersApi {
  async fetchList(token: string, query: TPartnersListQuery): Promise<TAxiosResult<TPartnersListResult>> {
    return await axios
      .get('/applications/list', {
        params: query,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response)
      .catch(({ response }) => ({ ...response }));
  }

  async fetchPartner(token: string, _id: string): Promise<TAxiosResult<TPartnerResult>> {
    return await axios
      .get(`/applications/item/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response)
      .catch(({ response }) => ({ ...response }));
  }
}

const partnersApi = new PartnersApi();

export default partnersApi;
