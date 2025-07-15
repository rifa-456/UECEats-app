import React, { createContext, useContext } from 'react';
import { useInitialSetup } from '../hooks/useInitialSetup';

const InitialSetupContext = createContext<ReturnType<typeof useInitialSetup> | null>(null);

export const InitialSetupProvider = ({ children }: { children: React.ReactNode }) => {
  const setup = useInitialSetup();
  return (
    <InitialSetupContext.Provider value={setup}>
      {children}
    </InitialSetupContext.Provider>
  );
};

export const useSharedInitialSetup = () => {
  const context = useContext(InitialSetupContext);
  if (!context) {
    throw new Error('useSharedInitialSetup must be used within an InitialSetupProvider');
  }
  return context;
};