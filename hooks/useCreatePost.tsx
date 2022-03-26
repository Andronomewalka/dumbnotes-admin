import { useRouter } from 'next/router';
import { PostType } from 'blog-app-shared';
import { InfoStatus, useInfoContext } from 'components/InfoStack';

export const useCreatePost = () => {
  const router = useRouter();
  const { pushInfo } = useInfoContext();
  return async (postItem: Omit<PostType, 'id'>): Promise<string> => {
    pushInfo({
      text: `Creating ${postItem.name}`,
      status: InfoStatus.Pending,
    });

    const response = await fetch('http://localhost:4001/api/createPost', {
      method: 'POST',
      body: JSON.stringify({ ...postItem }),
    });

    if (response.ok) {
      const responseJson = await response.json();

      if (!responseJson.error) {
        router.push(`/${postItem.path}`, undefined, {
          shallow: true,
        });
      }

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
      return responseJson as string;
    }

    pushInfo({
      text: response.statusText,
      status: InfoStatus.Bad,
    });
    return '';
  };
};
