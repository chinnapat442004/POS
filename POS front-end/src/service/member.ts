import http from './http'

function getMembers() {
  return http.get('/members')
}

export default { getMembers }
