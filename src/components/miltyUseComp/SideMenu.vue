<template>
    <div v-if='showSideMenu' @click.self='close' class='parent'>
        <div class='sideMenu'>
            <div class='sideMenu__close'>
                <img @click='close' src='../../assets/images/close.svg' alt='close menu'>
            </div>
            <div class='sideMenu__container'>
                <img src='../../assets/images/logo.png' alt='Logo'>
                <div class='sideMenu__container__content'>
                    <ul>
                        <li><router-link :to="{ name: 'Home' }" @click='close'><h4>Home</h4></router-link></li>
                        <li v-if="admin"><router-link :to="{ name: 'Addfile' }" @click='close'><h4>Add new file</h4></router-link></li>                     
                        <li><router-link :to="{ name: 'AboutMe' }" @click='close'><h4>About me</h4></router-link></li>                     
                    </ul>
                </div>  
            </div>
        </div>
    </div>
</template>


<script>
export default {
    methods: {
        close: function () {
            this.$store.commit('toggleShowSideMenu');         
        }
    },
    computed: {
        showSideMenu () {
            return this.$store.state.showSideMenu;
        },
        admin () {
            return this.$store.state.admin;
        }
    }
}
</script>

<style scoped>
    .parent {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;       
        z-index: 100;
    }
    .sideMenu {
        width: 80%;
        height: 100%;
        background: #503584;
        position: relative;
    }
    .sideMenu__close {
        position: absolute;
        width: max-content;
        right: 14px;
        top: 14px;
    }
    .sideMenu__container {
        width: 80%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        flex-direction: column;
    }
    .sideMenu__container img {
        width: 207px;
    }
    .sideMenu__container__content {
        width: 100%;
    }
    .sideMenu__container__content ul {
        text-align: center;
    }
    a {
        color: white;
    }
    .sideMenu__container__content ul li {
        padding-bottom: 3px;
        color: white;
        border-bottom: 2px solid white;
    }
    .sideMenu__container__content ul li:not(:last-child) {
        margin-bottom: 23px;
    }
</style>