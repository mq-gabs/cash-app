import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

type TUserData = {
  id: string;
  token: string;
  is_admin: boolean;
}

type TUserContext = {
  data: TUserData;
  signIn: (data: TUserData) => void;
  signOut: () => void;
};

const UserContext = createContext({} as TUserContext);

interface IUserProvider {
  children: React.ReactNode;
}

const STORAGE_USER_KEY = "@cash-app:user-data"

export function getFromStorage() {
  return JSON.parse(localStorage.getItem(STORAGE_USER_KEY) || '{}');
}

function saveOnStorage(data: Object) {
  localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(data || {}));
}


function UserProvider({
  children
}: IUserProvider) {
  const [data, setData] = useState<TUserData>(getFromStorage())

  const signIn = (data: TUserData) => {
    setData(data);
    saveOnStorage(data);
  };

  const signOut = () => {
    setData({} as TUserData);
    saveOnStorage({});
    window.history.replaceState(null, '', '/');
  }

  return (
    <UserContext.Provider value={{
      data,
      signIn,
      signOut,
    }}>
      {children}
    </UserContext.Provider>
  )
}

function useUser() {
  const user = useContext(UserContext);

  return user;
}

export { useUser, UserProvider };