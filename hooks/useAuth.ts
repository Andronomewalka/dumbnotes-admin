import { InfoStatus, useInfoContext } from 'components/InfoStack';
import { client } from 'utils/client';

export const useAuth = () => {
  const { pushInfo } = useInfoContext();
  return async (code: string): Promise<boolean> => {
    pushInfo({
      text: `Authorizing`,
      status: InfoStatus.Pending,
    });

    try {
      const response = await client.post(
        '/auth/sign-in',
        { code },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const responseJson = response.data;

        if (!responseJson.error) {
          pushInfo({
            text: `Authorized`,
            status: InfoStatus.Good,
          });
        } else {
          pushInfo({
            text: responseJson.error,
            status: InfoStatus.Bad,
          });
        }
        return true;
      }
      pushInfo({
        text: response.statusText,
        status: InfoStatus.Bad,
      });
      return false;
    } catch (e: any) {
      const error = e?.response?.data?.message || e + '';
      pushInfo({
        text: error,
        status: InfoStatus.Bad,
      });
      return false;
    }
  };
};
