<template>
    <div id="app" class="d-flex flex-column h-100 sidebar-nontoggled">
        <menubar/>
        <div class="container-fluid p-0">
            <sidebar/>
            <topbar/>
        </div>
        <router-view/>
        <pagefooter/>  
    </div>
</template>

<script>
import menubar from '@/components/menubar';
import pagefooter from '@/components/pagefooter';
import sidebar from '@/components/sidebar'
import topbar from '@/components/topbar'

export default {
    components:{
        menubar, 
        pagefooter,
        sidebar,
        topbar
    }
}
</script>