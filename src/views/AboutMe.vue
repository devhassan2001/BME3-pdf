<template>
    <Hamicon class="hamIcon"/>
    <div class="aboutMe">
        <p>
            Hi, My name is Hassan Tahseen. I live in Iraq in al-sydeya city. I study at the university of technology in the biomedical engineering department. I grow up with a big passion for learning and building stuff from scratch. when I get to the programming industry and saw how you can make so many things from absolute zero to a full piece of art I got so much energy to learn how to do that especially that programming offers you to make a living from almost anywhere. this drives me to learn and learn and learn and put all my effort into this skill and develop it because now it's become my dream and goal of my life. All that is given from Allah alhemdoallah. <span>To contact me: 
                <a href="https://www.instagram.com/invites/contact/?i=1do2f4ra3ljip&utm_content=ih9l413" target="_blank"><i class="fab fa-instagram"></i></a> 
                <a href="https://twitter.com/Fleeha2?s=09" target="_blank"><i class="fab fa-twitter"></i></a>
                <a href="https://t.me/devhassan2001_tyb" target="_blank"><i class="fab fa-telegram-plane"></i></a>
            </span>
        </p>
        <img src="../assets/images/me.jpg" alt="photo of me">
    </div>
</template>

<script>
import Hamicon from '../components/navbar_section/Hamicon.vue'
export default {
    components: {Hamicon}
}
</script>

<style scoped>
    .aboutMe {
        width: 100%;
        margin-top: 40px;
        color: white;
    }
    .aboutMe p {
        font-size: clamp(1rem, 3.5vw, 1.5rem); 
        margin-bottom: 10px;
    }
    .aboutMe img {
        width: 100%;
        border-radius: 20px;
    }
    span a {
        margin-left: 10px;
        font-size: clamp(1.5rem, 3.5vw, 2rem);
        color: #FF00E5;
        font-weight: bold;
        text-decoration: underline;
    }
</style>