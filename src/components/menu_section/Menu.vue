<template>
    <div class='menu'>
        <div class='menu__slider'>
            <span>
                <h5>Electronics</h5>
                <h5>Mems design</h5>
            </span>
            <span>
                <h5>Medical device</h5>
                <h5>حقوق</h5>
            </span>
        </div>
    </div>
</template>


<script>
export default {
    data () {
        return {
            slider: null,
            stop: null,
            startTouchX: 0,
            speed: 325,
            move: 0,
            moves: 2, // must be classes length
        }
    },
    methods: {
        removeClass: function () {
            [...this.slider.children].forEach((el) => {
                el.children[0].classList.remove('active');
                el.children[1].classList.remove('active');
            });
        }
    },
    mounted() {
        const bodyHeight = document.querySelector('body').getBoundingClientRect();
        const wrapperHeight = document.querySelector('#app').getBoundingClientRect();
        const menu = document.querySelector('.menu');
        const heightDifference = bodyHeight.height - wrapperHeight.height;
        if(heightDifference > 0) {
            menu.style.marginTop = `${heightDifference}px`;
        }
        this.slider = this.$el.children[0];

        this.slider.addEventListener('touchstart', (e) => {
            this.startTouchX = e.touches[0].clientX;
            this.stop = true;
        });
        this.slider.addEventListener('touchmove', (e) => {
            if (this.stop) {
                if (this.moves > 1 && this.startTouchX > e.touches[0].clientX )
                {
                    this.slider.style.transform = `translateX(-${this.move += this.speed}px)`;
                    this.moves -= 1;
                    this.stop = false;
                    
                } else if (this.moves < 4 && this.startTouchX < e.touches[0].clientX) {
                    this.slider.style.transform = `translateX(-${this.move -= this.speed}px)`
                    this.moves += 1;                    
                    this.stop = false;                    
                }
            }
        });
        this.slider.addEventListener('click', (e) => {
            if(e.target.nodeName === 'H5' &&  !e.target.classList.contains('active'))
            {
                this.removeClass();
                e.target.classList.add('active');
                this.$store.commit('classFilter', e.target.innerText);
                this.$store.commit('moveSlider', '');
                this.$store.commit('resetSlider');
            } else if (e.target.classList.contains('active')) {
                this.$store.dispatch('getFiles');    
                e.target.classList.remove('active');
            }
        })
    },
}
</script>


<style>
    .menu {
        width: 324px;
        height: 70px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.115) -23.57%, rgba(255, 255, 255, 0) 112.86%); 
        box-shadow: 0px 4px 4px -1px #503584;
        backdrop-filter: blur(10px);
        border-top: 1px solid rgba(255, 255, 255, 0.5);
        border-radius: 30px;
        margin: 7% auto;
        padding: 20px 0px 21px 0px;
        display: flex;
        overflow: hidden;
    }
    .menu__slider {
        color: white;
        display: flex;
        align-items: center;
        white-space: nowrap;
        transition: transform 400ms cubic-bezier(.17,.67,.39,1.09);
    }
    .menu__slider span {
        display: flex;
        width: 325px;
        justify-content: space-evenly;
    }
    .menu__slider h5:not(:last-child) {
        margin-right: 26px;
    }
    .active {
        width: max-content;
        padding: 4px 8px 4px 8px;
        background: linear-gradient(114.47deg, #FF00E5 -0.67%, #2400FF 166.39%);
        border-radius: 20px;
    }
</style>