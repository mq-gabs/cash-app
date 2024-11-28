import { createContext, ReactNode, useContext, useState } from "react";
import { useUser } from "./use-user";
import axios, { Method } from "axios";
import toast from "react-hot-toast";

interface IApiProvider {
  children: ReactNode;
}

type TCallApi = {
  method: Method;
  path: string;
  data?: any;
  params?: any;
};

type TApiProvider = {
  callApi: (args: TCallApi) => Promise<any>;
  isLoading: boolean;
};

const ApiContext = createContext({} as TApiProvider);

const api = axios.create({
  baseURL: "http://localhost:8888/api",
});

function formatData(data: Object) {
  if (!data) return;

  return Object.entries(data).reduce((acc, [key, val]) => {
    if (typeof val === "string") {
      val = val.trim();
    }

    acc[key] = val;

    return acc;
  }, {} as { [x: string]: any });
}

export function ApiProvider({ children }: IApiProvider) {
  const { signOut, data: userData } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const handleError = (err: any) => {
    const statusCode = err?.response?.status;

    if (statusCode === 401) {
      signOut();
      toast.error(err?.response?.data?.message);
      return;
    }

    const message = err?.response?.data?.message || "Ocorreu um erro";
    toast.error(message);
  };

  const callApi = async ({ method, path, data, params }: TCallApi) => {
    setIsLoading(true);
    try {
      const response = await api({
        method,
        data: formatData(data),
        params,
        url: path,
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });

      if (!response.data) {
        throw new Error("Data is empty");
      }

      return response?.data;
    } catch (error) {
      console.log({ error });
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ApiContext.Provider
      value={{
        callApi,
        isLoading,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
}

export function useApi() {
  const apiContext = useContext(ApiContext);

  return apiContext;
}
