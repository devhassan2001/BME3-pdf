<template>
    <Validationbox class="validation" :error='error' :success='success' :warning='warning' :info='info' />
    <div @click.self='close' class='parent'>
    </div>
    <form class="parent__accountBox">
        <div class='sideMenu__close'>
            <img @click='close' src='../../assets/images/close.svg' alt='close menu'>
        </div>
        <h5>Join to “Brain Developers“ team. <span @click='toggleshowLogin'>Already have an account? click me.</span></h5>
        <div ref="accountBox" class="parent__accountBox__form">
            <div class="parent__accountBox__form__input">
                <p>Your Name</p>
                <input type="text">
            </div>
            <div class="parent__accountBox__form__input">
                <p>Your Email</p>
                <h6>(only gmail account allowed)</h6>
                <input type="email">
            </div>
            <div class="parent__accountBox__form__input">
                <p>Your Password</p>
                <input :type="password">
                <img @click='toggleEye' :src="require(`@/assets/images/${eye}`)" alt='eye password'>
            </div>
        </div>
        <button @click='submit' type='submit'><h5>Create an Account</h5></button>
    </form>
</template>



<script>
import Validationbox from '../../components/miltyUseComp/Validationbox.vue'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default {
    components: {Validationbox},
    data() {
        return {
            error: false,
            success: false,
            warning: false,
            info: null,
            eye: 'eyeClose.svg',
            password: 'password',
        }
    },
    methods: {
        close: function () {
            this.$store.commit('toggleShowAddAccount');
        },
        reset: function () {
            setTimeout(() => {
                this.error = false;
                this.success = false;
                this.info = null;
            }, 6000)
        },
        toggleEye: function () {
            if(this.eye === 'eyeClose.svg') {
                this.eye = 'eyeOpen.svg';
                this.password = 'text';
            } else {
                this.eye = 'eyeClose.svg';
                this.password = 'password';
            }
        },
        toggleshowLogin: function () {
            this.$store.commit('toggleShowLogin');
            this.$store.commit('toggleShowAddAccount');
        },
        submit: function (e) {
            e.preventDefault();
            const errorChar = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
            const inputs = this.$refs.accountBox.children;

            // * form validation
            if(inputs[0].children[1].value.match(errorChar)){
                this.error = true;
                this.info = 'You must provid your actual (Name)';
                this.reset();  
            } else if (inputs[1].children[2].value === '' || !inputs[1].children[2].value.includes('gmail.com')){
                this.error = true;
                this.info = 'You must provide a gmail account';               
                this.reset();  
            } else if (inputs[2].children[1].value === '') {
                this.error = true;
                this.info = 'You must provide a Password'; 
                this.reset();             
            } else if (inputs[2].children[1].value.length < 6) {
                this.error = true;
                this.info = 'The Password must be greater than 7 char.';    
                this.reset();          
            } else {
                const auth = getAuth();
                this.warning = true;
                this.info = 'Creating an account for you...';   
                createUserWithEmailAndPassword(auth, inputs[1].children[2].value, inputs[2].children[1].value).then((userCredential) => {
                    updateProfile(auth.currentUser, {
                        displayName: inputs[0].children[1].value
                    }).then(() => {
                        this.warning = false;
                        this.success = true;
                this.reset();  
                        location.reload();
                    }).catch(err => {
                        this.warning = false;    
                        this.info = null;
                        this.error = true;
                        this.info = 'something went wrong try agian later'
                        this.reset();
                        console.log(err);
                    });
                }).catch(err => {
                    this.warning = false;    
                    this.info = null;
                    this.error = true;
                    this.info = 'something went wrong try agian later'
                    this.reset();
                    console.log(err);
                });
            }       
        }
    },
}
</script>

<style scoped>
    .parent {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 40;
        background: rgba(35, 23, 58, 0.7);
    }
    .parent__accountBox {
        width: 80%;
        background: #23173A;
        border-radius: 20px;
        color: white;
        padding: 20px;
        position: absolute;
        left: 50%;
        top: 70px;
        transform: translateX(-50%);
        z-index: 41;
    }
    span {
        font-size: 12px;
        font-weight: bold;
        color: #FF00E5;
        text-decoration: underline;
    }
    .sideMenu__close {
        position: absolute;
        width: max-content;
        right: 7px;
        top: -25px;
    }
    .parent__accountBox__form {
        width: 100%;
    }
    .parent__accountBox__form p {
        padding-left: 10px;
        margin-top: 20px;
        display: inline-block; 
    }
    .parent__accountBox__form h6 {
        display: inline-block;
        padding-left: 10px;
    }
    .parent__accountBox__form__input {
        position: relative;
    }
    .parent__accountBox__form__input input {
        width: 100%;
        height: 33px;
        border-radius: 20px;
        background: #503584;
        color: white;
        outline: none;
        padding-left: 10px;
        margin: 5px auto;
        border: 1px solid #39265F;

    }
    img[alt='eye password'] {
        width: 24px;
        height: 20px;
        position: absolute;
        bottom: 11px;
        right: 11px;
    }
    button {
        width: 100%;
        height: 37px;
        border: none;
        background: linear-gradient(114.47deg, #FF00E5 -0.67%, #2400FF 166.39%);
        border-radius: 20px;
        margin-top: 30px;
        margin-bottom: 20px;
        color: white;
    }
</style>