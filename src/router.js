import Vue from 'vue'
import Router from 'vue-router'
import myDrive from './views/myDrive.vue'
import {
  api
} from "./app/Api";

Vue.use(Router)

const router = new Router({
  base: process.env.BASE_URL,
  mode: process.env.NODE_ENV == 'production' ? 'history' : 'hash',
  routes: [{
      path: '/',
      name: 'home',
      component: () => import( /* webpackChunkName: "about" */ './views/Home.vue')
    },
    {
      path: '/drive/u/:adapter/:path/:dir?',
      name: 'my-drive',
      component: myDrive,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/Login.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/signup',
      name: 'signup',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/Signup.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/test',
      name: 'test',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/Test.vue')
    },
    {
      path: "*",
      name: 'PageNotFound',
      component: () => import( /* webpackChunkName: "about" */ './views/PageNotFound.vue'),
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const loggedIn = api.auth.loggedIn();

    if (!loggedIn) {
      if (to.name != 'login' && to.name != 'signup') {
        next({
          path: '/login',
          query: {
            redirect: to.fullPath
          }
        })
      } else {
        next()
      }
    } else if (to.name == 'login' || to.name == 'signup') {
      next({
        path: '/',
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router;
