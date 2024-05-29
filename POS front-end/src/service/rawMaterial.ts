import http from './http'

function getRawMaterial() {
  return http.get('/raw-materials')
}

export default { getRawMaterial }
