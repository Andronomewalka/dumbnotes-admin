import { DriveItemType } from 'blog-app-shared/src/gapi';
import { InfoStatus, useInfoContext } from 'components/InfoStack';
import { useRouter } from 'next/router';

export const useUpdateDriveItem = () => {
  const router = useRouter();
  const { pushInfo } = useInfoContext();
  return async (driveItem: DriveItemType, isCreation: boolean) => {
    pushInfo({
      text: `${isCreation ? 'Creating' : 'Updating'} ${driveItem.name}`,
      status: InfoStatus.Pending,
    });

    const response = await fetch('http://localhost:4001/api/updateDriveItem', {
      method: 'POST',
      body: JSON.stringify({ ...driveItem, isCreation }),
    });

    if (response.ok) {
      const responseJson = await response.json();
      const newItemId = responseJson.data;

      if (isCreation && !responseJson.error) {
        router.push(`/${newItemId}`, undefined, {
          shallow: true,
        });
      }

      if (!responseJson.error) {
        pushInfo({
          text: `${isCreation ? 'Created' : 'Updated'} ${driveItem.name}`,
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
