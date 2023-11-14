"use client";
import React, { useState, createContext, useContext, useEffect } from "react";
import { usePathname } from "next/navigation";

const ActivePageContext = createContext(null);

function ActivePageContextProvider({ children }) {
  const [activePage, setActivePage] = useState("Watch");
  const [timeOfLastClick, setTimeOfLastClick] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/listen") {
      setActivePage("Listen");
    } else if (pathname === "/play") {
      setActivePage("Play");
    } else {
      setActivePage("Watch");
    }
  }, [pathname]);

  return (
    <ActivePageContext.Provider
      value={{
        activePage,
        setActivePage,
        timeOfLastClick,
        setTimeOfLastClick,
      }}
    >
      {children}
    </ActivePageContext.Provider>
  );
}

function useActivePageContext() {
  const context = useContext(ActivePageContext);

  if (context === null) {
    throw new Error("");
  }

  return context;
}

export { ActivePageContext, ActivePageContextProvider, useActivePageContext };
