import axios from 'axios';

export const client = axios.create({
  baseURL: 'http://127.0.0.1:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const isCSRFTokenPresent = () => {
  return !!client.defaults.headers.post['X-CSRF-Token'];
};

export const attachCSRFToken = (xsrfToken: string) => {
  client.defaults.headers.post['X-CSRF-Token'] = xsrfToken;
  client.defaults.headers.patch['X-CSRF-Token'] = xsrfToken;
  client.defaults.headers.put['X-CSRF-Token'] = xsrfToken;
  client.defaults.headers.delete['X-CSRF-Token'] = xsrfToken;
};
