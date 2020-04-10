<template>
<main role="main" class="inner cover p-0 h-100">
    <div class="container mt-5">
        <div class="row justify-content-center align-items-center">
            <div class="col-lg-4">
                <div class="card">
                    <div class="card-header">Login</div>

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
                                <input id="email" name="email" type="email" class="form-control" placeholder="email" required autocomplete="email" autofocus v-model="form.email">
                            </div>

                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text input-group-text-60"><i class="fa fa-lock"></i></span>
                                </div>          
                                <input id="password" name="password" type="password" class="form-control" placeholder="password" required autocomplete="password" v-model="form.password">
                            </div>

                            <div class="input-group mb-3">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="remember" id="remember">

                                    <label class="form-check-label" for="remember">
                                        Remember Me
                                    </label>
                                </div>
                            </div> 

                            <div class="input-group mb-3">
                                <button type="submit" class="btn btn-success btn-block">
                                    Login
                                </button>
                            </div>

                            <a class="nav-link" href="#">Forgotten Password</a> 
                            <router-link class="nav-link" :to="{name: 'Register'}">Register</router-link> 

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
    name: 'Login',
    components: {},
    data() {
        return {
            form: {
                email: '',
                password: '',
            }
        }
    },
    mounted() {},
    methods: {
        ...mapActions({
            login: 'auth/login'
        }),
        submit() {
            this.login(this.form).then(() => {
                this.$router.replace({
                    name: 'Dashboard'
                })
            window.toast.fire({
                icon: "success",
                title: "Login attempt successful"
            }); 
            }).catch(() => {
                window.toast.fire({
                    icon: "error",
                    title: "The user credentials are incorrect"
                });
            })
        }
    },
}
</script>
