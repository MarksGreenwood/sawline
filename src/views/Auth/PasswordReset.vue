<template>
<main role="main" class="inner cover p-0 h-100">
    <div class="container mt-5">
        <div class="row justify-content-center align-items-center">
            <div class="col-lg-4">
                <div class="card">
                    <div class="card-header">Password Reset</div>

                    <div class="card-body text-center mt-3 pt-3 mb-0 pb-0">
                        <h3><img class="d-inline-block align-top img-size40" src="@/assets/images/sawline_black.png" alt="Sawline" />
                        Sawline</h3>
                    </div>

                    <div class="card-body text-center">
                        <form @submit.prevent="submit">                        

                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text input-group-text-60"><i class="fa fa-envelope"></i></span>
                                </div>
                                <input id="email" name="email" type="email" class="form-control" placeholder="email" v-model="form.email" required>                          
                                <span class="invalid-feedback d-block" role="alert">
                                    {{ /*this.errEmail*/ }}
                                </span>
                            </div>
                            
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text input-group-text-60"><i class="fa fa-lock"></i></span>
                                </div>          
                                <input id="password" name="password" type="password" class="form-control" placeholder="password" v-model="form.password" required>
                                <span class="invalid-feedback d-block" role="alert">
                                    {{ /*this.errPassword*/ }}
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
                                    Reset password
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
    name: 'ResetEmail',
    components: {
    },
    data() {
        return {
            form: {
                email: '',
                password: '',
                password_confirmation: '', 
                appkey: '',
                signature: '',
                key: '',
            },
        }
    },
    mounted() {
        if(this.$route.query.key){
            this.form.email = this.$route.query.email;
            this.form.appkey = this.$route.query.appkey;
            this.form.signature = this.$route.query.signature;
            this.form.key = this.$route.query.key;

        }
    },
    methods: {
        ...mapActions({
            resetPassword: 'auth/resetPassword'
        }),
        submit() {
             this.resetPassword(this.form).then((response) => {
 
                if(this.isEmpty(response.errors))
                {
                    //Successful verification
                    this.$router.replace({
                        name: 'Login'
                    })

                    // Display all messages
                    this.processMessages(response.messages, 'success')

                }else{

                    // register errors
                    this.processMessages(response.errors, 'error')
                }              
          
            }).catch((e) => {

                // Failed verification
                window.toast.fire({
                    icon: "error",
                    title: e
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
    }
}

</script>
