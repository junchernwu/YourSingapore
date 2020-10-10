<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style>
html {
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100vh;
}
body.index {
  background-image: url(./assets/IndexBG.png);
  background-repeat: no-repeat;
  background-size: cover;
}

body.about {
  background-image: url(./assets/AboutBG.png);
  background-repeat: no-repeat;
  background-size: cover;
}
body.merchants {
  background-color: black;
}
body.date {
  background-color: black;
}
body.location{
  background-color: black;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}
</style>
