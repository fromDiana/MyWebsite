<template>
  <RouterView />
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Roboto mono', monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: white;
  background-color: #181818;
}

html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  width: 100%;
  height: 100%;  /* comment out to see the footer */
  display:flex;
  flex-direction: column;
  justify-content: center;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.page-wrapper {
  width:1080px;
  margin: 0 auto;
}

::-webkit-scrollbar {
    display: none;
}
</style>
