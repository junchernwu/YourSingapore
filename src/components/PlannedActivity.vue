<template>
  <div>
    <p id="date">
      {{activity.hour}}:{{activity.min}}
      <br>
      {{activity.am}}
    </p>
    <img v-bind:src="activity.picture">
    <div id="details">
      <p id="name">{{activity.name}}</p>
      <location-icon></location-icon>
      <p id="address">{{activity.address}}</p>
    </div>
    <div id="button">
      <button v-on:click="deleteActivity(activity.name)" type="button">x</button>
    </div>
  </div>
</template>

<script>
import LocationIcon from 'vue-material-design-icons/MapMarker.vue';

export default {
  name: "PlannedActivity.vue",
  props: {
    activity: {
      type: Object,
    }
  },
  components: {
    LocationIcon,
  },
  methods: {
    deleteActivity: function(name) {
      console.log("DELETE")
      var plannedActivities = JSON.parse(sessionStorage.plannedActivities)
      for (var i = 0; i < plannedActivities.length; i++) {
        // remove attraction based on name
        if (plannedActivities[i].name.valueOf() == name.valueOf()) {
          console.log("CHECK INDEX: " + i);
          console.log("BEFORE DELETE: " + plannedActivities.length);
          plannedActivities.splice(i, 1);
          console.log("AFTER DELETE: " + plannedActivities.length);
          sessionStorage.plannedActivities = JSON.stringify(plannedActivities);
          sessionStorage.removeItem('hour');
          sessionStorage.removeItem('min');
          sessionStorage.removeItem('am');
          sessionStorage.removeItem('name');
          sessionStorage.removeItem('picture');
          document.location.reload();
        }
      }
    }
  }
}
</script>

<style scoped>
  div {
    background-color: rgba(255,248,248,0.2);
    padding: 20px 30px;
    border-radius: 20px;
    margin: 15px 0;
    overflow: hidden;
  }

  #date {
    width: 10%;
    text-align: center;
    font-size: large;
    font-weight: bold;
    line-height: 1;
    float: left;
    position: relative;
    top: 40px;
  }

  img {
    margin: 0 20px;
    width: 25%;
    border-radius: 20px;
    float: left;
  }

  h3 {
    position: relative;
    margin: 0;
    left: 5%;
  }

  #details {
    background-color: transparent;
    margin: 0;
    padding: 0;
    border-radius: 0;
    text-align: left;
    position: relative;
    left: 5%;
    top: 15px;
    width: 50%;
  }

  #name {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  #address {
    font-size: 16px;
    position: relative;
    float: right;
    width: 90%;
    top: 2px;
    left: -4%;
  }

  location-icon {
    position: relative;
    float: left;
    width: 5%;
  }

  #button {
    float: right;
    position: relative;
    padding: 5px;
    margin: 0;
    top: -70px;
    right: -15px;
    background: transparent;
  }

  button {
    background: none;
    border: none;
    color: white;
    font-weight: bold;
  }

</style>