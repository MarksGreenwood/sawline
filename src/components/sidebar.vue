<template>

<!-- Sidebar -->
    <div  v-if="authenticated" class="sidebar">
        <ul>
            <li><a href="#" title="Dashboard"><i class="fas fa-fw fa-tachometer-alt"></i><span class="sidebarSpan" title="Dashboard">Dashboard</span></a></li>
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
    data() {
        return {
        }
    },    
    mounted() {
    },
    methods: {

    }
}
</script>