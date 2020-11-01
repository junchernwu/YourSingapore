<template>
  <div id="main">
    <h1>{{this.date}}</h1>
    <div id="maskReminder">
      <h3>😷 MASK UP 😷</h3>
    </div>
    <div v-for="activity in plannedActivities" v-bind:key="activity.id">
      <PlannedActivity v-bind:activity="activity"></PlannedActivity>
    </div>
    <button class="ui button" v-on:click="share">Share</button>

    <!-- Attractions -->


    <button class="ui button" v-on:click="$router.push('/activityList')">Explore More Attractions</button>
  </div>
</template>

<script>
import PlannedActivity from "@/components/PlannedActivity";
import html2canvas from 'html2canvas';
import { storage } from "@/firebase/";

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
    share: function() {
      html2canvas(document.body, {allowTaint: true, useCORS: true}).then(function(canvas) {
        console.log("SHARREEEE")
        console.log(canvas)
        // Create unique identifier UUID
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = (dt + Math.random()*16)%16 | 0;
          dt = Math.floor(dt/16);
          return (c=='x' ? r :(r&0x3|0x8)).toString(16);
        });

        //var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
        // window.location.href=image;// it will save locally

        // STORE PLANNER IN FIREBASE
        var storageRef = storage.ref();
        canvas.toBlob(function(blob){
          var image = new Image();
          image.src = blob;
          var plannerRef = storageRef.child('images/planner/' + uuid);
          plannerRef.put(blob).then(function() {
            plannerRef.getDownloadURL().then(function(result){
              // call out email client
              var message = "mailto:?subject=Your%20Singapore%20Itinerary&body=Hello%20there!%0D%0A%0D%0AGiven%20that%20air%20travel%20won't%20be%20happening%20soon%2C%20I%20have%20decided%20to%20plan%20a%20holiday%20in%20Singapore.%20It%20would%20be%20great%20if%20you%20could%20join%20me%20on%20my%20trip%20%3AD%20%0D%0A%0D%0AAttached%20is%20my%20itinerary.%20" + encodeURIComponent(result);
              console.log(message);
              console.log(result);
              window.location.href = message;
            });
          });
        });
      });
    },
  },

  mounted() {
    if (sessionStorage.plannedActivities) {
      this.plannedActivities = JSON.parse(sessionStorage.plannedActivities)
    }
    var plannedActivity = {
      name: '',
      address: '',
      picture: '',
      hour: '',
      min: '',
      am: '',
    };
    if (sessionStorage.date) {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      this.date = new Date(sessionStorage.date).toLocaleDateString("en-US", options);
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
    if (sessionStorage.address) {
      plannedActivity.address = sessionStorage.address
    }
    if(sessionStorage.name){
      plannedActivity.name = sessionStorage.name
      // add plannedActivity to plannedActivities array
      var added = false;
      for (var i = 0; i < this.plannedActivities.length; i++) {
        // If add same attraction, different time, it REPLACES the old time
        if (this.plannedActivities[i].name.valueOf() == plannedActivity.name.valueOf()) {
          this.plannedActivities[i] = plannedActivity;
          added = true;
          break;
        }
      }
      if (!added) {
        this.plannedActivities.push(plannedActivity);
      }
      //SORT ACCORDING TO TIME
      this.plannedActivities.sort(function(a, b){
        if (a.am == "am" & b.am == "pm") {
          return -1;
        } else if (b.am == "am" & a.am == "pm") {
          return 1;
        } else {
          if (a.hour == b.hour) {
            return a.min - b.min;
          } else {
            return a.hour - b.hour;
          }
        }
      });
      sessionStorage.plannedActivities = JSON.stringify(this.plannedActivities);
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