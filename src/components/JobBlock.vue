<template>
    <div class="job-block">
        <div class="job-title">{{ title }}</div>
        <div class="job-duration">{{ duration }}</div>
        <div class="job-description" v-html="description"></div>
        <a :href="this.link" target=_blank>{{ linkText }}</a>
    <ul class="skills-list">
      <li v-for="(skill, index) in skills" :key="index" class="skill">{{ skill }}</li>
    </ul>
    </div>
</template>

<script>
export default {
    name: 'JobBlock',
    props: {
        title: String,
        duration: String,
        description: String,
        link: String,
        linkText: String,
    skills: Array
    }
}
</script>

<style scoped>
.job-block {
    /* border: 2px solid #c485ff; */
    border: 2px solid #00ffff;
    border-radius: 20px;
    padding: 20px;
    margin: 10px;
    text-align: center;
    width: 200px;
    height: stretch;
}

.job-title {
    font-size: 1.2em;
    margin-bottom: 5px;
    font-weight: bold;
}

.job-duration {
    font-size: 0.9em;
    color: #858585;
}
.job-description {
    margin: 10px 0;
    font-size: 1.05em;
    line-height: 1.4em;
}
.skills-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-top: 10px;
  margin-bottom: 0;
}

.skill {
  background-color: #2c2a3d;
  color: #ecf0f1;
  padding: 5px 15px;
  border-radius: 15px;
  font-size: 0.8em;
}

@media(max-width: 500px) {
    .job-block {
        width: auto;
        margin: 5px 20px;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
    }
    .job-description {
        font-size: 1em;
    }
}
</style>