<template>
    <div class='slideCTA'>
        <img @click='backwardMethod' :class='{disable: disableLeft}' src='../../assets/images/left-arrow.svg' alt='left arrow'>
        <img @click='forwardMethod' :class='{disable: disableRight}' src='../../assets/images/right-arrow.svg' alt='right arrow'>
    </div>
</template>


<script>
export default {
    data() {
        return {
            disableLeft: true,
            disableRight: false
        }
    },
    computed: {
        moveForward () {
            return this.$store.state.moveForward;
        },
        moveBackward () {
            return this.$store.state.moveBackward;
        },
    },
    watch: {
        moveForward: function (v) {
            if(v <= 0) {
                this.disableRight = true;
            } else {
                this.disableRight = false;
            }
        },
        moveBackward: function (v) {
            if(v <= 0) {
                this.disableLeft = true;
            } else {
                this.disableLeft = false;
            }
        },
    },
    methods: {
        forwardMethod: function () {
            if (!this.$el.children[1].classList.contains('disable'))
            {
                this.$store.commit('decFward_incBward');
                this.$store.commit('moveSlider', 'moveForward');
            }
        },
        backwardMethod: function () {
            if (!this.$el.children[0].classList.contains('disable'))
            {
                this.$store.commit('decBward_incFward');
                this.$store.commit('moveSlider', 'moveBackward');
            }
        },
    }
}

</script>


<style>
    .slideCTA {
        width: 91px;
        margin: 2% auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .disable {
        opacity: 0.2;
    }
</style>