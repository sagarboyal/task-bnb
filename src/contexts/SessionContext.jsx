import React, { createContext, useContext, useState } from "react";

const SessionContext = createContext(null);

export const SessionProvider = ({ children }) => {
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [sessionData, setSessionData] = useState(null);

  const completeSetup = (data) => {
    setSessionData(data);
    setIsSetupComplete(true);
  };

  const clearSession = () => {
    setSessionData(null);
    setIsSetupComplete(false);
  };

  return (
    <SessionContext.Provider
      value={{
        isSetupComplete,
        sessionData,
        completeSetup,
        clearSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
