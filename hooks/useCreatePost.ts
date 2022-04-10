import { useRouter } from 'next/router';
import { InfoStatus, useInfoContext } from 'components/InfoStack';
import { PostType } from 'components/Post/types';
import { client } from 'utils/client';

export const useCreatePost = () => {
  const router = useRouter();
  const { pushInfo } = useInfoContext();
  return async (postItem: Omit<PostType, 'id'>): Promise<string> => {
    pushInfo({
      text: `Creating ${postItem.name}`,
      status: InfoStatus.Pending,
    });

    try {
      const response = await client.post(
        '/posts',
        { ...postItem },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const responseJson = response.data;

        if (!responseJson.error) {
          pushInfo({
            text: `Created ${postItem.name}`,
            status: InfoStatus.Good,
          });
        } else {
          pushInfo({
            text: responseJson.error,
            status: InfoStatus.Bad,
          });
        }
        return responseJson.data;
      }
      pushInfo({
        text: response.statusText,
        status: InfoStatus.Bad,
      });
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
    return '';
  };
};
