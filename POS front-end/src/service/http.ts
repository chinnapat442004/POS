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

export default instance
