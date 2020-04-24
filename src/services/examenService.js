import { fetchGet, fetchPost } from './fetch'

function obtenerExamenAdmin() {
  return fetchGet('obtenerExamenAdmin')
}

function obtenerExamen() {
  return fetchGet('obtenerExamen')
}

function obtenerExamenDatos() {
  return fetchGet('obtenerExamenDatos')
}

function guardarExamenAdmin(examen) {
  return fetchPost('guardarExamenAdmin', {
    examen
  })
}

export { obtenerExamenAdmin, obtenerExamen, obtenerExamenDatos, guardarExamenAdmin }