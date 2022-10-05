import axios from 'axios';

const baseURL =
  import.meta.env.VITE_MOCK_ON === 'true'
    ? import.meta.env.VITE_BASE_URL_MOCK
    : import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL,
});

export { api };

