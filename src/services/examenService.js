import { fetchGet } from './fetch'

function obtenerExamen() {
  return fetchGet('obtenerExamen')
}

function obtenerExamenDatos() {
  return fetchGet('obtenerExamenDatos')
}

export { obtenerExamen, obtenerExamenDatos }