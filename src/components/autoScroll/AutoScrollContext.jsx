import React, { createContext, useContext } from 'react';
import { useAutoScrollController } from './useAutoScrollController.js';

const AutoScrollContext = createContext(undefined);

export const AutoScrollProvider = ({ children }) => {
  const controller = useAutoScrollController({ speed: 10 });

  return (
    <AutoScrollContext.Provider value={controller}>
      {children}
    </AutoScrollContext.Provider>
  );
};

export const useAutoScroll = () => {
  const context = useContext(AutoScrollContext);
  if (context === undefined) {
    throw new Error('useAutoScroll must be used within an AutoScrollProvider');
  }
  return context;
};
