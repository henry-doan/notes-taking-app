import axios from 'axios';
import apiURL from "./apiURL";

var instance = axios.create({
  baseURL: apiURL
})

instance.interceptors.request.use(
  async function(config) {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      config.headers.Authorization = jwt
    }
    return config
  },
  function (err) {
    return Promise.reject(err)
  }
)

instance.interceptors.request.use(
  async function(res) {
    if (res.headers.jwt) {
      localStorage.setItem("jwt", response.headers.jwt)
    }
    return response;
  }, 
  function(err) {
    return Promise.reject(err)
  }
)

export default instance;