"use client";
import React, { createContext, useState } from "react";

// createContext içinde tanımlanan türü kullanarak tüm bileşenlerde kullanın
interface UserData {
    tckn: string;
    name: string;
    address: any[];
    amount: number;
    cards: any[]; 
    selectedCard: string; 
    selectedRows: any[]
  };
  
  interface UserContextType {
    userData: UserData;
    setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  };
  
  const initialUserData : UserData ={
      tckn: "",
      name: "",
      address: [],
      amount: 0,
      cards: [], 
      selectedCard: "", 
      selectedRows: []
  };

  const UserContext = createContext<UserContextType>({
    userData: initialUserData,
    setUserData: () => {},
  });
  
  export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userData, setUserData] = useState<UserData>(initialUserData);
  
    return <UserContext.Provider value={{ userData, setUserData }}>{children}</UserContext.Provider>;
  };
  
  export default UserContext;