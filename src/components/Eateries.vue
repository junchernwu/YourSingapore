<template>
  <div id="page" class="main">
    <div class="col-md-12" :style="{position: 'fixed', width: '100%', zIndex: '1', top:'0px'}">
      <iframe
        frameborder="0"
        style="width: 100%; height: 330px; border:0"
        v-bind:src="
          'https://www.google.com/maps/embed/v1/directions?key=AIzaSyAO8NFaYvyURO_o-4KvCmhyMqPfx3LNemI&mode=walking&origin=' +
            this.origin +
            '&destination=' +
            this.search +
            
            '&avoid=tolls|highways'
        "
        allowfullscreen
      ></iframe>
    </div>

    <section>
      <nav>
        <div class="ui icon input" :style="{width: 'calc(100% - 10px)', minWidth: '300px'}">
          <input
            class="prompt"
            type="text"
            v-model="origin"
            placeholder="Search Attractions"
            v-on:change="fetchData()"
          />
          <i class="search icon"></i>
        </div>
        <div class="ui icon input" id="place" :style="{width: 'calc(100% - 10px)', minWidth: '300px'}">
          <input
            class="prompt"
            type="text"
            v-model="restaurant"
            placeholder="Search Restaurant"
          />
        </div>
        <div class="innerbox">
          <div class="row">
            <p id="datetitle">DATE</p>
            <p id="date">{{ date }}</p>
            <div style="clear:both;"></div>
          </div>
          <div class="row">
            <p id="datetitle">TIME</p>
            <div id="timingInput">
              <select class="dropdown" name="hour" id="time" v-model="hour">
                <option value="Hour">Hour</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
              <select class="dropdown" name="min" id="min" v-model="min">
                <option value="Minute">Minute</option>
                <option value="00">00</option>
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="45">45</option>
              </select>
              <select class="dropdown" name="am" id="am" v-model="am">
                <option value="am">am</option>
                <option value="pm">pm</option>
              </select>
            </div>
          </div>
        </div>
        <div id = "buttons">
          <button id="plannerButton" v-on:click="toPlanner">
            PLANNER
          </button>
          <button id="attractionButton" v-on:click="toAttraction">
            ATTRACTIONS
          </button>
        </div>
      </nav>
      <div id="content">
        <ul>
          <li v-for="item in filtersearch" v-bind:key="item.name">
            <img v-bind:src="get_pic(item.photos[0].photo_reference)" />
            <aside>
              <h3>{{ item.name.trim() }}</h3>
              <br />
              <h5>{{ item.formatted_address.trim() }}</h5>

             <div>
                <button v-on:click="getEatery(item.formatted_address.trim())">
                  GET DIRECTIONS
                </button>
                <button v-on:click="persist(item)">
                  ADD TO PLANNER

                </button>
              </div>
            </aside>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      search: this.$route.params.name,
      origin: this.$route.params.name,
      location: "",
      results: [],
      restaurant: "",
      final_results: [],
      date: "",
      hour: 0,
      min: 0,
      am: "",
    };
  },
  computed: {
    filtersearch() {
      return this.final_results.filter((obj) => {
        return obj.name.toLowerCase().includes(this.restaurant.toLowerCase());
      });
      
    },
  },
  methods: {
    toPlanner: function() {
      this.$router.push('/planner')
    },
    toAttraction: function() {
      this.$router.push('/activityList')
    },
    fetchData: function () {
      this.final_results = [];
      if (!this.origin.includes("Sinagpore")) {
        this.origin = this.origin + " Singapore"
      }
      const URL =
          "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+"
          + this.origin + "&key=AIzaSyAO8NFaYvyURO_o-4KvCmhyMqPfx3LNemI";
      axios
          .get(URL)
          .then((response) => {
            this.results = response.data.results;
            for (let key in this.results) {
              if (this.results[key].business_status == "OPERATIONAL") {
                console.log("photos" in this.results[key]);
                if ("photos" in this.results[key]) {
                  this.final_results.push(response.data.results[key]);
                }
              } else {
                var v = [{photo_reference: this.results[key].icon}];
                this.results[key]["photos"] = v;

                this.final_results.push(this.results[key]);
              }
            }
          })
          .catch((error) => console.log(error));
    },
    get_pic: function (x) {
      var link =
          "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" +
          x +
          "&key=AIzaSyAO8NFaYvyURO_o-4KvCmhyMqPfx3LNemI";
      return link;
    },
    open: function (y) {
      if ("" + y == true) {
        var msg = "Currently Open";
        return msg;
      } else {
        var msgs = "Currently Close";
        return msgs;
      }
    },
    getEatery: function (x) {
      console.log(x)
      this.search = x;
      this.item = x;
    },
    checkTimingClash: function () {
      var clash = false;
      if (sessionStorage.plannedActivities) {
        var activities = JSON.parse(sessionStorage.plannedActivities);
        for (var i = 0; i < activities.length; i++) {
          var activity = activities[Object.keys(activities)[i]];
          var hourTiming = activity.hour;
          var minTiming = activity.min;
          var amTiming = activity.am;
          // If clashing time, alert user
          if (hourTiming == this.hour) {
            if (minTiming == this.min) {
              if (amTiming == this.am) {
                clash = true;
              }
            }
          }
        }
      }
      if (clash) {
        alert('There is a clash in timing with your planned activities')
      } else {
        // route to planner page
        this.$router.push('/planner');
      }
    },

    checkTimingFilled: function () {
      if (this.hour == 0) {
        if (this.min == 0) {
          return false
        }
      }
      return true
    },
    persist: function (item) {
      if (this.hour != 0) {
        sessionStorage.hour = this.hour;
        sessionStorage.min = this.min;
        sessionStorage.am = this.am;
        sessionStorage.name = item.name;
        sessionStorage.picture = this.get_pic(item.photos[0].photo_reference);
        sessionStorage.address = item.formatted_address.trim();
        sessionStorage.exploreFood = false;
        console.log(item.formatted_address.trim());
        if (this.checkTimingFilled()) {
          this.checkTimingClash();
        } 
      }else {
          alert("The time of visit is not selected")
        }
    },
  },
    beforeCreate: function() {
    document.body.className = "eateries";
  },
    created() {
    this.fetchData();
    console.log(this.final_results)
  },
    mounted() {
      if (sessionStorage.date) {
        this.date = sessionStorage.date;
      }
      if (sessionStorage.hour) {
        this.hour = sessionStorage.hour; //Session storage: Once added to the planner, need to store the value in a separate variable bc once they add another attraction, the previous value will disappear
      }
      if (sessionStorage.min) {
        this.min = sessionStorage.min;
      }
      if (sessionStorage.am) {
        this.am = sessionStorage.am;
      }
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  color: rgb(148, 155, 155);
  float: left;
  font-size: 25px;
  margin-bottom: 1px;
  text-align: justify;
}
a, button {
  background-color:rgb(255, 46, 81);
  color:white;
  padding: 7px 20px;
  border-radius:20px;
  font-weight: bolder;
  font-size: 13px;
  border:none;
  margin-top: 5px;
  margin-right: 30px;
  float: left;
}
.innerbox {
  background-color: rgba(82, 82, 100, 0.554);
  width: calc(100% - 5px);
  border-radius: 20px;
  padding: 20px;
  margin-left: 10px;
  height: 100px;
  min-width: 300px;
}
#buttons {
  width: calc(100% - 5px);
  min-width: 300px;
}
#plannerButton {
  margin-left: 10px;
  float: left;
  width: 48%;
  margin-top: 15px;
  margin-right: 0;
  border-radius: 10px;
}
#attractionButton {
  border-radius: 10px;
  float: right;
  width: 48%;
  position: relative;
  right: -10px;
  margin-right: 0;
  margin-top: 15px;
}
.row {
  width: 100%;
}
#datetitle {
  float: left;
  width: 30%;
  color: gray;
  margin: 0;
}
select {
  border-color: rgba(255, 255, 255, 0.295);
  background: none;
  color: white;
  padding: 2px;
}
#time {
  float: left;
  margin: 0;
}
#timingInput {
  float: right;
  width: 70%;
}
#date {
  float: right;
  width: 70%;
  color: rgb(245, 245, 245);
}
h5 {
  color: white;

  font-size: 15px;
  text-align: left;
}
aside {
  width: calc(90% - 300px);
  padding-left: 10px;
  margin-left: 10px;
  float: right;
  position: relative;
  top: 5%;
}
#place {
  padding-top: 20px;
  padding-bottom: 20px;
}
nav {
  float: left;
  width: 20%;
  padding-left: 30px;
  padding-top: 30px;
  height: 800px;
  position: fixed;
  top: 350px;
}

#content {
  float: right;
  padding: 0px;
  text-align: right;
  width: 75%;
  max-width: calc(100vw - 350px);
  position: relative;
}
section {
  position: relative;
  top: 260px
}
img {
  width: 300px;
  height: 200px;
  float: left;
  margin-left: 50px;
  border-radius: 20px;
}
ul {
  display: flex;
  flex: 100%;
  flex-basis: auto;
  text-align: right;
  position: relative;
  display: block;
  padding-top: 1px;
}
li {
  background: rgba(82, 82, 100, 0.554);
  border-radius: 20px;
  text-align: right;
  padding: 50px;
  margin: 20px;
  display: block;
  position: static;
  margin-left: 1.5%;
  width: 90%;
  height:300px
}
input {
  padding-left: 5px;
  border-radius: 15px;
  border: none;
  width: 250px;
  height: 25px;
  position: relative;
  left: 4%;
}
.dropdown {
  background-color: #343E53;
}
</style>
