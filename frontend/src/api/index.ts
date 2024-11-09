import axios, { Method } from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: "http://localhost:8888/api",
});

const handleError = (err: any) => {
  const message = err?.message || "Ocorreu um erro";
  toast.error(message);
};

type TCallApi = {
  method: Method;
  path: string;
  data?: any;
  params?: any;
};

export async function callApi({ data, method, params, path }: TCallApi) {
  try {
    const response = await api({
      method,
      data,
      params,
      url: path,
    });

    if (!response.data) {
      throw new Error("Data is empty");
    }

    return response?.data;
  } catch (error) {
    handleError(error);
  }
}
