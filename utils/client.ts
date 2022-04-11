import axios from 'axios';

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ORIGIN_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const attachCSRFToken = (xsrfToken: string) => {
  client.defaults.headers.post['X-CSRF-Token'] = xsrfToken;
  client.defaults.headers.patch['X-CSRF-Token'] = xsrfToken;
  client.defaults.headers.put['X-CSRF-Token'] = xsrfToken;
  client.defaults.headers.delete['X-CSRF-Token'] = xsrfToken;
};
