<template>
<main role="main" class="inner cover p-0 h-100">
    <div class="container mt-5">
        <div class="row justify-content-center align-items-center">
            <div class="col-lg-8">
                <div class="card">

                    <div class="card-header">Verify Your Email Address</div>
                    
                    <div class="card-body text-center mt-3 pt-3 mb-0 pb-0">
                        <h3><img class="d-inline-block align-top img-size40" src="@/assets/images/sawline_black.png" alt="Sawline" />
                        Sawline</h3>
                    </div>

                    <div class="card-body">

                        Before proceeding, please check your email for a verification link.
                        If you did not receive the email
                        <form @submit.prevent="submit">
                            <button type="submit" class="btn btn-link p-0 m-0 align-baseline">click here to request another</button>.
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
    name: 'Verify',
    components: {},
    data() {
        return {
            form: {
                appkey: '',
                signature: '',
                key: '',
            }
        }
    },
    mounted() {
        if(this.$route.query.appkey &&
           this.$route.query.signature &&
           this.$route.query.key
        ){
            this.form.appkey = this.$route.query.appkey;
            this.form.signature = this.$route.query.signature;
            this.form.key = this.$route.query.key;
            this.submit();
        }
    },
    methods: {
        ...mapActions({
            verification: 'auth/verification'
        }),
        submit() {
            this.verification(this.form).then(() => {
                this.$router.replace({
                    name: 'Dashboard'
                })
                window.toast.fire({
                    icon: "success",
                    title: 'Emaill address verified.'
                }); 
            })
        },
    },
}
</script>