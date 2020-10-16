<template>
  <div id="main">
    <h1>{{this.date}}</h1>
    <div id="maskReminder">
      <h3>😷 MASK UP 😷</h3>
    </div>
    <div v-for="activity in plannedActivities" v-bind:key="activity.id">
      <PlannedActivity v-bind:activity="activity"></PlannedActivity>
    </div>
    <!-- Eateries REPLACE ROUTER LINK!!-->
    <button class="ui button" v-on:click="$router.push('/home')">Explore Food Options</button>
    <!-- Attractions REPLACE ROUTER LINK!!-->
    <button class="ui button" v-on:click="$router.push('/activityList')">Explore More Attractions</button>
  </div>
</template>

<script>
import PlannedActivity from "@/components/PlannedActivity";
import axios from 'axios';

export default {
  name: "Planner.vue",
  components: {PlannedActivity},
  data() {
    return {
      date: '',
      plannedActivities: [],
      final_results: [],
    }
  },

  methods: {
    fetchData : async function(name){
      const URL="https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query="+name+"&key=AIzaSyAO8NFaYvyURO_o-4KvCmhyMqPfx3LNemI";
      return await axios.get(URL).then(response=>{
        this.results=response.data.results;
        // Only obtain the top result
        var address = this.results[0].formatted_address
        console.log("ADDRESS: " + address)
        return address
      }).catch(error => console.log(error))
    },
  },

  mounted() {
    var plannedActivity = {
      name: '',
      address: '',
      picture: '',
      hour: '',
      min: '',
      am: '',
    };
    if (sessionStorage.date) {
      this.date = sessionStorage.date;
    }
    if(sessionStorage.hour){
      plannedActivity.hour = sessionStorage.hour //Session storage: Once added to the planner, need to store the value in a separate variable bc once they add another attraction, the previous value will disappear
    }
    if(sessionStorage.min){
      plannedActivity.min = sessionStorage.min
    }
    if(sessionStorage.am){
      plannedActivity.am = sessionStorage.am
    }
    if (sessionStorage.picture) {
      plannedActivity.picture = sessionStorage.picture
    }
    plannedActivity.address = this.address
    if(sessionStorage.name){
      console.log('NAME')
      plannedActivity.name = sessionStorage.name
      this.fetchData(plannedActivity.name).then(value => {
        plannedActivity.address = value;
      })
      // add plannedActivity to plannedActivities array
      this.plannedActivities.push(plannedActivity)
    }
  },
}
</script>

<style scoped>
  #main {
    width: 60%;
    position: relative;
    left: 20%;
    top: 40px;
  }

  #maskReminder {
    background-color: rgba(255,248,248,0.2);
    padding: 20px 30px;
    border-radius: 20px;
    text-align: center;
    margin: 15px 0;
  }

  .ui.button {
    margin: 0 10px;
    padding: 5px 10px;
  }
</style>