<template>
  <div id="app">
 <app-header v-bind:msg="title"></app-header>
  <router-view></router-view>
  
  </div>
</template>

<script>
//Registering component Locally

import Header from './components/Header.vue'
//import Home from './components/Home.vue'

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

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
