import { InfoStatus, useInfoContext } from 'components/InfoStack';
import { client } from 'utils/client';

export const useRevalidate = () => {
  const { pushInfo } = useInfoContext();
  return async (name: string, path: string): Promise<boolean> => {
    try {
      const revalidateResponse = await client.post(
        `${process.env.NEXT_PUBLIC_ORIGIN_MAIN}/api/revalidate`,
        {
          secret: process.env.NEXT_PUBLIC_REVALIDATE_TOKEN,
          post: path,
        }
      );
      if (revalidateResponse.status === 200) {
        const revalidateResponseJson = await revalidateResponse.data;
        if (!revalidateResponseJson.success) {
          pushInfo({
            text: `Updated ${name}, but revalidation failed with "${revalidateResponseJson.message}"`,
            status: InfoStatus.Pending,
          });
          return false;
        }
      } else {
        pushInfo({
          text: `Updated ${name}, but revalidation failed with "${revalidateResponse.statusText}"`,
          status: InfoStatus.Pending,
        });
        return false;
      }
      return true;
    } catch (e: any) {
      const error = e?.response?.data?.message || e + '';
      pushInfo({
        text: error,
        status: InfoStatus.Bad,
      });
    }
    return false;
  };
};
