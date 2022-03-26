import { DriveItemBaseType } from 'blog-app-shared/src/gapi';
import { InfoStatus, useInfoContext } from 'components/InfoStack';

export const useRemoveDriveItem = () => {
  const { pushInfo } = useInfoContext();
  return async (driveItem: DriveItemBaseType, onSuccess: () => void) => {
    pushInfo({
      text: `Removing ${driveItem.name}`,
      status: InfoStatus.Pending,
    });
    const response = await fetch('http://localhost:4001/api/removeDriveItem', {
      method: 'POST',
      body: JSON.stringify({ driveId: driveItem.id }),
    });
    if (response.ok) {
      const responseJson = await response.json();
      const isOk: boolean = responseJson.data;

      if (isOk) {
        fetch('http://localhost:3000/api/updateDrivePathes', {
          method: 'POST',
        });
        onSuccess();
        pushInfo({
          text: `Removed ${driveItem.name}`,
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
