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
      method: 'PUT',
      body: JSON.stringify({ ...postItem }),
    });

    if (response.ok) {
      const responseJson = await response.json();

      if (responseJson.data !== 'pathChanged') {
        const revalidateResponse = await fetch(
          `http://localhost:3000/api/revalidate?secret=${process.env.NEXT_PUBLIC_REVALIDATE_TOKEN}&post=${postItem.path}`
        );
        if (revalidateResponse.ok) {
          const revalidateResponseJson = await revalidateResponse.json();
          if (!revalidateResponseJson.success) {
            pushInfo({
              text: `Updated ${postItem.name}, but revalidation failed with "${revalidateResponseJson.message}"`,
              status: InfoStatus.Pending,
            });
            return;
          }
        } else {
          pushInfo({
            text: `Updated ${postItem.name}, but revalidation failed with "${revalidateResponse.statusText}"`,
            status: InfoStatus.Pending,
          });
          return;
        }
      }

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
