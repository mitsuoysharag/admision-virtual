import { fetchPost } from './fetch'

function login(dni, codigo_inscripcion) {
  return fetchPost('login', {
    dni, codigo_inscripcion
  })
}

function loginAdmin(usuario, contraseña) {
  return fetchPost('loginAdmin', {
    usuario, contraseña
  })
}

export { login, loginAdmin }