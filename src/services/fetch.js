import { getSession } from './session'

const service = 'http://localhost:5000'
// const service = 'https://admision-virtual-service.herokuapp.com'

function getHeaders() {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getSession().token}`
  }
}

function fetchGet(name) {
  let headers = getHeaders()
  return fetch(`${service}/${name}`, { headers })
    .then(response => response.json())
}

function fetchPost(name, data) {
  let headers = getHeaders()
  return fetch(`${service}/${name}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers
  })
    .then(response => response.json())
}

export { fetchGet, fetchPost }