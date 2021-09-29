<template>
    <div @click.self='close' class='parent'>
        <div class="parent__accountBox">
            <div class='sideMenu__close'>
                <img @click='close' src='../../assets/images/close.svg' alt='close menu'>
            </div>
            <h5>Welcome {{ username }} to Brain Developers team</h5>
            <p>Your Name: {{ username }}</p>
            <p>Your Email: {{ email }}</p>
            <button @click='signOut'><h5>Log out</h5></button>
        </div>
    </div>
</template>

<script>
import { getAuth } from 'firebase/auth';
export default {
    data () {
        return {
            username: null,
            email: null,
        }
    },
    methods: {
        close: function () {
            this.$store.commit('toggleShowAccount');
        },
        signOut: function () {
            const auth = getAuth();
            auth.signOut().then(() => {
                this.$store.commit('toggleShowAccount');
                location.reload();
            })
        },        
    },
    mounted() {
        const auth = getAuth();
        const user = auth.currentUser; 
        this.username = user.displayName;       
        this.email = user.email;       
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
    .sideMenu__close {
        position: absolute;
        width: max-content;
        right: 7px;
        top: -25px;
    }
    button {
        width: 100%;
        height: 37px;
        border: none;
        background: linear-gradient(114.47deg, #ff0000 -0.67%, #2400FF 166.39%);
        border-radius: 20px;
        margin-top: 30px;
        margin-bottom: 20px;
        color: white;
    }
    p {
        margin-top: 10px;
    }
</style>