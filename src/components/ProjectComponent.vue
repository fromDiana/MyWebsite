<template>
    <div class="project-card" @click="goToUrl()">
        <div class="project-image">
            <img :src="image" :alt="name" />
        </div>
        <div class="project-details">
            <h3 class="project-name" v-html="name"></h3>
            <p class="project-description" v-html="description"></p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        image: {
            type: String,
            required: false
        },
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false,
            default: ''
        },
        link: {
            type: String,
            required: false,
            default: ''
        }
    },
    methods: {
        goToUrl() {
            if (this.link) {
                window.open(this.link, '_blank');
            }
        }
    }
}
</script>

<style scoped>
.project-card {
    border: 2px solid #00ffff;
    border-radius: 20px;
    overflow: hidden;
    transition: transform 0.2s ease-in-out;
    cursor: pointer;
}

.project-card:hover {
    transform: translateY(-10px);
}

.project-image img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    object-position: top;
}

.project-details {
    padding: 15px;
}

.project-name {
    margin: 0;
    padding-bottom: 8px;
}

.project-description {
    margin: 0;
    color: #858585;
    font-size: 1.05em;
    line-height: 1.4em;
}
</style>