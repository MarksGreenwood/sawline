import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '@/views/Public/Index.vue'

import Home from '@/views/Home.vue'
import Dashboard from '@/views/Dashboard.vue'

import Login from '@/views/Auth/Login.vue'
import Register from '@/views/Auth/Register.vue'
import Lock from '@/views/Auth/Lock.vue'
import Verification from '@/views/Auth/Verification.vue'
import PasswordReset from '@/views/Auth/PasswordReset.vue'

import store from '@/store'
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Index',
        component: Index,
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        beforeEnter: (to, from, next) =>{
            if(!store.getters['auth/authenticated']){
                return next({
                    name: 'Login'
                })
            }

            next()
        }
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        //meta: {
            //middleware: [auth]
        //}

    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }, 
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/lock',
        name: 'Lock',
        component: Lock
    },  
    {
        path: '/verification',
        name: 'Verification',
        component: Verification,
    }, 
    {
        path: '/passwordreset',
        name: 'PasswordReset',
        component: PasswordReset,
    },          
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
