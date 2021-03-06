import { useRouter } from 'next/router';
import { InfoStatus, useInfoContext } from 'components/InfoStack';
import { PostBaseType } from 'components/Post/types';
import { client } from 'utils/client';
import { useRevalidate } from './useRevalidate';

export const useDeletePost = () => {
  const router = useRouter();
  const { pushInfo } = useInfoContext();
  const revalidate = useRevalidate();
  return async (postItem: PostBaseType, onSuccess: () => void) => {
    pushInfo({
      text: `Deleting ${postItem.name}`,
      status: InfoStatus.Pending,
    });
    try {
      const response = await client.delete(`/posts/${postItem.id}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        const responseJson = await response.data;
        const revalidateRemovedResult = await revalidate(postItem.name, postItem.path);
        const isOk: boolean = responseJson.data && revalidateRemovedResult;

        if (isOk) {
          onSuccess();
          pushInfo({
            text: `Deleted ${postItem.name}`,
            status: InfoStatus.Good,
          });
        } else {
          pushInfo({
            text: responseJson.error,
            status: InfoStatus.Bad,
          });
          return;
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
        router.push('/auth');
      }
    }
  };
};
