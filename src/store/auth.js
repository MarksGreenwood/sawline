import axios from 'axios';

export default {
    namespaced: true,
    state: {
        token: null,
        authenticated: false,
        user: [],
        verified: '0',
        activeOrganisation: 0,
    },
    getters:{
        token(state) {
            return state.token && state.user
        },
        user(state) {
            return state.user
        },
        verified(state) {
            return state.verified
        },
        activeOrganisation(state) {
            return state.activeOrganisation
        },     
        authenticated(state) {
            return state.authenticated  
        },  
    },
    mutations: {
        SET_TOKEN (state, token) {
            state.token = token
        },
        SET_AUTHENTICATED (state, authenticated) {
            state.authenticated = authenticated
        },
        SET_USER (state, data) {
            state.user = data
        },
        SET_VERIFIED (state, data){
            state.verified = data
        },
        SET_ACTIVEORGANISATION (state, data){
            state.activeOrganisation = data
        },
    },
    actions: {
        async register({ dispatch }, registration) {
            let response = await axios.post('auth/register/sawline', registration)

            if(response.data.messages.length==0){
                return response.data
            }else if(response.data.errors.length==0){
                dispatch('attempt', response.data.token)
                return response.data
            }
        }, 
        async verification({ dispatch }, verified) {
            let response = await axios.post('auth/verification/sawline', verified)

            if(response.data.messages.length==0){
                return response.data
            }else{
                dispatch('attempt', response.data.token)
                return response.data
            }
        },
        async login({ dispatch }, credentials) {
            let response = await axios.post('auth/login/sawline', credentials)

            if(response.data.messages.length==0){
                return response.data
            }else if(response.data.errors.length==0){
                dispatch('attempt', response.data.token)
                return response.data
            }
        },
        async resetPassword({ dispatch }, resetPassword) {
            let response = await axios.post('auth/passwordreset/sawline', resetPassword)

            if(response.data.messages.length==0){
                return response.data
            }else if(response.data.errors.length==0){
                dispatch('attempt', response.data.token)
                return response.data
            }
        },           
        async attempt ({ commit, state }, token) {
            if(token) {
                commit('SET_TOKEN', token)
                commit('SET_AUTHENTICATED', true)
            }
            if(!state.token){
                return
            }
 
            try {
                 let response = await axios.post('auth/currentuser/sawline')
                 commit('SET_USER', response.data)
                 commit('SET_VERIFIED', response.data.email_verified_at)
                 commit('SET_ACTIVEORGANISATION', response.data.activeOrganisation)
            }catch(e){
                commit('SET_TOKEN', null)
                commit('SET_AUTHENTICATED', false)
                commit('SET_USER', null)
                commit('SET_VERIFIED', null)
                commit('SET_ACTIVEORGANISATION', null)
            }
        },
        logout({ commit }) {

            // Log the user ou and destroy token
            return axios.post('auth/logout/sawline').then(() => {
                commit('SET_TOKEN', null)
                commit('SET_AUTHENTICATED', false)
                commit('SET_USER', [])
                commit('SET_VERIFIED', null)
                commit('SET_ACTIVEORGANISATION', null)
            })


        },
        setActiveOrganisation({ commit }, $value) {
            commit('SET_ACTIVEORGANISATION', $value)
        }

    },
}
