import { createContext, ReactNode, useContext, useState } from "react";

type TGlobalsContext = {
  globals: { [x: string]: any };
  setGlobal: (key: string, value: any) => void;
};

const GlobalsContext = createContext<TGlobalsContext>({} as TGlobalsContext);

export function GlobalsProvider({ children }: { children: ReactNode }) {
  const [globals, setGlobals] = useState({} as { [x: string]: any });

  const setGlobal = (key: string, value: any) => {
    setGlobals((prev) => {
      prev[key] = value;

      return prev;
    });
  };

  return (
    <GlobalsContext.Provider
      value={{
        globals,
        setGlobal,
      }}
    >
      {children}
    </GlobalsContext.Provider>
  );
}

export function useGlobals() {
  const context = useContext(GlobalsContext);

  return context;
}
