import React, { createContext, useState, useContext } from 'react';

export type User = {
  id: number;
  avatar?: string;
  email: string;
};

type UserContextType = {
  user: User | null;
  setUser: (entity: any) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User| null>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) throw new Error('useUserContext must be used within a UserProvider');

  return context;
};