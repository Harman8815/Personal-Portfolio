import React, { useState } from "react";

export const CardContext = React.createContext({
  expandedCard: null,
  setExpandedCard: () => {},
  openCardModal: () => {},
  closeModal: () => {},
  resetTrigger: 0,
  triggerReset: () => {},
});

export const CardProvider = ({ children, openCardModal, closeModal }) => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [resetTrigger, setResetTrigger] = useState(0);

  const triggerReset = () => {
    setResetTrigger((prev) => prev + 1);
  };

  return (
    <CardContext.Provider
      value={{
        expandedCard,
        setExpandedCard,
        openCardModal,
        closeModal,
        resetTrigger,
        triggerReset,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};
