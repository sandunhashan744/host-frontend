import axios from 'axios';

export const MyApiClient = axios.create({
  baseURL: 'https://ttcuser-api.onrender.com',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});