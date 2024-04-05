<template>
  <HeaderComponent />
  <RouterView />
  <FooterComponent />
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.css';
import FooterComponent from './components/FooterComponent.vue';
import HeaderComponent from './components/HeaderComponent.vue';

export default {
  name: 'App',
  components: {
    FooterComponent,
    HeaderComponent
  }
}
</script>

<style>
#app {
  font-family: 'Roboto mono', monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  background-color: #14161e;
}

html,
body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  -ms-overflow-style: none;
  scrollbar-width: none;
  scroll-behavior: smooth;
}

.page-wrapper {
  width: 1080px;
  margin: 0 auto;
}

a {
  color: #c485ff;
  text-decoration: none;
  transition: color 0.3s;
}

a:hover {
  color: #00ffff;
}

::-webkit-scrollbar {
  display: none;
}

hr {
  width: 100%;
  border: 0;
  height: 1px;
  background: #c485ff88;
  margin: 1em 0;
}

@media(max-width: 500px) {
  .page-wrapper {
    width: auto;
    padding: 0 20px;
  }
}
</style>
