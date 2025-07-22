import { ReactNode }      from 'react';
import { EntityProvider } from './EntityContext';
import { UserProvider }   from './UserContext';

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  return (
      <EntityProvider>
        <UserProvider>
          {children}
        </UserProvider>
      </EntityProvider>
  );
};
