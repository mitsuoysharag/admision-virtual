import { fetchPost } from './fetch'

function login(dni, codigo) {
  return fetchPost('login', {
    dni, codigo
  })
}

function loginAdmin(usuario, contraseña) {
  return fetchPost('loginAdmin', {
    usuario, contraseña
  })
}

export { login, loginAdmin }