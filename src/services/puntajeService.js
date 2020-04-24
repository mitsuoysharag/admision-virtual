import { fetchGet, fetchPost } from './fetch'

function obtenerRespuestas() {
  return fetchGet('obtenerRespuestas')
}

function ingresarRespuestas(respuestas) {
  return fetchPost('ingresarRespuestas', {
    respuestas
  })
}

export { obtenerRespuestas, ingresarRespuestas }