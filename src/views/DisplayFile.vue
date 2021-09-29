<template>
    <Validationbox :error='error' :success="success" :warning='warning' :info='info'/>
    <Hamicon class="hamIcon"/>
    <a class="download" @click="download"><h5>Download</h5></a>
    <div class="displayFile">
        <canvas id="file"></canvas>
        <div class="displayFile__cta">
            <img ref="left" :class='{disable: disableLeft}' src='../assets/images/left-arrow.svg' alt='left arrow'>
            <h5>{{ page }} of {{ pagesNum }}</h5>
            <img ref="right" :class='{disable: disableRight}' src='../assets/images/right-arrow.svg' alt='right arrow'>
        </div>    
    </div>    
</template>


<script>
import Hamicon from '../components/navbar_section/Hamicon.vue'
import Validationbox from '../components/miltyUseComp/Validationbox.vue'
import { getStorage, ref, getDownloadURL  } from "firebase/storage";
import fileDownload from 'js-file-download';


export default {
    props: ['id'],
    components: {Hamicon, Validationbox},
    data () {
        return {
            page: null,
            pagesNum: null,
            disableRight: false,
            disableLeft: true,
            success: false,
            error: false,
            warning: false,
            info: null,
            url: null
        }
    },
    methods: {
        reset: function () {
            setTimeout(() => {
                this.error = false;
                this.success = false;
                this.warning = false;
                this.info = null;
            }, 6000)
        },
        download: function () {
            const storage = getStorage();
            const fileRef = ref(storage, this.id);
            const axios = require('axios');

            this.warning = true;   
            this.info = 'Downloading';      

            getDownloadURL(fileRef)
            .then((url) => {
                axios.get(`https://calm-reef-09931.herokuapp.com/${url}`, {
                    responseType: 'blob',
                }).then(res => {

                    this.warning = false;
                    this.success = true;   
                    this.info = `File is downloading in your device`;
                    this.reset();               

                    fileDownload(res.data, `${this.id}.pdf`);
                });
            })
            .catch((err) => {
                console.log(err);
            });
        }
    },
    mounted () {
        const storage = getStorage();
        const fileRef = ref(storage, this.id);
        
        getDownloadURL(fileRef).then((url) => {
            this.url = url
            pdfjsLib.getDocument(`https://calm-reef-09931.herokuapp.com/${url}`).promise.then(pdfDoc_ => {

  
                this.success = true;
                this.info = 'Kill the file like a king';
                this.reset()

                pdfDoc = pdfDoc_;
                this.pagesNum = pdfDoc.numPages;
                rederPage(pageNum);
            }).catch(err => {
                this.error = true;
                this.info = 'something went wrong';
                this.reset();
                console.log(err)
            });
        }).catch(err => {
            this.error = true;
            this.info = 'something went wrong';
            this.reset();  
            console.log(err)
        });

        const can = document.querySelector('#file');
        const canWidth = can.getBoundingClientRect();

        let pdfDoc = null, 
            pageNum = 1,
            pageIsRendering = false,
            pageNumIsPending = null;

        const scale = 2,
            canvas = document.querySelector('#file'),
            ctx = canvas.getContext('2d');


        const rederPage = num => {
            pageIsRendering = true;

            pdfDoc.getPage(num).then(page => {
                const viewport = page.getViewport({ scale });

                canvas.height = viewport.height;
                canvas.width = viewport.width;
                can.style.height = `${canWidth.width + 200}px`;

                const rederCtx = {
                    canvasContext: ctx,
                    viewport
                }                
                page.render(rederCtx).promise.then(() => {
                    pageIsRendering = false;

                    if(pageNumIsPending !== null) {
                        rederPage(pageNumIsPending);
                        pageNumIsPending = null;
                    }
                });
                this.page = num;
            })
        }

        const queueRenderPage = num => {
            if(pageIsRendering) {
                pageNumIsPending = num;
            } else {
                rederPage(num);
            }
        }
        const showPrevPage = () => {
            if(pageNum <= 1) {

                return;
            } 
            this.disableLeft = false;
            this.disableRight = false;
            pageNum--;
            queueRenderPage(pageNum);
            if (pageNum <= 1) {
                this.disableLeft = true;
            }
        }
        const showNextPage = () => {
            if(pageNum >= pdfDoc.numPages) {

                return;
            } 
            this.disableLeft = false;
            this.disableRight = false;
            pageNum++;
            queueRenderPage(pageNum);
            if (pageNum >= pdfDoc.numPages) {
                this.disableRight = true;
            }
        }
        this.warning = true;
        this.info = 'getting the file';

        this.$refs.left.addEventListener('click', showPrevPage)
        this.$refs.right.addEventListener('click', showNextPage)

    }    
}
</script>

<style scoped>
    .download h5{ 
        margin: 10px auto;
        color: #FF00E5;
        text-decoration: underline;
        width: max-content;
    }
    .displayFile {
        width: 100%;
    }
    .displayFile__cta {
        width: 150px;
        display: flex;
        justify-content: space-between;
        margin: 10px auto;
        color: white;
    }
    #file {
        width: 100%;
        height: 90vh;
    }
</style>