<template>
    <div class="page-wrapper">
        <h1>My Portfolio</h1>
        <div class="my-portfolio">
            <ProjectComponent v-for="project in projects" :key="project.id" :image="project.image" :name="project.name"
                :link="project.link" :description="project.description" />
        </div>
    </div>
</template>

<script>
import ProjectComponent from './ProjectComponent.vue';
import projects from '@/js/projects';

export default {
    components: {
        ProjectComponent
    },
    data() {
        return {
            projects: projects,
        };
    }
}
</script>

<style>
.my-portfolio {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 20px;
    align-items: flex-start;
}
</style>