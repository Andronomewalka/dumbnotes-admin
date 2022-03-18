import { InfoStatus, useInfoContext } from 'components/InfoStack';
import { DriveItemBaseType } from 'components/DriveItem';

export const useRemoveDriveItem = () => {
  const { pushInfo } = useInfoContext();
  return async (driveItem: DriveItemBaseType, onSuccess: () => void) => {
    pushInfo({
      text: `Removing ${driveItem.name}`,
      status: InfoStatus.Pending,
    });
    const result = await fetch('http://localhost:4001/api/removeDriveItem', {
      method: 'POST',
      body: JSON.stringify({ driveId: driveItem.id }),
    });
    if (result.ok) {
      const resultJson = await result.json();
      if (!resultJson.error) {
        onSuccess();
        pushInfo({
          text: `Removed ${driveItem.name}`,
          status: InfoStatus.Good,
        });
      } else {
        pushInfo({
          text: resultJson.error,
          status: InfoStatus.Bad,
        });
        return;
      }
    } else {
      pushInfo({
        text: result.statusText,
        status: InfoStatus.Bad,
      });
    }
  };
};
