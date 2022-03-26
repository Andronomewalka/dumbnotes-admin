import { PostType } from 'blog-app-shared';
import { InfoStatus, useInfoContext } from 'components/InfoStack';

export const useUpdatePost = () => {
  const { pushInfo } = useInfoContext();
  return async (postItem: PostType) => {
    pushInfo({
      text: `Updating ${postItem.name}`,
      status: InfoStatus.Pending,
    });

    const response = await fetch('http://localhost:4001/api/updatePost', {
      method: 'POST',
      body: JSON.stringify({ ...postItem }),
    });

    if (response.ok) {
      const responseJson = await response.json();

      if (!responseJson.error) {
        pushInfo({
          text: `Updated ${postItem.name}`,
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
  };
};
