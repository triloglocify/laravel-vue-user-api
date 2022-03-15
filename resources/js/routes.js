import Vue from 'vue';
import Auth from './Auth.js';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Login from './components/auth/login.vue';
import Register from './components/auth/register.vue';
import Dashboard from './components/dashboard';
import Users from './components/dashboard/users';
import UserCreate from './components/dashboard/users/create.vue';
import UserInfo from './components/dashboard/users/info.vue';

const routes = [
    {
        path: '/login',
        component: Login,
        name: "Login",
        meta: {
            hideForAuth: true
        }
    },
    {
        path: '/register',
        component: Register,
        name: "Register",
        meta: {
            hideForAuth: true
        }
    },
    {
        path: '/dashboard',
        component: Dashboard,
        name: "Dashboard",
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/users',
        component: Users,
        name: "Users",
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/users-create',
        component: UserCreate,
        name: "UserCreate",
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/users/:id/infor',
        component: UserInfo,
        name: "UserInfo",
        meta: {
            requiresAuth: true
        }
    }
];

 const router = new VueRouter({
     mode: 'history',
     routes: routes
 });

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth) ) {
        if (Auth.check()) {
            next();
            return;
        } else {
            router.push('/login');
        }
    } else {
        next();
    }

    if (to.matched.some(record => record.meta.hideForAuth)) {
        if (Auth.check()) {
            next({ path: '/dashboard' });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
