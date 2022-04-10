import { useEffect } from 'react';
import { client, attachCSRFToken } from 'utils/client';

export const useCSRF = () => {
  useEffect(() => {
    client
      .get('/auth/csrf', {
        withCredentials: true,
      })
      .then((response) => void attachCSRFToken(response.data.csrfToken))
      .catch();
  }, []);
};
