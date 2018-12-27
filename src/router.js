import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/drive/u/:adapter/my-drive',
            name: 'my-drive',
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
        },
        {
            path: '/signup',
            name: 'signup',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/Signup.vue')
        },
        {
            path: '/test',
            name: 'test',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/Test.vue')
        }
    ]
})


router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login', '/signup'];
    const authRequired = !publicPages.includes(to.path);
    localStorage.setItem('user', 1);
    const loggedIn = localStorage.getItem('user');

    if (authRequired && !loggedIn) {
      return next('/login');
    }

    next();
})


export default router;
