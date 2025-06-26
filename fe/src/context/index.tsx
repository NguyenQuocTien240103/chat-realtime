import { ReactNode } from 'react';
import { EntityProvider } from './EntityContext';

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  return (
      <EntityProvider>{children}</EntityProvider>
  );
};
