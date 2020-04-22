<template>

<!-- Topbar -->
    <nav  v-show="authenticated" class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

        <input type="checkbox" id="checkSidebar">
            <label for="checkSidebar">
                <i class="fas fa-chevron-circle-right" id="btn_sidebarShow" @click="btn_sidebarShow"></i>
                <i class="fas fa-chevron-circle-left" id="btn_sidebarHide" @click="btn_sidebarHide"></i>
            </label>

        <!-- Topbar Search -->
        <div class="d-none d-sm-inline-block form-inline mr-auto my-0 my-md-0 mw-100 navbar-search">
            <div class="input-group">
                <input v-model="search" @keyup="searchData" class="form-control bg-light border-0 small" aria-describedby="basic-addon2" aria-label="Search" type="text" placeholder="Search for...">
                <div class="input-group-append">
                    <button @click="searchData" class="btn btn-primary" type="button">
                        <i class="fas fa-search fa-sm"></i>
                    </button>
                </div>
            </div>
        </div>

        <!-- Topbar Navbar -->
        <ul class="navbar-nav ml-auto">

            <!-- Nav Item - Search Dropdown (Visible Only XS) -->
            <li class="nav-item dropdown no-arrow d-sm-none">
                <a class="nav-link dropdown-toggle" id="searchDropdown" role="button" aria-expanded="false" aria-haspopup="true" href="#" data-toggle="dropdown">
                <i class="fas fa-search fa-fw"></i>
                </a>
                <!-- Dropdown - Messages -->
                <div class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                    <div class="form-inline mr-auto w-100 navbar-search">
                        <div class="input-group">
                        <input v-model="search" @keyup="searchData;" class="form-control bg-light border-0 small" aria-describedby="basic-addon2" aria-label="Search" type="text" placeholder="Search for...">
                            <div class="input-group-append">
                                <button @click="searchData;" class="btn btn-primary" type="button">
                                <i class="fas fa-search fa-sm"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </li>

            <div class="topbar-divider d-none d-sm-block"></div>

            <li class="pt-2" >
                <a href="#" class="full-screen" @click="fullScreenWeb"><i class="fas fa-expand"></i></a>
            </li>

        </ul>   

    </nav>
<!-- End of Topbar --> 

</template>

<script>
import $ from 'jquery'
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
            search: '',
        }
    },    
    mounted: function() {
        this.onWindowLoad()    
    },
    methods: {
        searchData() {},  
        onWindowLoad(){
            this.adjustSidebarClass();

            if($('.sidebar').hasClass('smallSidebar')==false){
                this.largeSideBar_Collapsed()
            }else{
                this.smallSideBar_Collapsed()
            }        

            this.$nextTick(() => {
                window.addEventListener('resize', this.onWindowResize);
            });  

        },
        onWindowResize(){
            this.adjustSidebarClass();

            if($('.sidebar').hasClass('smallSidebar')==false){
                this.largeSideBar_Collapsed()
            }else{
                this.smallSideBar_Collapsed()
            }             
        },
        adjustSidebarClass(){      
            if($(window).width()<=992 && $('.sidebar').hasClass('smallSidebar')==false){
                $('.sidebar').addClass('smallSidebar')
            }else if($(window).width()>=993 && $('.sidebar').hasClass('smallSidebar')==true){
                $('.sidebar').removeClass('smallSidebar')
            }
        },
        largeSideBar_Collapsed(){
            $(".topbar").css({marginLeft: 70});
            $(".main-container").css({marginLeft: 70});
            $(".sidebar").css({width: 70});
            $(".sidebar").css({left: 0});
            $("#btn_sidebarShow").show()
            $("#btn_sidebarHide").hide()
            $(".sidebarSpan").css('display', 'none')
        },
        smallSideBar_Collapsed(){
            $(".topbar").css({marginLeft: 20});
            $(".main-container").css({marginLeft: 20});
            $(".sidebar").css({width: 70});
            $(".sidebar").css({left: -50});
            $("#btn_sidebarShow").show()
            $("#btn_sidebarHide").hide()
            $(".sidebarSpan").css('display', 'none')
        },
        largeSideBar_Expanded(){
            $(".topbar").css({marginLeft: 250});
            $(".main-container").css({marginLeft: 250});
            $(".sidebar").css({width: 250});
            $(".sidebar").css({left: 0});
            $("#btn_sidebarShow").hide();
            $("#btn_sidebarHide").show();   
            $(".sidebarSpan").css('display', 'inline-block')
        },
        smallSideBar_Expanded(){
            $(".topbar").css({marginLeft: 70});
            $(".main-container").css({marginLeft: 70});
            $(".sidebar").css({width: 70});
            $(".sidebar").css({left: 0});
            $("#btn_sidebarShow").hide()
            $("#btn_sidebarHide").show()
            $(".sidebarSpan").css('display', 'none')
        },
        btn_sidebarHide() {
            $("#btn_sidebarShow").show();
            $("#btn_sidebarHide").hide();

            if($('.sidebar').hasClass('smallSidebar')==false){
                this.largeSideBar_Collapsed()
            }else{
                this.smallSideBar_Collapsed()
            }
        },
        btn_sidebarShow() {
            $("#btn_sidebarShow").hide();
            $("#btn_sidebarHide").show();

            if($('.sidebar').hasClass('smallSidebar')==false){
                this.largeSideBar_Expanded()
            }else{
                this.smallSideBar_Expanded()
            }
        },    
        fullScreenWeb() {
        if (!document.fullscreenElement && // alternative standard method
            !document.mozFullScreenElement && !document.webkitFullscreenElement) { // current working methods
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
                } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }

        $('.full-screen > i').toggleClass('fa-expand');
        $('.full-screen > i').toggleClass('fa-compress');

    
        }, 
    }
}
</script>