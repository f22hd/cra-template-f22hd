import axios from "axios";
import keycloak from "./keycloak.config";

// Set config defaults when creating the instance
const axiosObject = axios.create();

axiosObject.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    if (keycloak?.token) {
      await keycloak.updateToken(5);
      config = {
        ...config,
        headers: {
          authorization: `Bearer ${keycloak?.token}`,
        },
      };
    }
    return config;
  },
  function (error) {
    // Do something with request error
    // eslint-disable-next-line no-console
    console.error("error: interceptors", error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosObject.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosObject;
