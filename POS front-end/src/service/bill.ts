import http from './http'

function getBills() {
  return http.get('/bills')
}

export default { getBills }
