<template>
    <div class="file">
        <a href='#/' v-if='showDelete' @click='deleteFile' class="deleteIcon">
            <img  src='../../assets/images/deleteIcon.svg'  alt="delete icon">
        </a>
        <router-link :to="{ name: 'DisplayFile', params: { id: file.file_ref}}">
            <img src='../../assets/images/temp-doctor.png' class='doctorImg' alt="Doctor img">
            <slot></slot>
            <div class='floorFade'>
                <span>
                    <p>Class: {{ file.class_name }}</p>
                    <p>Lecture: {{ file.lecture }}</p>
                </span>
            </div>
            <div class='labels'>
                <h6>by: @devhassan2001</h6>
                <span>
                    <h6>{{ file.date }}, Week: {{ file.week }}</h6>
                </span>
            </div>
        </router-link>
        <a :href='file.video_link' target="_blank"><img src='../../assets/images/video.svg' alt='video'></a> 
    </div>
</template>

<script>
import { getStorage, ref, deleteObject } from "firebase/storage";
export default {
    props: ['file', 'key'],
    methods: {
        deleteFile: function () {

            this.$store.dispatch('deleteFile', this.file.id);
            this.$store.dispatch('getFiles');

            const storage = getStorage();
            const fileRef = ref(storage, this.file.file_ref);

            deleteObject(fileRef).then(() => {
                console.log('file deleted');
            }).catch((error) => {
                console.log('something went wrong', error)
            });
        }
    },
    computed: {
        showDelete () {
            return this.$store.state.admin;
        }
    },
    mounted () {
        const file = document.querySelector('.file').getBoundingClientRect();
        this.$store.commit('setFileWidth', file.width);
    }
}
</script>


<style scoped>
    .file {
        width: 90vw;
        height: 95%;
        border-radius: 20px;
        margin-left: 35px;
        position: relative;  
        z-index: 8;  
        text-decoration: none;
    }
    .doctorImg {
        position: absolute;
        left: 12px;
        top: 6px;
        width: 37px;
        height: 37px;
        border-radius: 50%;
        z-index: 5;  
    }
    .deleteIcon {
        position: absolute;
        right: 12px;
        top: 6px;
        padding: 8px;
        border-radius: 50%;
        background: #503584;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9;  
    }
    .floorFade {
        width: 100%;
        height: 148px;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0) 21.28%, #39265F 109.8%);
        display: flex;
        align-items: flex-end;
        color: white;
        padding: 0 14px 9px 14px;
        position: absolute; 
        left: 0;
        bottom: 0;
        z-index: 6; 
    }
    img[alt='video'] {
        position: absolute;
        width: 45px;
        height: 45px;
        right: 14px;
        bottom: 9px;
        z-index: 20;
    }
    .labels {
        width: 98%;
        display: flex;
        bottom: -20px;
        align-items: flex-start;
        justify-content: space-between;
        color: white;
        margin-top: 6px;
        position: absolute; 
        z-index: 7;
    }
</style>