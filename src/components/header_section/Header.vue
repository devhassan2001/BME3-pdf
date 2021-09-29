<template>
    <header>
        <h3>BME3-PDFs</h3>
        <div ref='sortBox' class='sortBox' @click='toggleShow'>
            <h6>{{ sortBy }}</h6>
            <img src='../../assets/images/down-arrow.svg' alt='down arrow'>
            <div v-if='show' @click='select' class='sortBox__menu'>
                <h6>week</h6>
                <h6>Sort by</h6>
            </div>
        </div>
    </header>
</template>


<script>
export default {
    data () {
        return {
            show: false,
        }
    },
    computed: {
        sortBy () {
            return this.$store.state.sortBy
        }
    },
    methods: {
        toggleShow: function () {
            this.show = !this.show;
            this.$refs.sortBox.classList.toggle('remove-radius');
        },
        select: function (e) {
            if (e.target.nodeName === 'H6')
            {
                this.$store.commit('sortBy', e.target.innerText);
                this.$store.dispatch('getFiles');
                e.target.innerText === 'Sort by' ? this.$emit('remove') : false;
            }
        }   
    }
}
</script>


<style scoped>
    header {
        width: 100%;
        margin-top: 38px;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .sortBox {
        width: 83px;
        height: 33px;
        border-radius: 20px;
        background: #503584;
        display: flex;
        justify-content: space-around;
        align-items: center;
        position: relative;
               
    }
    .sortBox h6 {
        margin-right: -10px;
    }
    .sortBox__menu {
        position: absolute;
        left: 0;
        top: 26px;
        width: 100%;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        background: #503584;
        padding: 10px 0px 11px 0px;
        z-index: 10;
    }
    .sortBox__menu h6 {
        width: 83px;
        text-align: center;
    }
    .sortBox__menu h6:not(:last-child) {
        height: 28px;
    }
    .remove-radius {
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
    }
</style>