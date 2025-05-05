"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
} from "react";

interface JwtContextType {
  jwt: string;
  setJwt: Dispatch<string>;
}

const JwtContext = createContext({} as JwtContextType);

export const JwtProvider = ({ children }: { children: ReactNode }) => {
  const [jwt, setJwt] = useState<string>("");

  return (
    <JwtContext.Provider value={{ jwt, setJwt }}>
      {children}
    </JwtContext.Provider>
  );
};

export const useJwtContext = () => {
  const context = useContext(JwtContext);
  return context;
};
