import axios from 'axios';

export const backApi = axios.create({
  baseURL:'http://localhost:8000/',
});