import axios from "axios"
import config from "../config"
import Cookies from "universal-cookie"

const cookies = new Cookies()
const baseURL = config.baseURL
const cookieName = config.cookieName

const httpRequest = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  }
})

httpRequest.interceptors.request.use(
  async (config) => {
    const token = cookies.get(cookieName)
    if (token) {
      config.headers["Authorization"] =  `Bearer ${token}`
    }
    return config
  }
)

export default httpRequest
