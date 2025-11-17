import { BASE_URL } from '@/core/utils/consts';
import axios from 'axios';

const defaultInstance = axios.create({
  timeout: 100_000,
  baseURL: BASE_URL,
});

export default defaultInstance;
