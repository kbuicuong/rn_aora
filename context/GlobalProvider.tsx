import { getCurrentUser } from "@/lib/appwrite";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Props = {
  children: JSX.Element[] | JSX.Element;
};

const defaultGlobalContext = {
	user: null,
  setUser: (user: any) => {},
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn: boolean) => {},
  isLoading: true,
  setIsLoading: (isLoading: boolean) => {},
};

const GlobalContext = createContext(defaultGlobalContext);

export const GlobalProvider = ({ children }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {

    getCurrentUser().then((res) => {
      if(res){
        setUser(res);
        setIsLoggedIn(true);
      }else{
        setUser(null);
        setIsLoggedIn(false);
      }
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      setIsLoading(false);
    });

  }, []);

  return (
    <GlobalContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn, isLoading, setIsLoading }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);