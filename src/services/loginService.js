import { fetchPost } from './fetch'

function login(dni, inscripcion) {
  return fetchPost('login', {
    dni, inscripcion
  })
}

function loginAdmin(usuario, contraseña) {
  return fetchPost('loginAdmin', {
    usuario, contraseña
  })
}

export { login, loginAdmin }