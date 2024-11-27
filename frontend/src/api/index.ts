import axios, { Method } from "axios";
import toast from "react-hot-toast";
import { getFromStorage } from "../hooks/use-user";

const api = axios.create({
  baseURL: "http://localhost:8888/api",
});

const handleError = (err: any, callbackLogout: () => void) => {
  const statusCode = err?.response?.status;

  if (statusCode === 401) {
    callbackLogout();
    toast.error(err?.response?.data?.message);
    return;
  }

  const message = err?.response?.data?.message || "Ocorreu um erro";
  toast.error(message);
};

type TCallApi = {
  method: Method;
  path: string;
  data?: any;
  params?: any;
};

function formatData(data: Object) {
  if (!data) return;

  return Object.entries(data).reduce((acc, [key, val]) => {
    if (typeof val === 'string') {
      val = val.trim();
    }

    acc[key] = val;

    return acc;
  }, {} as { [x: string]: any });
}

export async function callApi(callbackLogout: () => void, { data, method, params, path }: TCallApi) {
  const token = getFromStorage()?.token || '';

  try {
    const response = await api({
      method,
      data: formatData(data),
      params,
      url: path,
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    if (!response.data) {
      throw new Error("Data is empty");
    }

    return response?.data;
  } catch (error) {
    console.log({ error });
    handleError(error, callbackLogout);
  }
}
