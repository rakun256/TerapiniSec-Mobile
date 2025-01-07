// HomeScrollContext.js
import React, { createContext, useContext, useState } from "react";

const HomeScrollContext = createContext();

export function useHomeScroll() {
  return useContext(HomeScrollContext);
}

export function HomeScrollProvider({ children }) {
  // Kaydedilecek dikey konumu tutan state
  const [homeScrollY, setHomeScrollY] = useState(0);

  return (
    <HomeScrollContext.Provider value={{ homeScrollY, setHomeScrollY }}>
      {children}
    </HomeScrollContext.Provider>
  );
}
