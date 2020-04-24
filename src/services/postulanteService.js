import { fetchGet } from './fetch'

function obtenerPerfil() {
  return fetchGet('obtenerPerfil')
}

export { obtenerPerfil }