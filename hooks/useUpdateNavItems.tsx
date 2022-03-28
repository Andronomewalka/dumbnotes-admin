import { InfoStatus, useInfoContext } from 'components/InfoStack';

export const useUpdateNavItems = () => {
  const { pushInfo } = useInfoContext();
  return async (navItemsContent: string) => {
    pushInfo({
      text: 'Updating navigation',
      status: InfoStatus.Pending,
    });

    try {
      const response = await fetch('http://localhost:4001/api/updateNavItems', {
        method: 'PUT',
        body: JSON.stringify({ navItemsContent }),
      });

      if (response.ok) {
        const responseJson = await response.json();

        if (!responseJson.error) {
          pushInfo({
            text: 'Updated navitgation',
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
    } catch (e: any) {
      pushInfo({
        text: e + '',
        status: InfoStatus.Bad,
      });
    }
  };
};
