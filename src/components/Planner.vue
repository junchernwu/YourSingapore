<template>
  <div id="main">
    <h1>{{this.date}}</h1>
    <div id="maskReminder">
      <h3>😷 MASK UP 😷</h3>
    </div>
    <div v-for="activity in plannedActivities" v-bind:key="activity.id">
      <PlannedActivity v-bind:activity="activity"></PlannedActivity>
    </div>
    <!-- SHARE -->
<!--    <a href="mailto:?subject=Your%20Singapore%20Itinerary&body=Hello%20there!%0D%0A%0D%0AGiven%20that%20air-travel%20won't%20be%20happening%20soon%2C%20I%20have%20decided%20to%20plan%20a%20holiday%20in%20Singapore%20.%20Attached%20is%20my%20planned%20itinerary.%20%0D%0A%0D%0AIt%20would%20be%20great%20if%20you%20could%20join%20me%20on%20my%20adventure!%20%3AD">-->
<!--      <button class="ui button">Share</button>-->
<!--    </a>-->
    <button class="ui button" v-on:click="share">Share</button>
    <!-- Eateries REPLACE ROUTER LINK!!-->
    <button class="ui button" v-on:click="$router.push('/home')">Explore Food Options</button>
    <!-- Attractions REPLACE ROUTER LINK!!-->
    <button class="ui button" v-on:click="$router.push('/activityList')">Explore More Attractions</button>
  </div>
</template>

<script>
import PlannedActivity from "@/components/PlannedActivity";
import axios from 'axios';
import html2canvas from 'html2canvas';

export default {
  name: "Planner.vue",
  components: {PlannedActivity},
  data() {
    return {
      date: '',
      plannedActivities: [],
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
    share: async function() {
      html2canvas(document.body, {allowTaint: true, useCORS: true}).then(function(canvas) {
        console.log("SHARREEEE")
        console.log(canvas)
        var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
        window.location.href=image; // it will save locally
      });
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