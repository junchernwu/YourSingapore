<template>
  <div id="app">
    <component v-bind:is="currentData"> </component>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import ActivityListHeader from './components/ActivityListHeader.vue'
//import Home from './components/Home.vue'

export default {
  name: 'App',
  components: {
    Header,
    ActivityListHeader
  },
  computed:{
    currentData() {
        if (this.$route.path==="/activityList") {
          return ActivityListHeader;}
        
        else {
          return Header;
        }
      }
  }
}
</script>

<style>
html,body {
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100vh;
}

body {
  background-color: #0A223D;
}

body.home {
  background-image: url(./assets/IndexBG.png);
  background-repeat: no-repeat;
  background-size: cover;
}

body.about {
  background-image: url(./assets/AboutBG.png);
  background-repeat: no-repeat;
  background-size: cover;
}
body.date {
  background-image: url(./assets/DateBG.png);
  background-repeat: no-repeat;
  background-size: cover;
}
body.location{
  background-image: url(./assets/LocationBG.png);
  background-repeat: no-repeat;
  background-size: cover;
}
body.activityList{
  background-color: #0A223D;
}
body.reminder{
  background-image: url(./assets/ReminderBG.png);
  background-repeat: no-repeat;
  background-size: cover;
}
body.merchants{
  background-color: #0A223D;
}
body.details{
  background-color: #0A223D;
}
body.dashboard{
  background-color: #0A223D;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
}


</style>

