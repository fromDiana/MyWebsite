<template>
    <ImageIntroduction />
    <div class="profile-intro page-wrapper" id="profile-intro">
        <h1>Hi, I'm Diana.</h1>
        <ul class="bullet-point-list">
            <li>I got my computer science bachelor's degree at <a href="fei.tuke.sk" target="_blank">FEI TUKE</a> 🎓</li>
            <li>My passion is creating websites in vue.js 💻 and games in Unity 🎮</li>
            <li>Since I did well in my studies 📚, I managed to get to teaching and tutoring</li>
            <li>I have knowledge also in C/C#, Python, PostgreSQL, Java</li>
            <li>Outside of programming I go gym 💪, 3D print or do video / photo editing 📷</li>
        </ul>
        <p></p>
    </div>
    <WorkExperience id="work-experience" />
    <MyPortfolio id="portfolio" />
    
</template>

<script>
import ImageIntroduction from '@/components/ImageIntroduction.vue';
import WorkExperience from '@/components/WorkExperience.vue';
import MyPortfolio from '@/components/MyPortfolio.vue';

export default {
    name: 'MainPage',
    components: {
        ImageIntroduction,
        WorkExperience,
        MyPortfolio
    }
}
</script>

<style>
.profile-intro {
    margin: 0 auto;
    text-align: left;
    /* padding: 20px; */
}

.bullet-point-list {
    list-style: none;
    padding: 0;
}

.bullet-point-list li {
    position: relative;
    padding-left: 30px;
    margin-bottom: 10px;
}

.bullet-point-list li:before {
    content: '◌';
    position: absolute;
    left: 5px;
    top: -3px;
    color: #00ffff;
    font-size: 20px;
}

</style>