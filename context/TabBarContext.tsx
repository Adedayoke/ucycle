// app/context/TabBarContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
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
  const [tabBarStyle, setTabBarStyle] = useState<TabOptions>({});


  return (
    <TabBarContext.Provider value={{ tabBarStyle, setTabBarStyle }}>
      {children}
    </TabBarContext.Provider>
  );
};
