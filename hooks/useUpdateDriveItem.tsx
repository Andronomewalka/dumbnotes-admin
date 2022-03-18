import { InfoStatus, useInfoContext } from 'components/InfoStack';
import { DriveItemType } from 'components/DriveItem';
import { useRouter } from 'next/router';

export const useUpdateDriveItem = () => {
  const router = useRouter();
  const { pushInfo } = useInfoContext();
  return async (driveItem: DriveItemType, isCreation: boolean) => {
    pushInfo({
      text: `${isCreation ? 'Creating' : 'Updating'} ${driveItem.name}`,
      status: InfoStatus.Pending,
    });

    const result = await fetch('http://localhost:4001/api/updateDriveItem', {
      method: 'POST',
      body: JSON.stringify({ ...driveItem, isCreation }),
    });

    if (result.ok) {
      const resultJson = await result.json();

      if (isCreation && !resultJson.error) {
        const newItemId = resultJson.response;
        router.push(`/${newItemId}`, undefined, {
          shallow: true,
        });
      }

      if (resultJson.error) {
        pushInfo({
          text: resultJson.error,
          status: InfoStatus.Bad,
        });
      } else if (!resultJson.error) {
        pushInfo({
          text: `${isCreation ? 'Created' : 'Updated'} ${driveItem.name}`,
          status: InfoStatus.Good,
        });
      }
    } else {
      pushInfo({
        text: result.statusText,
        status: InfoStatus.Bad,
      });
    }
  };
};
