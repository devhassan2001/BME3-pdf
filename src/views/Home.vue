<template>
    <Validationbox class="validation" :success='success' :error='error' :warning='warning' :info='info' />
    <AddAccount v-if='showAddAccount'/>
    <Login v-if='showLogin'/>
    <Account v-if='showAccount'/>
    <Navbar />
    <Header @remove='remove'/>
    <FilesSlider />
    <SlideCTA />
    <Menu ref="remove" />
</template>


<script>
import Validationbox from '../components/miltyUseComp/Validationbox'
import AddAccount from '../components/account/AddAccount'
import Login from '../components/account/Login'
import Account from '../components/account/Account'
import Navbar from '../components/navbar_section/Navbar'
import Header from '../components/header_section/Header'
import FilesSlider from '../components/main_section/FilesSlider'
import SlideCTA from '../components/cta_section/SlideCTA'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getMessaging, getToken } from "firebase/messaging";
import Menu from '../components/menu_section/Menu'
import { addDoc, collection, getDocs } from 'firebase/firestore'
import db from '../main'

export default {
    components: {    
        Validationbox, Navbar,AddAccount, 
        Account, Login, Header, Menu,
        FilesSlider, SlideCTA
    },
    data () {
        return {
            success: false,
            warning: false,
            error: false,
            info: null,
        }
    },
    computed: {
        showAddAccount () {
            return this.$store.state.showAddAccount;
        },
        showAccount () {
            return this.$store.state.showAccount;
        },
        showLogin () {
            return this.$store.state.showLogin;
        }
    },
    methods: {
        reset: function () {
            setTimeout(() => {
                this.error = false;
                this.warning = false;
                this.success = false;
                this.info = null;
            }, 6000)
        },
        remove: function () {
            this.$refs.remove.removeClass();
        },
    },
    mounted () {
        const messaging = getMessaging();
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if(user) {
                this.success = true;
                this.info = `Welcome ${user.displayName}`;
                this.reset();  

                Notification.requestPermission().then(res => {
                    if(res === 'granted') {
                        getToken(messaging, { vapidKey:'BJ_Er91sn1owwzGw8CAKeGlzDVU3D02HCBbUu-YOOuvnT26rTJMBPeEP-O1Z2u3xoN7OZkZuCt9YNgZDYJDf_LM'}).then((currentToken) => {
                        if (currentToken) {
                            let flag = true;
                            getDocs(collection(db, 'userTokens')).then(docs => {
                                docs.forEach(doc => {
                                    if(doc.data().token === currentToken) {
                                        flag = false;
                                    }
                                })
                                if(flag) {
                                    addDoc(collection(db, 'userTokens'), {
                                        token: currentToken
                                    }).then(res => {
                                    }).catch(err => {
                                        console.log(err);
                                    })
                                }
                            })
                        } else {
                            console.log('No registration token available. Request permission to generate one.');
                        }
                        }).catch((err) => {
                            console.log('An error occurred while retrieving token. ', err);
                        });
                    }
                })
                if(user.uid === 'z2pxdqWmhPdBtJtQB3spq9wm0Jq1') {
                    this.$store.commit('toggleAdmin');
                }
            } else {
                this.error = true;
                this.info = `You are not logged in`;
                this.reset();           
            }
        })
    }
}
</script>
