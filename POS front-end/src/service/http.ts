import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000'
})

instance.interceptors.request.use(
  async function (config) {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

function delay(sec: number) {
  return new Promise((resolve) => setTimeout(() => resolve(sec), sec * 300))
}

instance.interceptors.request.use(
  async function (sec) {
    await delay(1)

    return sec
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default instance
