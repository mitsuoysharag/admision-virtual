import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
// import { verifyToken } from '@/services/session'
import { getSession } from '@/services/session'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/panel',
    name: 'panel',
    component: () => import('../views/Panel.vue'),
    meta: { requiresStudent: true }
  },
  {
    path: '/examen',
    name: 'examen',
    component: () => import('../views/Exam.vue'),
    meta: { requiresStudent: true }
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/Admin.vue'),
    meta: { requiresAdmin: true }
  },
  {
    path: '/login-admin',
    name: 'login-admin',
    component: () => import('../views/LoginAdmin.vue')
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAdmin)) {
    let session = getSession()
    if (session.type == 0)
      next()
    else
      next({
        path: '/login-admin'
      })
  } else if (to.matched.some(record => record.meta.requiresStudent)) {
    let session = getSession()
    if (session.type == 1)
      next()
    else
      next({
        path: '/'
      })
  } else
    next()
})

export default router
