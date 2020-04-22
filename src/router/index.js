import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        name: 'Index',
        component: () => import('@/views/Public/Index.vue')
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: { requiresAuth: true, requiresNoAuth: false, isVerified: false, CurrentOrganisation: false }
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
        meta: { requiresAuth: true, requiresNoAuth: false, isVerified: true, CurrentOrganisation: true }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Auth/Login.vue'),
        meta: { requiresAuth: false, requiresNoAuth: true, isVerified: false, CurrentOrganisation: false }
    }, 
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/Auth/Register.vue'),
        meta: { requiresAuth: false, requiresNoAuth: true, isVerified: false, CurrentOrganisation: false }
    },
    {
        path: '/lock',
        name: 'Lock',
        component: () => import('@/views/Auth/Lock.vue'),
        meta: { requiresAuth: true, requiresNoAuth: false, isVerified: false, CurrentOrganisation: false }
    },  
    {
        path: '/verification',
        name: 'Verification',
        component: () => import('@/views/Auth/Verification.vue'),
        meta: { requiresAuth: true, requiresNoAuth: false, isVerified: false, CurrentOrganisation: false }
    }, 
    {
        path: '/passwordreset',
        name: 'PasswordReset',
        component: () => import('@/views/Auth/PasswordReset.vue'),
         
    },   
    {
        path: '/organisation',
        name: 'Organisation',
        component: () => import('@/views/Organisation.vue'),
        meta: { requiresAuth: true, requiresNoAuth: false, isVerified: true, CurrentOrganisation: false }
    },              
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
 
router.beforeEach((to, from, next) => {
 
    // User is autherised --requiresAuth
    if (to.matched.some(record => record.meta.requiresAuth)) {

        if(store.getters['auth/authenticated']==false){
            return next({
                name: 'Login'
            })
        }else{
            next();
        }
    }else{
        next();
    }

    // User email is verified --isVerified
    if (to.matched.some(record => record.meta.isVerified)) {

        if(!store.getters['auth/verified']){
            return next({
                name: 'Verification'
            })
        }else{
            next();
        }
    }else{
        next();
    } 

    // User is not autherised --requiresNoAuth
    if (to.matched.some(record => record.meta.requiresNoAuth)) {

        if(store.getters['auth/authenticated']==true){
            return next({
                name: 'Dashboard'
            })
        }else{
            next();
        }
    }else{
        next();
    }

    // User has default organisation
    if (to.matched.some(record => record.meta.CurrentOrganisation)) {

        if(store.getters['auth/activeOrganisation']==0){
            return next({
                name: 'Organisation'
            })
        }else{
            next();
        }
    }else{
        next();
    }

  })


export default router

 
     