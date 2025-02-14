import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/admin`,
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

export type TAxiosResult<TData> = {
  data: TData;
  status: number;
};

export default api;