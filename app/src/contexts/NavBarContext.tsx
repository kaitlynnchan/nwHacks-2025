import { createContext, useCallback, useContext, useState } from "react";

interface NavBarConfig {
  showBack: boolean;
  backPath?: string;
}

interface NavBarContextType {
  config: NavBarConfig;
  setConfig: (config: Partial<NavBarConfig>) => void;
  resetConfig: () => void;
}

const NavBarContext = createContext<NavBarContextType | undefined>(undefined);

const defaultConfig: NavBarConfig = {
  showBack: false,
};

export const NavBarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfigState] = useState<NavBarConfig>(defaultConfig);
  
  // Reset to default config on route change
  const setConfig = useCallback((newConfig: Partial<NavBarConfig>) => {
    setConfigState(prev => ({ ...prev, ...newConfig }));
  }, []);
  
  const resetConfig = useCallback(() => {
    setConfigState({ ...defaultConfig });
  }, []);
  
  return (
    <NavBarContext.Provider value={{ config, setConfig, resetConfig }}>
      {children}
    </NavBarContext.Provider>
  );
};

export const useNavBar = () => {
  const context = useContext(NavBarContext);
  if (!context) {
    throw new Error('useNavBar must be used within a NavBarProvider');
  }
  return context;
};