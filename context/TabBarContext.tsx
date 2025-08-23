// app/context/TabBarContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { themes } from '@/constants/theme';
type TabOptions = {
  backgroundColor?: string
}
interface TabBarContextType {
    tabBarStyle?: TabOptions;
    setTabBarStyle? : any;
}
const TabBarContext = createContext<TabBarContextType>({});

export const useTabBar = () => useContext(TabBarContext);

export const TabBarProvider = ({ children }: {children: React.ReactNode}) => {
  // Default to a dark tab bar background for consistent appearance
  const [tabBarStyle, setTabBarStyle] = useState<TabOptions>({ backgroundColor: themes.colorBgDark });


  return (
    <TabBarContext.Provider value={{ tabBarStyle, setTabBarStyle }}>
      {children}
    </TabBarContext.Provider>
  );
};
