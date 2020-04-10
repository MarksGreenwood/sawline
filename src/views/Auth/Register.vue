<template>
<main role="main" class="inner cover p-0 h-100">
    <div class="container mt-5">
        <div class="row justify-content-center align-items-center">
            <div class="col-lg-4">
                <div class="card">
                    <div class="card-header">Register</div>

                    <div class="card-body text-center mt-3 pt-3 mb-0 pb-0">
                        <h3><img class="d-inline-block align-top img-size40" src="@/assets/images/sawline_black.png" alt="Sawline" />
                        Sawline</h3>
                    </div>

                    <div class="card-body text-center">
                        <form @submit.prevent="submit">

                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text input-group-text-60"><i class="fas fa-id-card"></i></span>
                                </div>
                                <input id="companyKey" name="companyKey" type="text" class="form-control" placeholder="organisation name \ key" v-model="form.organisation" required autofocus>                         
                                <span class="invalid-feedback d-block" role="alert">
                                    {{ this.errOrganisation }}
                                </span>
                                
                            </div>                            

                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text input-group-text-60"><i class="fa fa-user"></i></span>
                                </div>
                                <input id="name" name="name" type="text" class="form-control" placeholder="name" v-model="form.name" required>                         
                                <span class="invalid-feedback d-block" role="alert">
                                    {{ this.errName }}
                                </span>
                            </div>

                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text input-group-text-60"><i class="fa fa-envelope"></i></span>
                                </div>
                                <input id="email" name="email" type="email" class="form-control" placeholder="email" v-model="form.email" required>                          
                                <span class="invalid-feedback d-block" role="alert">
                                    {{ this.errEmail }}
                                </span>
                            </div>
                            

                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text input-group-text-60"><i class="fa fa-lock"></i></span>
                                </div>          
                                <input id="password" name="password" type="password" class="form-control" placeholder="password" v-model="form.password" required>
                                <span class="invalid-feedback d-block" role="alert">
                                    {{ this.errPassword }}
                                </span>
                            </div>

                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text input-group-text-60"><i class="fa fa-clone"></i></span>
                                </div>          
                                <input id="password-confirm" name="password_confirmation" type="password" class="form-control" placeholder="confirm password" v-model="form.password_confirmation" required>
                            </div>   

                            <div class="input-group mb-3">
                                <button type="submit" class="btn btn-success btn-block">
                                    Register
                                </button>
                            </div>

                            <p class="mb-0 text-muted">Already have an account? <router-link class="nav-link" :to="{name: 'Login'}">Login</router-link> </p>

                        </form>
                    </div>

                </div>
            </div>
        </div>
    </div>
</main>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'Register',
    components: {
    },
    data() {
        return {
            form: {
                organisation: 'Dowell Windows LTD', 
                name: 'Mark Greenwood',
                email: 'mark.greenwood@dowell.com.au',
                password: 'password',
                password_confirmation: 'password', 
            },
            errOrganisation: '',
            errEmail: '',
            errName: '',
            errPassword: '',
        }
    },
    methods: {
        ...mapActions({
            register: 'auth/register'
        }),
        submit() {
            this.register(this.form).then(() => {
                this.$router.replace({
                    name: 'Verify'
                })
                window.toast.fire({
                    icon: "success",
                    title: 'Registration submitted.'
                }); 
            }).catch((e) => {
                if(e.response.data.errors.organisation){this.errOrganisation = this.processErrors(e.response.data.errors.organisation)}else{this.errOrganisation=''}
                if(e.response.data.errors.name){this.errName = this.processErrors(e.response.data.errors.name)}else{this.errName=''}
                if(e.response.data.errors.email){this.errEmail = this.processErrors(e.response.data.errors.email)}else{this.errEmail=''}
                if(e.response.data.errors.password){this.errPassword = this.processErrors(e.response.data.errors.password)}else{this.errPassword=''}
                window.toast.fire({
                    icon: "error",
                    title: 'Failed to register new user.'
                });                
            })
        },
        processErrors($array) {

            var $return = '';
            var i;
            
            for (i = 0; i < $array.length; i++) {
                $return += $array[i]  
            }     

            return $return;

        },
    }
}

</script>
