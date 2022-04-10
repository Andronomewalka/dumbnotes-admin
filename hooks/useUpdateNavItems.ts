import { useRouter } from 'next/router';
import { InfoStatus, useInfoContext } from 'components/InfoStack';
import { client } from 'utils/client';

export const useUpdateNavItems = () => {
  const router = useRouter();
  const { pushInfo } = useInfoContext();
  return async (navItemsContent: string) => {
    pushInfo({
      text: 'Updating navigation',
      status: InfoStatus.Pending,
    });

    try {
      const response = await client.put(
        `/navigation`,
        { navItemsContent },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const responseJson = await response.data;

        if (!responseJson.error) {
          pushInfo({
            text: 'Updated navitgation',
            status: InfoStatus.Good,
          });
        } else {
          pushInfo({
            text: responseJson.error,
            status: InfoStatus.Bad,
          });
        }
      } else {
        pushInfo({
          text: response.statusText,
          status: InfoStatus.Bad,
        });
      }
    } catch (e: any) {
      const error = e?.response?.data?.message || e + '';
      pushInfo({
        text: error,
        status: InfoStatus.Bad,
      });
      if (e?.response?.status === 401) {
        router.push('../auth');
      }
    }
  };
};
