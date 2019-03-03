// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.

export default [{
    path: '/',
    name: 'home',
    component: () => import('./../views/Home.vue')
  },
  {
    path: '/drive/u/:adapter/:path/:dir?',
    name: 'my-drive',
    component: () => import('./../views/myDrive.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./../views/Login.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('./../views/Auth.vue'),
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('./../views/Signup.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('./../views/Test.vue')
  },
  {
    path: '/drive/open',
    name: 'open',
    component: () => import('./../views/Open.vue')
  },
  {
    path: "/PageNotFound",
    name: 'PageNotFound',
    component: () => import('./../views/PageNotFound.vue'),
  },
  {
    path: "*",
    name: 'PageNotFound',
    component: () => import('./../views/PageNotFound.vue'),
  }
]
