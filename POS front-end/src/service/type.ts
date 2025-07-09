import http from './http'

function getTyeps() {
  return http.get('/types')
}

export default { getTyeps }
