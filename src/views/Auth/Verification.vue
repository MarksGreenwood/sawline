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
                        <form @submit.prevent="">
                            <button type="submit" class="btn btn-link p-0 m-0 align-baseline" @click="verificationResend">click here to request another</button>.
                        </form>
                        
                    </div>

                </div>
            </div>
        </div>   
    </div>
    
</main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios';

export default {
    name: 'Verification',
    components: {},
    computed: {
        ...mapGetters({
            verified: 'auth/verified',
            user: 'auth/user',
        }),
    },
    data() {
        return {
            form: {
                email: '',
                appkey: '',
                signature: '',
                key: '',
            }
        }
    },
    created() {
        // Set the email
        this.form.email = this.user.email;

        // Verify email if query matches a verification
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
             this.verification(this.form).then((response) => {
 
                if(this.isEmpty(response.errors))
                {
                    //Successful verification
                    this.$router.replace({
                        name: 'Home'
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
        verificationResend(){
            try {
                axios.post("/auth/sendverification/sawline", {       
                        email: this.user.email
                    })
                    .then((response) => {

                        if(this.isEmpty(response.data.errors))
                        {
                            // Display all messages
                            this.processMessages(response.data.messages, 'success')

                        }else{

                            // register errors
                            this.processMessages(response.data.errors, 'error')
                        }    

                    })
                    .catch((e) => {
 
                        // Too many verification messages
                        window.toast.fire({
                            icon: "error",
                            title: e
                        }); 
                });
            } catch (e) {

                // Unknown error
                window.toast.fire({
                    icon: "error",
                    title: e
                })
                
            }
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
    },
}
</script>