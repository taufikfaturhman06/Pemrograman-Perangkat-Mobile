import axios from 'axios';

const API_URL = 'http://10.0.2.2:3000/api/inventory'; // ganti dengan alamat IP kamu

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
