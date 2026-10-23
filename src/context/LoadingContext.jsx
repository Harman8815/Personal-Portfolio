import { createContext, useContext, useState, useCallback } from "react";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [contentReady, setContentReady] = useState(false);

  const markContentReady = useCallback(() => {
    setContentReady(true);
  }, []);

  return (
    <LoadingContext.Provider value={{ contentReady, markContentReady }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoadingContext = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoadingContext must be used within LoadingProvider");
  }
  return context;
};
