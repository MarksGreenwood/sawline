<template>

<!-- Sidebar -->
    <div  v-show="this.authenticated" class="sidebar">
        <ul>
            <li><router-link class="nav-link" :to="{name: 'Dashboard'}"><i class="fas fa-fw fa-tachometer-alt"></i><span class="sidebarSpan" title="Dashboard">Dashboard</span></router-link></li>
            <li><router-link class="nav-link" :to="{name: 'Organisation'}"><i class="fas fa-fw fa-sitemap"></i><span class="sidebarSpan" title="Dashboard">Organisations</span></router-link></li>

      
        </ul>
    </div>

<!-- End of Sidebar --> 
</template> 

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/user',
        })
    },    
}
</script>