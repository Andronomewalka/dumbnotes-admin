import { InfoStatus, useInfoContext } from 'components/InfoStack';
import { PostType } from 'components/Post/types';
import { useRouter } from 'next/router';
import { client } from 'utils/client';

export const useUpdatePost = () => {
  const router = useRouter();
  const { pushInfo } = useInfoContext();
  return async (postOldPath: string, postItem: PostType): Promise<boolean> => {
    pushInfo({
      text: `Updating ${postItem.name}`,
      status: InfoStatus.Pending,
    });

    try {
      const response = await client.put(
        `/posts/${postItem.id}`,
        { ...postItem },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const responseJson = await response.data;

        if (!responseJson.error) {
          // need to revalidate changed item (on its before changed path)
          const revalidateResponse = await fetch(
            `http://127.0.0.1:3000/api/revalidate?secret=${process.env.NEXT_PUBLIC_REVALIDATE_TOKEN}&post=${postOldPath}`
          );
          if (revalidateResponse.ok) {
            const revalidateResponseJson = await revalidateResponse.json();
            if (!revalidateResponseJson.success) {
              pushInfo({
                text: `Updated ${postItem.name}, but revalidation failed with "${revalidateResponseJson.message}"`,
                status: InfoStatus.Pending,
              });
              return false;
            }
          } else {
            pushInfo({
              text: `Updated ${postItem.name}, but revalidation failed with "${revalidateResponse.statusText}"`,
              status: InfoStatus.Pending,
            });
            return false;
          }

          pushInfo({
            text: `Updated ${postItem.name}`,
            status: InfoStatus.Good,
          });
          return true;
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
    return false;
  };
};
