import { fetchGet } from './fetch'
import store from '../store'

function verifyToken() {
  return fetchGet('verifyToken')
}

function setSession(token, type) {
  localStorage.setItem('token', token);
  localStorage.setItem('type', type);
  store.commit("setSession", getSession());
}

function getSession() {
  return {
    token: localStorage.getItem('token'),
    type: localStorage.getItem('type')
  };
}

function removeSession() {
  localStorage.removeItem('token')
  localStorage.removeItem('type')
  store.commit("setSession", null);
}

function sessionExists() {
  let { token, type } = getSession()
  return token && type
}

export { verifyToken, setSession, getSession, removeSession, sessionExists }