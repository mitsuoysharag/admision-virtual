import { fetchPost } from './fetch'

function login(dni, inscripcion) {
  return fetchPost('login', {
    dni, inscripcion
  })
}

export { login }