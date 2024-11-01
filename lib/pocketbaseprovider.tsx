// pocketbase.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import PocketBase, { AsyncAuthStore } from 'pocketbase';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PocketBaseContextType {
  pb?: PocketBase;
}

const PocketBaseContext = createContext<PocketBaseContextType | undefined>(undefined);

export const usePocketBase = (): PocketBaseContextType => {
  const context = useContext(PocketBaseContext);
  if (context === undefined) {
    throw new Error('usePocketBase must be used within a PocketBaseProvider');
  }
  return context;
};

interface PocketBaseProviderProps {
  children: ReactNode;
}

export const PocketBaseProvider: React.FC<PocketBaseProviderProps> = ({ children }) => {
  const [pb, setPb] = useState<PocketBase | undefined>(undefined);

  useEffect(() => {
    const initializePocketBase = async () => {
      // Await the initial value from AsyncStorage
      const initialAuth = await AsyncStorage.getItem('pb_auth');

      const store = new AsyncAuthStore({
        save: async (serialized) => AsyncStorage.setItem('pb_auth', serialized),
        initial: initialAuth || '', // Provide a default empty string if null
        clear: async () => AsyncStorage.removeItem('pb_auth'),
      });

      const pbInstance = new PocketBase('<your-pocketbase-url>', store);
      setPb(pbInstance);
    };

    initializePocketBase();
  }, []);

  return (
    <PocketBaseContext.Provider value={{ pb }}>
      {children}
    </PocketBaseContext.Provider>
  );
};
