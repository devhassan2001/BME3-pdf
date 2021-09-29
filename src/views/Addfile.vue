<template>
    <Validationbox :error='error' :success='success' :warning='warning' :info='info'/>
    <Hamicon class='hamIcon'/>
    <h3>Add new file</h3>
    <form id="form" enctype="multipart/form-data">
        <div class='form__class'>
            <p>Class Name</p>
            <div ref='dropBox1' class='dropBox' @click='toggleShow1' >
                <h6>{{ dropBox1 }}</h6>
                <img src='../assets/images/down-arrow.svg' alt='down arrow'>
                <div v-if='showBox1' class='dropBox__menu' @click='select1'>
                    <h6>Mems design</h6>
                    <h6>Electronics</h6>
                    <h6>Medical device</h6>
                    <h6>حقوق</h6>
                </div>
            </div>
        </div>
        <div class='form__lecture'>
            <p>Lecture</p>
            <input type='text'>
        </div>
        <div class='form__doctor'>
            <p>Doctor</p>
            <div ref='dropBox2' class='dropBox' @click='toggleShow2'>
                <h6>{{ dropBox2 }}</h6>
                <img src='../assets/images/down-arrow.svg' alt='down arrow'>
                <div v-if='showBox2' class='dropBox__menu' @click='select2'>
                    <h6>D. Ali Naser</h6>
                    <h6>D. Abrahem</h6>
                    <h6>D. Saad</h6>
                    <h6>D. Sare</h6>
                </div>
            </div> 
        </div>
        <div class='form__file'>
            <p>Upload a File</p>
            <input class="form__file__input" type='file'>
        </div>
        <div class='form__video'>
            <p>Video link (optional)</p>
            <input type='text'>            
        </div>
        <button type='submit'><h5>Add</h5></button>
    </form>
</template>


<script>
import Hamicon from '../components/navbar_section/Hamicon.vue'
import Validationbox from '../components/miltyUseComp/Validationbox.vue'
import {collection, getDocs, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes  } from "firebase/storage";
import db from '../main.js'


export default {
    components: {Hamicon, Validationbox},
    data () {
        return {
            showBox1: false,
            showBox2: false,
            dropBox1: 'Class', 
            dropBox2: 'Doctor',
            error: false,
            warning: false,
            success: false,
            info: null, 
            img: null
        }
    },
    methods: {
        reset: function () {
            setTimeout(() => {
                this.error = false;
                this.success = false;
                this.info = null;
            }, 6000)
        },
        select1: function (e) {
            if (e.target.nodeName === 'H6')
            {
                this.dropBox1 = e.target.innerText
            }
        },
        select2: function (e) {
            if (e.target.nodeName === 'H6')
            {
                this.dropBox2 = e.target.innerText
            }
        },
        toggleShow1: function () {
            this.showBox1 = !this.showBox1;
            this.$refs.dropBox1.classList.toggle('remove-radius');
        },
        toggleShow2: function () {
            this.showBox2 = !this.showBox2;
            this.$refs.dropBox2.classList.toggle('remove-radius');
        },
    },
    mounted() {
        const form = document.querySelectorAll('#form input');
        document.addEventListener('submit', (e) => {
            e.preventDefault();

            // date and week number
            let today = new Date();
            let oneJan =  new Date(today.getFullYear(), 0, 1);   
            let numberOfDays =  Math.floor((today - oneJan) / (24 * 60 * 60 * 1000));   
            let weekN = Math.ceil(( today.getDay() + 1 + numberOfDays) / 7); 
            let date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
            //------------------------------------------------------------------------
            
            // form validation
            if(this.dropBox1 === 'Class')
            {
                this.error = true;
                this.info = 'You must select a (Class Name)'
                this.reset();               
            } else if (form[0].value === '' || isNaN(form[0].value))
            {
                this.error = true;
                this.info = 'You must add (Lecture Number)'
                this.reset();
            } else if (this.dropBox2 === 'Doctor')
            {
                this.error = true;
                this.info = 'You must select a (Doctor Name)'
                this.reset();
            } else if (form[1].value === '' || !form[1].value.includes('.pdf'))
            {
                this.error = true;
                this.info = 'You must choose a PDF File'
                this.reset();
            } else {
                if(this.dropBox1 === 'Mems design')
                {
                    this.img = 'mems.jpg';
                } else if(this.dropBox1 === 'Electronics')
                {
                    this.img = 'ele.jpg';
                } else if(this.dropBox1 === 'حقوق')
                {
                    this.img = 'rights.jpg';
                } else {
                    this.img = 'tempimage.png'
                }

                this.warning = true;
                this.info = 'Adding new file...';

                getDocs(collection(db, "files")).then((res) => {
                    res.forEach((doc) => {
                    
                        if(form[0].value === doc.data().lecture && this.dropBox1 === doc.data().class_name || form[1].value === doc.data().file_link) {

                            throw 'errr';
                        }
                    })
                }).then(() => {
                    addDoc(collection(db, "files"), {
                        class_name: this.dropBox1,
                        doctor: this.dropBox2,
                        file_ref: `${this.dropBox1}_${form[0].value}`,
                        lecture: form[0].value,
                        video_link: form[2].value,
                        file_image: this.img,
                        date: date,
                        week: weekN,
                    }).then(() => {
                        // send notification
                        function getAccessToken() {
                            return new Promise(function(resolve, reject) {
                                const key = require('../bme3-pdf-firebase-adminsdk-nv9vz-76303e77f0.json');
                                const {JWT} = require('google-auth-library');
                                const SCOPES = ['https://www.googleapis.com/auth/firebase.messaging']
                                const jwtClient = new JWT(
                                    key.client_email,
                                    null,
                                    key.private_key,
                                    SCOPES,
                                    null
                                );
                                jwtClient.authorize(function(err, tokens) {
                                    if (err) {
                                        reject(err);
                                        return;
                                    }
                                    resolve(tokens.access_token);
                                });
                            });
                        }
                        var PROJECT_ID = 'bme3-pdf';
                        var HOST = 'fcm.googleapis.com';
                        var PATH = '/v1/projects/' + PROJECT_ID + '/messages:send';
                        var request = require('request');
                        getAccessToken().then((accessToken) => {
                            getDocs(collection(db, 'userTokens')).then(docs => {
                                docs.forEach(doc => {
                                    var options = {
                                        hostname: HOST,
                                        path: PATH,
                                        url: 'https://fcm.googleapis.com/v1/projects/bme3-pdf/messages:send',
                                        method: 'POST',
                                        headers: {
                                            'Authorization': 'Bearer ' + accessToken
                                        },
                                        body: JSON.stringify({
                                            message: {
                                                data: {
                                                    title: "New file has been added",
                                                    body: `the file (${this.dropBox1} Lecture ${form[0].value}) has been added`
                                                },
                                                token: `${doc.data().token}`
                                            }
                        
                                        })
                                    };
                                    request(options, function(error, response, body) {
                                        console.log(error)
                                    });                                    
                                })
                            })
                        })      
                        const storage = getStorage();
                        const storageRef = ref(storage, `${this.dropBox1}_${form[0].value}`);
                        uploadBytes(storageRef, form[1].files[0]).then(() => {

                            this.warning = false;    
                            this.success = true;
                            this.info = 'The file added successfully'
                            this.reset();

                            this.dropBox1 = 'Class';             
                            this.dropBox2 = 'Doctor';
                            for(let i = 0; i < form.length; i++)
                            {
                                form[i].value = '';
                            }  
                        }).catch((err) => {
                            this.warning = false;    
                            this.info = null;
                            this.error = true;
                            this.info = 'something went wrong try agian later'
                            this.reset();         
                            console.log(err);          
                        })                   
                    }).catch((err) => {
                            this.warning = false;    
                            this.info = null;
                            this.error = true;
                            this.info = 'something went wrong try agian later'
                            this.reset();        
                        console.log(err);          
                    });
                }).catch((err) => {
                    this.warning = false;    
                    this.info = null;
                    this.error = true;
                    this.info = 'This file already exists'
                    this.reset();     
                    console.log(err);    
                });
            }
        })
    },
}
</script>

<style scoped>
    h3 {
        margin-top: 27px;
        margin-bottom: 33px;
        color: white;
    }
    .form__class {

        grid-area: form__class;
    }
    .form__lecture {

        grid-area: form__lecture;
    }
    .form__doctor {
        grid-area: form__doctor;
    }
    .form__file {
        grid-area: form__file;
    }
    .form__video {
        grid-area: form__video;
    }
    button {
        grid-area: submit;        
    }
    .form__file, .form__video, .form__image {
        text-align: start;
    }
    .form__video p {
        padding-left: 7px;
        display: inline;
    }
    .form__file p {
        padding-left: 7px;            
    }
    .form__file h6, 
    .form__video h6 {
        display: inline;
    }
    form {
        width: 100%;
        display: grid;
        text-align: center;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(4, 70px);
        color: white;
        row-gap: 18px;
        grid-template-areas: 
        "form__class form__lecture form__doctor"
        "form__file form__file form__file"
        "form__video form__video form__video"
        "submit submit submit"
    }
    input:not(input[type=file]) {
        width: 95%;
        height: 33px;
        border-radius: 20px;
        background: #503584;
        color: white;
        outline: none;
        padding-left: 10px;
        margin: 5px auto;
        border: 1px solid #39265F;
    }
    .form__file__input {
        width: 95%;
    }   
    input[type=file]::-webkit-file-upload-button {
        width: 55%;
        height: 33px;
        border-radius: 20px;
        background: #503584;
        color: white;
        outline: none;
        margin: 5px 0;
        border: 1px solid #39265F;
    }
    .dropBox {
        width: 95%;
        height: 33px;
        border-radius: 20px;
        background: #503584;
        display: flex;
        justify-content: space-around;
        align-items: center;
        position: relative;
        color: white;
        margin: 5px auto;
        border: 1px solid #39265F;
    }
    .dropBox h6 {
        margin-right: -10px;
    }
    .dropBox__menu {
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
    .dropBox__menu h6 {
        width: 100%;
        text-align: center;
    }
    .dropBox__menu h6:not(:last-child) {
        height: 28px;
    }
    .remove-radius {
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
        border: none;
    }
    button {
        width: 100%;
        height: 37px;
        border: none;
        background: linear-gradient(114.47deg, #FF00E5 -0.67%, #2400FF 166.39%);
        border-radius: 20px;
        margin-top: 10px;
        margin-bottom: 20px;
        color: white;
    }
</style>