import React, { FC, useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { InfoType, InfoStackContextValueType } from './types';

const initContextValue: InfoStackContextValueType = {
  infos: [],
  pushInfo: () => {},
  removeInfo: () => {},
};

const InfoStackContext = React.createContext<InfoStackContextValueType>(initContextValue);

export const useInfoContext = () => {
  return useContext(InfoStackContext);
};

export const InfoStakProvider: FC = ({ children }) => {
  const [infos, setInfos] = useState<InfoType[]>([]);

  const pushInfo = (info: InfoType) => {
    if (!info.id) {
      info.id = uuidv4();
    }
    setInfos((curInfos) => [info, ...curInfos]);
  };

  const removeInfo = (info: InfoType) => {
    setInfos((curInfos) => [...curInfos.filter((cur) => cur.id !== info.id)]);
  };

  return (
    <InfoStackContext.Provider
      value={{
        infos,
        pushInfo,
        removeInfo,
      }}
    >
      {children}
    </InfoStackContext.Provider>
  );
};
