import React, { createContext, useState, useContext } from 'react';

// Create a context for the selected entity
type EntityContextType = {
  selectedEntity: number | null;
  setSelectedEntity: (entity: any) => void;
};

const EntityContext = createContext<EntityContextType | undefined>(undefined);

export const EntityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedEntity, setSelectedEntity] = useState(null);

  return (
    <EntityContext.Provider value={{ selectedEntity, setSelectedEntity }}>
      {children}
    </EntityContext.Provider>
  );
};

export const useEntity = () => {
  const context = useContext(EntityContext);
  if (!context) {
    throw new Error('useEntity must be used within a EntityProvider');
  }
  return context;
};