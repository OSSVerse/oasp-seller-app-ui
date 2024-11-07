import Axios, {
  type AxiosRequestHeaders,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import { API_BASE_URL } from "./env";
import storage from "@/lib/storage-helper";
import { AUTH_STORAGE_TOKEN } from "@/lib/constant";

const axiosInstance = Axios.create({
  baseURL: API_BASE_URL,
});
console.log(API_BASE_URL);
axiosInstance.interceptors.request.use(
  (config) => {
    const token = storage.getItem(AUTH_STORAGE_TOKEN) ?? sessionStorage.getItem(AUTH_STORAGE_TOKEN);
    if (token) {
      config.headers = {
        ...config.headers,
        "access-token": `Bearer ${token}`,
      } as unknown as AxiosRequestHeaders;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

let isRefreshing = false;
let failedQueue: {
  resolve: (value: AxiosResponse) => void;
  reject: (error: unknown) => void;
  config: AxiosRequestConfig;
}[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  for (const prom of failedQueue) {
    if (error) {
      prom.reject(error);
    } else if (token) {
      if (prom.config.headers) {
        prom.config.headers.Authorization = `Bearer ${token}`;
      } else {
        prom.config.headers = { Authorization: `Bearer ${token}` };
      }
      axiosInstance(prom.config).then(prom.resolve).catch(prom.reject);
    }
  }
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      originalRequest.url?.includes("/accounts/refresh") &&
      error.response.status === 401
    ) {
      //TODO: Logout the user
      return Promise.reject(error);
    }
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      isRefreshing = true;

      try {
        //TODO: Refresh the token
        //after success
        processQueue(null, "New Access Token");
        console.log("Refreshing token");
      } catch (err) {
        console.log(err);
        //TODO: Logout the user
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export const httpService = {
  get: <T>(url: string, config?: AxiosRequestConfig<unknown>) =>
    axiosInstance
      .get<T>(url, {
        ...config,
      })
      .then((response) => response.data),
  post: <T>(url: string, data: unknown, config?: AxiosRequestConfig<unknown>) =>
    axiosInstance
      .post<T>(url, data, {
        ...config,
      })
      .then((response) => response.data),

  put: <T>(url: string, data: unknown, config?: AxiosRequestConfig<unknown>) =>
    axiosInstance
      .put<T>(url, data, {
        ...config,
      })
      .then((response) => response.data),

  patch: <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig<unknown>,
  ) =>
    axiosInstance
      .patch<T>(url, data, {
        ...config,
      })
      .then((response) => response.data),

  delete: <T>(url: string, config?: AxiosRequestConfig<unknown>) =>
    axiosInstance
      .delete<T>(url, {
        ...config,
      })
      .then((response) => response.data),
};
