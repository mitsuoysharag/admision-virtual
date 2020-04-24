import store from '../store'

function setSession(token) {
  localStorage.setItem('token', token);
  store.commit("setSession", getSession());
}

function getSession() {
  return {
    token: localStorage.getItem('token')
  };
}

function removeSession() {
  localStorage.removeItem('token')
  store.commit("setSession", null);
}

function sessionExists() {
  let { token } = getSession()
  return token
}

export { setSession, getSession, removeSession, sessionExists }