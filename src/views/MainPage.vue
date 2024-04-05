<template>
    <ImageIntroduction />
    <div class="profile-intro" id="profile-intro">
        <h1>Hi, I'm Diana.</h1>
        <ul class="bullet-point-list">
            <li>Web Development enthusiast and WordPress manager</li>
            <li>University instructor for Database Systems</li>
            <li>Leader of a Python club for young students</li>
            <li>Private tutor in mathematics and informatics</li>
        </ul>
        <p>Check out my tutoring profile <a
                href="https://www.doucma.sk/309249-doucovanie-doucovanie-informatiky-od-vysokoskolacky-vyvojarky-hier-a-ucitelky"
                target="_blank">here</a>.</p>
        <p>"Time always finds its way - no excuses."</p>
    </div>
    <ExperienceGraph id="work-experience" />
    <MyPortfolio id="portfolio" />
    
</template>

<script>
import ImageIntroduction from '@/components/ImageIntroduction.vue';
import ExperienceGraph from '@/components/ExperienceGraph.vue';
import MyPortfolio from '@/components/MyPortfolio.vue';

export default {
    name: 'MainPage',
    components: {
        ImageIntroduction,
        ExperienceGraph,
        MyPortfolio
    }
}
</script>

<style>
.profile-intro {
    max-width: 800px;
    margin: 0 auto;
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