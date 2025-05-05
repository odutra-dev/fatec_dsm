"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface JwtContextType {
  jwt: string;
  setJwt: (jwt: string) => void;
}

const JwtContext = createContext<JwtContextType | undefined>(undefined);

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
  if (!context) {
    throw new Error("useJwtContext must be used within a JwtProvider");
  }
  return context;
};
