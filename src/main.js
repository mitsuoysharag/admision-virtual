import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import './styles/main.scss'

Vue.component('m-alert', () => import('./components/Alert'))
Vue.component('m-dialog', () => import('./components/Dialog'))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
