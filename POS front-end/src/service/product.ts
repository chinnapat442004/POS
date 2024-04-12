import http from './http'

function getProduct() {
  return http.get('/products')
}

export default { getProduct }
