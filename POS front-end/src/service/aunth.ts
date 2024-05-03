import http from './http'

function auth(email: string, password: string) {
  return http.post(`/auth/login`, { email, password })
}

export default { auth }
