<template>
    <div class='navbar'>
        <Hamicon />
        <div class='navbar__searchbar'>
            <img src='../../assets/images/Search-icon.svg' alt='search icon'>
            <input type='text' placeholder='search' v-model="searchTxt">
        </div>
        <img @click='toggleAccounts' src='../../assets/images/user.svg' alt='profile image'>
    </div>
</template>

<script>
import { getAuth } from 'firebase/auth';
import Hamicon from './Hamicon.vue'

export default {
    components: { Hamicon },
    data () {
        return {
            searchTxt: '',
        }
    },
    watch: {
        searchTxt: function (v) {
            this.$store.commit('searchFilter', v.toLowerCase());
            this.$store.commit('moveSlider', '');
            this.$store.commit('resetSlider');
        }
    },
    methods: {
        // * see if the user logged in or not to display the relative component
        toggleAccounts: function () {
            const auth = getAuth();
            const user = auth.currentUser; 
            if (user) {
                this.$store.commit('toggleShowAccount');
            } else {
                this.$store.commit('toggleShowAddAccount');
            }
        },
    }
}
</script>



<style scoped>
    .navbar {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .navbar__searchbar {
        width: 58%;
        height: 33px;
        background: #503584;
        border-radius: 20px;
        padding-left: 10px;
        display: flex;
        align-items: center;
    }
    .navbar__searchbar input {
        width: 70%;
        height: 100%;
        margin-left: 10px;
        color: white;
        background: none;
        border: none;
    }
    .navbar img:last-child {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        color: white;
    }
</style>