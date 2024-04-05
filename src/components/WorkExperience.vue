<template>
    <div class="page-wrapper">
        <div class="experience-graph">
            <h1>Work Experience</h1>
            <div class="jobs">
                <JobBlock title="College Instructor" duration="2023 - Present"
                    description="I held lectures of Fundamentals of PROG and Database systems."
                    link="https://fei.tuke.sk/" linkText="fei.tuke.sk" :skills="['C', 'PostgreSQL']" />

                <JobBlock title="Web Dev & Manager" duration="2023 - Present" description="I manage
        <a href='https://gamedays.sk' target=_blank>gamedays.sk</a> and 
        <a href='https://dbtbgame.com' target=_blank>dbtbgame.com</a>
            in WordPress and specify in frontend at hackathons." :skills="['WordPress', 'Vue', 'HTML', 'CSS']" />

                <JobBlock title="Primary school teacher" duration="2023 - Present"
                    description="I teach Python courses at primary school Kežmarská 30."
                    link="https://www.programko.sk/" linkText="programko.sk" :skills="['Python']" />

                <JobBlock title="Informatics Tutor" duration="2021 - Present"
                    description="I tutor informatics to all age groups up to my level."
                    link="https://www.doucma.sk/309249-doucovanie-doucovanie-informatiky-od-vysokoskolacky-vyvojarky-hier-a-ucitelky"
                    linkText="doucma.sk" :skills="['Java', 'Python', 'C']" />
            </div>
            <hr> 
            <div class="jobs">

                <JobBlock title="Unity Game Developer" duration="2023 - March 2024"
                    description="At a slovak gaming studio I contributed to development of an unfinished aRPG game which is a sequel to
            <a href='https://store.steampowered.com/app/404590/Vikings__Wolves_of_Midgard/' target=_blank>Vikings</a>
            and an upcoming survival game
            <a href='https://store.steampowered.com/app/2820820/Jtunnslayer_Hordes_of_Hel/' target=_blank>Jöttunslayer</a>." link="https://www.games-farm.sk" linkText="games-farm.sk"
                    :skills="['C#', 'Unity']" />
            </div>
        </div>
    </div>
</template>

<script>
import JobBlock from './JobBlock.vue';

export default {
    name: 'WorkExperience',
    components: {
        JobBlock
    }
}
</script>

<style>
.experience-graph {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.jobs {
    display: flex;
    justify-content: center;
}

@media(max-width: 500px) {
    .jobs {
        flex-direction: column;
        box-sizing: border-box;
        width: auto;
    }

    .connector {
        display: none;
    }
}
</style>