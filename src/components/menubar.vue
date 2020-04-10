<template>
    <header>
        <nav class="navbar navbar-dark bg-dark navbar-expand-lg">

            <!-- Business logo -->
            <div class="pulse-logo">
                <router-link class="navbar-brand" :to="{name: 'Dashboard'}">
                    <img class="d-inline-block align-top img-size30" src="@/assets/images/sawline_silver.png" alt="Sawline" />
                    Sawline
                </router-link>
            </div>

            <!-- Collapsed menu button -->
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!-- Main navbar content -->
            <div class="collapse navbar-collapse" id="navbarText">
    
                <!-- Left navbar items -->

                <ul v-if="authenticated" class="navbar-nav mr-auto"> 
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name: 'Dashboard'}">Dashboard</router-link> 
                    </li> 
                </ul>

                <ul v-if="authenticated" class="navbar-nav mr-auto"> 
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name: 'Verify'}">Verify</router-link> 
                    </li>
                </ul>                

                <!-- Authenticated links - Right navbar items -->  
                <ul v-if="authenticated" class="navbar-nav ml-auto">   
                    <li class="nav-item dropdown no-arrow">
                     
                        <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="mr-2">{{ user.name }}</span>
                            <img class="img-profile rounded-circle img-size30 d-none d-lg-inline-block" src="@/assets/images/profile.png">
                        </a>

                        <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                            <a @click.prevent="lockStation" class="dropdown-item" href="#" data-toggle="modal" onclick="event.preventDefault();">
                                <i class="fas fas fa-unlock-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                Lock Station
                            </a>                               
                            <a class="dropdown-item" href="#">
                                <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                Profile
                            </a>
                            <a class="dropdown-item" href="#">
                                <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                Settings
                            </a>
                            <a class="dropdown-item" href="#">
                                <i class="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                Activity Log
                            </a>
                            <div class="dropdown-divider"></div>
                            <a @click.prevent="logout" class="dropdown-item" href="#" data-toggle="modal" onclick="event.preventDefault();">
                                <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                Logout
                            </a>  
                        </div>
                    </li>
                </ul>

                <!-- Guest only links - Right navbar items -->
                <ul v-else class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name: 'Login'}">Login</router-link> 
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name: 'Register'}">Register</router-link> 
                    </li>  
                </ul>





            </div>

        </nav>
    </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/user',
        })
    },
    methods: ({
        ...mapActions({
            logoutAction: 'auth/logout'
        }),
        lockStation() {
            this.logoutAction().then(() => {
                this.$router.replace({
                    name: 'Lock'
                })
            })
        },
        logout() {
            this.logoutAction().then(() => {
                this.$router.replace({
                    name: 'Home'
                })
            })
            window.toast.fire({
                icon: "success",
                title: "You have been logged out"
            });            
        },
    })
}
</script>