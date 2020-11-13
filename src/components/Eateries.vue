<template>
  <div id="page" class="main">
    <div class="col-md-12">
      
      <iframe
        frameborder="0"
        style="width: 100%; height: 250px; border:0"
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
        <div class="ui icon input">
          <input
            class="prompt"
            type="text"
            v-model="origin"
            placeholder="Search Attractions"
            v-on:change="fetchData()"
          />
          <i class="search icon"></i>
        </div>
        <div class="ui icon input" id="place">
          <input
            class="prompt"
            type="text"
            v-model="restaurant"
            placeholder="Search Restaurant"
          />
        </div>

        <div class="innerbox">
          <p id="datetitle">DATE</p>
          <p id="datetitle">TIME</p>

          <p id="date">{{ date }}</p>

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
      </nav>
      <div id="content">
        <ul>
          <li v-for="item in filtersearch" v-bind:key="item.name">
            <img v-bind:src="get_pic(item.photos[0].photo_reference)" />
            <aside>
              <h3>{{ item.name.trim() }}</h3>
              <br />
              <h5>{{ item.formatted_address.trim() }}</h5>

              <button id="direction" v-on:click="getEatery(item.formatted_address.trim())">Get Directions</button>
             <div>
                <button id="button" v-on:click="persist(item)">
                  Add to planner
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
  text-align: center;
}
#direction{
  padding: 60%;
  color: rgb(97, 89, 89);
  padding: 7px 20px;
  border-radius: 10px;
  margin-top: 20px;
  padding-bottom: 5px;
  margin-right: 100px;
  background-color: rgb(10, 106, 161);
  color: azure;
}
#button {
  padding: 60%;
  color: rgb(97, 89, 89);
  padding: 7px 20px;
  border-radius: 10px;
  margin-top: 20px;
  padding-bottom: 5px;
  margin-right: 100px;
  background-color: rgb(190, 33, 5);
  color: azure;
}
.innerbox {
  background-color: rgba(82, 82, 100, 0.554);
  width: 180%;
  border-radius: 20px;
  padding-left: 5%;
  padding-top: 1%;
  padding-bottom: 5%;
}
#datetitle {
  float: left;
  width: 50%;
  color: gray;
}
#time {
  margin-bottom: 10px;
}
#date {
  float: left;
  width: 50%;
  margin-top: -10px;
  color: rgb(245, 245, 245);
}
h5 {
  color: white;

  font-size: 15px;
  text-align: left;
}
aside {
  width: 60%;
  padding-left: 10px;
  margin-left: 10px;
  float: right;
  font-style: Times;
}
#place {
  padding-top: 20px;
  padding-bottom: 20px;
}
nav {
  float: left;
  width: 18%;
  padding-left: 30px;
  padding-top: 30px;
  height: 800px;
  position: fixed;
}
.bar {
  float: left;
  padding-right: 200px;
}

#content {
  float: right;
  padding: 0px;
  text-align: right;
  width: 68%;
}
section {
  height: 6200px;
}
img {
  width: 300px;
  height: 200px;
 
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
  background: rgb(66, 66, 73);
  text-align: right;
  padding: 50px;
  margin: 20px;
  display: block;
  position: static;
  float: right;
  width: 100%;
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
</style>
