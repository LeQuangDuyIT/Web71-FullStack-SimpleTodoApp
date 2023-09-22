import api from './axiosInstance';

const TodoAPI = {
  getAll: () => {
    const url = '/todos';
    return api.get(url);
  },
  getById: id => {
    const url = `/todos/${id}`;
    return api.get(url);
  },
  create: data => {
    const url = '/todos';
    return api.post(url, data);
  },
  update: (id, data) => {
    const url = `/todos/${id}`;
    return api.put(url, data);
  },
  deleteById: id => {
    const url = `todos/${id}`;
    return api.delete(url);
  }
};

export default TodoAPI;
