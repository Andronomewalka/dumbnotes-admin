import { PostBaseType } from 'blog-app-shared';
import { InfoStatus, useInfoContext } from 'components/InfoStack';

export const useDeletePost = () => {
  const { pushInfo } = useInfoContext();
  return async (postItem: PostBaseType, onSuccess: () => void) => {
    pushInfo({
      text: `Deleting ${postItem.name}`,
      status: InfoStatus.Pending,
    });
    const response = await fetch('http://localhost:4001/api/deletePost', {
      method: 'POST',
      body: JSON.stringify({ postId: postItem.id }),
    });
    if (response.ok) {
      const responseJson = await response.json();
      const isOk: boolean = responseJson.data;

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
  };
};
