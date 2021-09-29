<template>
    <div ref="sliderBox" class='sliderBox'>
        <div class='sliderBox__slider'>
            <File v-for='file in files' 
            :file='file'
            :key="file"> 
                <img class='fileImg' :src="require(`@/assets/images/${file.img}`)">
            </File>
        </div>
    </div>
</template>


<script>
import File from './File.vue'
export default {
    components: {File},
    data () {
        return {
            startTouchX: 0,
            stop: false,
        }
    },
    computed: {
        files () {
            return this.$store.state.files;
        },
        moveForward () {
            return this.$store.state.moveForward;
        },
        moveBackward () {
            return this.$store.state.moveBackward;
        },
    },
    mounted() {
        // * set a dynamic height for the file slider
        const sliderBox = this.$refs.sliderBox;
        const sliderBoxWidth = sliderBox.getBoundingClientRect();
        sliderBox.style.height = `${sliderBoxWidth.width}px`;

        const slider = this.$el.children[0];
        this.$store.commit('getSlider', slider);
        this.$store.dispatch('getFiles');


        // * get information when user start to touch the slider
        slider.addEventListener('touchstart', (e) => {
            this.startTouchX = e.touches[0].clientX;
            this.stop = true;
        });

        // * move the slider when finger is moving (one time)
        slider.addEventListener('touchmove', (e) => {
            if (this.stop) {
                if (this.moveForward > 0 && this.startTouchX > e.touches[0].clientX )
                {
                    this.$store.commit('moveSlider','moveForward');
                    this.$store.commit('decFward_incBward');
                    this.stop = false;
                    
                } else if (this.moveBackward > 0 && this.startTouchX < e.touches[0].clientX) {
                    
                    this.$store.commit('moveSlider', 'moveBackward');
                    this.$store.commit('decBward_incFward');             
                    this.stop = false;                    
                }
            }

        });
    },
}
</script>

<style scoped>
    .sliderBox {
        display: flex;   
        margin-left: -35px;
        margin-top: 3%;
        overflow: hidden;
    }
    .sliderBox__slider {
        display: flex;
        padding-left: 0.1px;  
        transition: transform 400ms cubic-bezier(.17,.67,.39,1.09);
    }
    .fileImg {
        width: 100%;
        height: 100%;
        border-radius: 20px;
        position: absolute; 
        z-index: 4;    
    }
</style>