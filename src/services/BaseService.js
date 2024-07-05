const API_URL = process.env.REACT_APP_API_URL;
const AUTH_TOKEN = "X-User-Token";

const getHeaders = () => {
  const headers = { 'Content-Type': 'application/json' };
  const token = sessionStorage.getItem(AUTH_TOKEN);
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
};

export const BaseService = {
  async get(url) {
    const headers = getHeaders();
    const request = await fetch(`${API_URL}/${url}`, { headers });
    if (request.status >= 400) throw request;
    return request.json();
  },

  async post(url, data = {}, isAuth = false) {
    const headers = getHeaders();
    const request = await fetch(`${API_URL}/${url}`, {
      headers,
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (request.status >= 400) throw request;
    if (isAuth) {
      const token = request.headers.get(AUTH_TOKEN);
      sessionStorage.setItem(AUTH_TOKEN, token);
    }
    return request.json();
  },

  async put(url, data = {}) {
    const headers = getHeaders();
    const request = await fetch(`${API_URL}/${url}`, {
      headers,
      method: 'PUT',
      body: JSON.stringify(data),
    });
    if (request.status >= 400) throw request;
    return request.json();
  },

  async delete(url) {
    const headers = getHeaders();
    const request = await fetch(`${API_URL}/${url}`, {
      headers,
      method: 'DELETE',
    });
    if (request.status >= 400) throw request;
    return request.json();
  },
};
