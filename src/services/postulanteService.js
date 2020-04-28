import { fetchGet } from './fetch'

function obtenerPerfil() {
  return fetchGet('obtenerPerfil')
}

function obtenerPostulantesRespuestas() {
  return fetchGet('obtenerPostulantesRespuestas')
}

export { obtenerPerfil, obtenerPostulantesRespuestas }