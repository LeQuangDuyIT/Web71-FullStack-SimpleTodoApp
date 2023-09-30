import axios from 'axios';

const BASE_API_URL = 'https://web71-simple-todo-app-server.onrender.com/api/v1';

const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 10000,
});

export default api;
