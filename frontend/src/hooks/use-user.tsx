import { createContext, useContext, useState } from "react";

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

function getFromStorage(tag: string) {
  return JSON.parse(localStorage.getItem(tag) || '{}');
}

function saveOnStorage(tag: string, data: Object) {
  localStorage.setItem(tag, JSON.stringify(data || {}));
}

const STORAGE_USER_KEY = "@cash-app:user-data"

function UserProvider({
  children
}: IUserProvider) {
  const [data, setData] = useState<TUserData>(getFromStorage(STORAGE_USER_KEY))

  const signIn = (data: TUserData) => {
    setData(data);
    saveOnStorage(STORAGE_USER_KEY, data);
  };

  const signOut = () => {
    setData({} as TUserData);
    saveOnStorage(STORAGE_USER_KEY, {});
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

function userUser() {
  const user = useContext(UserContext);

  return user;
}

export { userUser, UserProvider };