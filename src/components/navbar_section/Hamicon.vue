<template>
    <div class='navbar__ham' @click='show'>
        <div class='navbar__ham__top'></div>
        <div class='navbar__ham__middle'></div>
        <div class='navbar__ham__bottom'></div>
    </div>
</template>


<script>
export default {
    methods: {
        show: function () {
            this.$store.commit('toggleShowSideMenu');
        }
    }
}
</script>

<style scoped>
    .navbar__ham {
        width: 26px;
        height: 17px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
    }
    .navbar__ham__top,
    .navbar__ham__middle,
    .navbar__ham__bottom {
        width: 100%;
        height: 3.4px;
        background: white;
    }
    .navbar__ham__bottom {
        width: 15px;
    }
</style>