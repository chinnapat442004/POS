import type { Size } from '@/types/Size'
import http from './http'

function getSizes() {
  return http.get('/sizes')
}

export default { getSizes }
