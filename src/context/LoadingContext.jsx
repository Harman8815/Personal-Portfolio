import { createContext, useContext, useState, useCallback } from "react";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [contentReady, setContentReady] = useState(false);

  const markContentReady = useCallback(() => {
    console.log("[LoadingContext] markContentReady called - setting contentReady to true");
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
