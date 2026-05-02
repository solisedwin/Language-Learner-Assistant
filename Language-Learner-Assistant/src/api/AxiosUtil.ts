import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";

const client = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Generic request function
export const request = async <T = any>(options: AxiosRequestConfig): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await client(options);
    if ("data" in response) {
      return response.data;
    }
    // TODO: Handle for endpoints that only return status codes
    throw new Error("No data to be returned");
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw new Error("Unexpected error");
  }
};

export default client;
