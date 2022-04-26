import { InfoStatus, useInfoContext } from 'components/InfoStack';
import { PostType } from 'components/Post/types';
import { useRouter } from 'next/router';
import { client } from 'utils/client';
import { useRevalidate } from './useRevalidate';

export const useUpdatePost = () => {
  const router = useRouter();
  const { pushInfo } = useInfoContext();
  const revalidate = useRevalidate();
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
          // revalidate old and new pathes (if some of theme was or become 404)
          const revalidateNewTesult = await revalidate(postItem.name, postItem.path);
          const revalidateOldResult =
            postItem.path === postOldPath ||
            (await revalidate(postItem.name, postOldPath)); // if path haven't changed, don't revalidate same path twice

          if (revalidateOldResult && revalidateNewTesult) {
            pushInfo({
              text: `Updated ${postItem.name}`,
              status: InfoStatus.Good,
            });
          }
          return revalidateOldResult && revalidateNewTesult;
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
