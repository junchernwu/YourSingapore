<template>
  <div id="app">
    <app-header v-bind:msg="title"></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
//Registering component Locally

import Header from './components/Header.vue'

export default {
  //Registering component Locally
  components:{
    'app-header':Header,
  },
  data(){
    return{
      title:"YOUR SINGAPORE"
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  background-color: #0A223D;
  height: 100vh;
  padding: 0px;
  margin: 0px;
}
body {
  margin: 0px;
  background-color: #0A223D;
}
</style>

