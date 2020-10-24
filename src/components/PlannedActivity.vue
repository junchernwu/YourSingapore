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

</style>