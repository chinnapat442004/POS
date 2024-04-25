import http from './http'

function getEmployees() {
  return http.get('/employees')
}

export default { getEmployees }
