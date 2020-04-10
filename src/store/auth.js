import axios from 'axios';

export default {
    namespaced: true,
    state: {
        token: null,
        user: null,
        verified: null,
        activeOrganisation: null,
    },
    getters:{
        authenticated(state) {
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
        }        
        
    },
    mutations: {
        SET_TOKEN (state, token) {
            state.token = token
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

            return dispatch('attempt', response.data.token)
        }, 
        async login({ dispatch }, credentials) {
            let response = await axios.post('auth/login', credentials)
            return dispatch('attempt', response.data.token)
        },
        async verification({ dispatch }, verified) {
            let response = await axios.post('auth/verification', verified)
            return dispatch('attempt', response.data.token)
        },        
        async attempt ({ commit, state }, token) {
            if(token) {
                commit('SET_TOKEN', token)
            }
            if(!state.token){
                return
            }
 
            try {
                 let response = await axios.post('auth/currentuser')
                 commit('SET_USER', response.data)
                 commit('SET_VERIFIED', response.data.email_verified_at)
                 commit('SET_ACTIVEORGANISATION', response.data.activeOrganisation)
            }catch(e){
                commit('SET_TOKEN', null)
                commit('SET_USER', null)
                commit('SET_VERIFIED', null)
                commit('SET_ACTIVEORGANISATION', null)
            }
        },
        logout({ commit }) {
            return axios.post('auth/logout').then(() => {
                commit('SET_TOKEN', null)
                commit('SET_USER', null)
                commit('SET_VERIFIED', null)
                commit('SET_ACTIVEORGANISATION', null)
            })
        }

    },
}
