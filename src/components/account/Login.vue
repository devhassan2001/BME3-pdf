<template>
    <Validationbox class="validation" :error='error' :success='success' :warning='warning' :info='info' />
    <div  @click.self='close' class='parent'>
    </div>
    <form class="parent__accountBox">
        <div class='sideMenu__close'>
            <img @click='close' src='../../assets/images/close.svg' alt='close menu'>
        </div>
        <h5>Welcome back gorgeous. <span @click="showNewAccount">Add a new account? click me.</span></h5>
        <div ref="accountLogin" class="parent__accountBox__form">
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
        <button @click='submit' type='submit'><h5>Log in</h5></button>
    </form>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
import Validationbox from '../../components/miltyUseComp/Validationbox.vue'
export default {
    components: {Validationbox},
    data () {
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
            this.$store.commit('toggleShowLogin');
        },
        showNewAccount: function () {
            this.$store.commit('toggleShowLogin');
            this.$store.commit('toggleShowAddAccount');
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
        reset: function () {
            setTimeout(() => {
                this.error = false;
                this.success = false;
                this.info = null;
            }, 6000)
        },
        submit: function (e) {
            e.preventDefault();
            const inputs = this.$refs.accountLogin.children;

            const auth = getAuth();
            this.warning = true;
            this.info = 'Loging in...';  
            signInWithEmailAndPassword(auth, inputs[0].children[2].value, inputs[1].children[1].value).then((userCredential) => {
                inputs[0].children[2].value = '';
                inputs[1].children[1].value = '';

                this.warning = false;
                this.success = true;
                this.info = 'logged in successfully'

                this.$store.commit('toggleShowLogin');
            }).catch(() => {
                this.warning = false;    
                this.info = null;
                this.error = true;
                this.info = 'No account exist'
                this.reset();
                this.$store.commit('resetValidationBox')
            })   
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