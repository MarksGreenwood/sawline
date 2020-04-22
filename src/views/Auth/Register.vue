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
                                <input id="organisation" name="organisation" type="text" class="form-control" placeholder="organisation name \ key" v-model="form.organisation" required autofocus>                         
                                <span class="invalid-feedback d-block" role="alert">
                                    {{ this.organisationErr }}
                                </span>
                                
                            </div>                            

                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text input-group-text-60"><i class="fa fa-user"></i></span>
                                </div>
                                <input id="name" name="name" type="text" class="form-control" placeholder="name" v-model="form.name" required>                         
                                <span class="invalid-feedback d-block" role="alert">
                                    {{ this.nameErr }}
                                </span>
                            </div>

                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text input-group-text-60"><i class="fa fa-envelope"></i></span>
                                </div>
                                <input id="email" name="email" type="email" class="form-control" placeholder="email" v-model="form.email" required>                          
                                <span class="invalid-feedback d-block" role="alert">
                                    {{ this.emailErr }}
                                </span>
                            </div>
                            
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text input-group-text-60"><i class="fa fa-lock"></i></span>
                                </div>          
                                <input id="password" name="password" type="password" class="form-control" placeholder="password" v-model="form.password" required>
                                <span class="invalid-feedback d-block" role="alert">
                                    {{ this.passwordErr }}
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
                organisation: '', 
                name: '',
                email: '',
                password: '',
                password_confirmation: '', 
            },
            organisationErr: '',
            emailErr: '',
            nameErr: '',
            passwordErr: '',
        }
    },
    methods: {
        ...mapActions({
            register: 'auth/register'
        }),
        submit() {
            this.register(this.form).then((response) => {

                if(this.isEmpty(response.errors))
                {
                    // Successful login
                    this.$router.replace({
                        name: 'Verification'
                    })

                    // Display all messages
                    this.processMessages(response.messages, 'success')
             
                }else{

                    // register errors
                    this.processMessages(response.errors, 'error')
                    this.processErrors(response.errors, 'error')
                }

            }).catch(() => {
                
                // Too many registration attempts
                window.toast.fire({
                    icon: "error",
                    title: 'Too many register attempts (6per minute only)'
                }); 
            })
        },
        isEmpty(obj){
            return Object.keys(obj).length===0
        },
        processMessages(object, type){

            var message = '';
            for (var key in object) {       
                if(key==0){
                    message += object[key]  
                }else{
                    message += '<br/>' + object[key] 
                }
            }
            window.toast.fire({
                icon: type,
                title: message
            });             

        },
        processErrors(object){
            var message = '';
            for (var key in object) {
                message = '';
                message += object[key] 
                this[key+'Err'] = message
            }
        },
    }
}

</script>
