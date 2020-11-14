<template>
  <div class="main">
    <div class="left">
      <img v-bind:src="attraction.picture">
      <h1 id="title"> {{attraction.name}}</h1> 
      <p id="desc"> {{attraction.description}} </p>
      <a v-bind:href="attraction.link"> BOOK NOW </a> <!-- Link in database should have https:// in front -->
      <button> <router-link :to="'/eateries/'+ attraction.name">EXPLORE FOOD OPTIONS </router-link></button>
    </div>
    <div class="right">
      <div class= "box" id="box1">
        <h1 id="righttitle"> Add to Planner </h1>
        <div class="innerbox">
          <p id="datetitle"> DATE</p>
          <p id="date">  TIME </p>

          <p id="timetitle"> {{date}}</p>
          <select class="dropdown" name="hour" id="hour" v-model="hour">
              <option value="0" disabled selected>Hour</option>
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
              <option value="0" disabled selected>Minute</option>
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
        <button id="planneradd" v-on:click= "persist"> ADD TO PLANNER </button>
      </div>
      <div class="box time" id="box2">
        <h1 id="righttitle"> Operating hours </h1>
        <div class="leftt">
          <!-- MONDAY -->
          <div class="operatingHour">
            <h5 class="opDay">Monday</h5>
            <div class="opTime">
              <div v-if="attraction.operations.mon.open">
                <p>{{attraction.operations.mon.start.hour}}{{attraction.operations.mon.start.min}}{{attraction.operations.mon.start.am}} - {{attraction.operations.mon.end.hour}}{{attraction.operations.mon.end.min}}{{attraction.operations.mon.end.am}}</p>
              </div>
              <div v-else>
                <p>Not Open</p>
              </div>
            </div>
          </div>
          <!-- TUESDAY -->
          <div class="operatingHour">
            <h5 class="opDay">Tuesday</h5>
            <div class="opTime">
              <div v-if="attraction.operations.tue.open">
                <p>{{attraction.operations.tue.start.hour}}{{attraction.operations.tue.start.min}}{{attraction.operations.tue.start.am}} - {{attraction.operations.tue.end.hour}}{{attraction.operations.tue.end.min}}{{attraction.operations.tue.end.am}}</p>
              </div>
              <div v-else>
                <p>Not Open</p>
              </div>
            </div>
          </div>
          <!-- WEDNESDAY -->
          <div class="operatingHour">
            <h5 class="opDay">Wednesday</h5>
            <div class="opTime">
              <div v-if="attraction.operations.wed.open">
                <p>{{attraction.operations.wed.start.hour}}{{attraction.operations.wed.start.min}}{{attraction.operations.wed.start.am}} - {{attraction.operations.wed.end.hour}}{{attraction.operations.wed.end.min}}{{attraction.operations.wed.end.am}}</p>
              </div>
              <div v-else>
                <p>Not Open</p>
              </div>
            </div>
          </div>
          <!-- THURSDAY -->
          <div class="operatingHour">
            <h5 class="opDay">Thursday</h5>
            <div class="opTime">
              <div v-if="attraction.operations.thu.open">
                <p>{{attraction.operations.thu.start.hour}}{{attraction.operations.thu.start.min}}{{attraction.operations.thu.start.am}} - {{attraction.operations.thu.end.hour}}{{attraction.operations.thu.end.min}}{{attraction.operations.thu.end.am}}</p>
              </div>
              <div v-else>
                <p>Not Open</p>
              </div>
            </div>
          </div>
        </div>
        <div class="rightt">
          <!-- FRIDAY -->
          <div class="operatingHour">
            <h5 class="opDay">Friday</h5>
            <div class="opTime">
              <div v-if="attraction.operations.fri.open">
                <p>{{attraction.operations.fri.start.hour}}{{attraction.operations.fri.start.min}}{{attraction.operations.fri.start.am}} - {{attraction.operations.fri.end.hour}}{{attraction.operations.fri.end.min}}{{attraction.operations.fri.end.am}}</p>
              </div>
              <div v-else>
                <p>Not Open</p>
              </div>
            </div>
          </div>
          <!-- SATURDAY -->
          <div class="operatingHour">
            <h5 class="opDay">Saturday</h5>
            <div class="opTime">
              <div v-if="attraction.operations.sat.open">
                <p>{{attraction.operations.sat.start.hour}}{{attraction.operations.sat.start.min}}{{attraction.operations.sat.start.am}} - {{attraction.operations.sat.end.hour}}{{attraction.operations.sat.end.min}}{{attraction.operations.sat.end.am}}</p>
              </div>
              <div v-else>
                <p>Not Open</p>
              </div>
            </div>
          </div>
          <!-- SUNDAY -->
          <div class="operatingHour">
            <h5 class="opDay">Sunday</h5>
            <div class="opTime">
              <div v-if="attraction.operations.sun.open">
                <p>{{attraction.operations.sun.start.hour}}{{attraction.operations.sun.start.min}}{{attraction.operations.sun.start.am}} - {{attraction.operations.sun.end.hour}}{{attraction.operations.sun.end.min}}{{attraction.operations.sun.end.am}}</p>
              </div>
              <div v-else>
                <p>Not Open</p>
              </div>
            </div>
          </div>
        </div>
      </div>
       <div class="box price" id="box3">
        <h1 id="righttitle"> Pricing Options </h1>
        <ul>
          <li v-for="field in attraction.pricing" v-bind:key="field.category">
            <div id="pricefield">
              <p id="value"> {{field.category}} </p>
              <p id="value"> {{field.price}} </p>
            </div>
          </li>
        </ul>
      </div>
      <div class="box" id="box4">
        <h1 id="righttitle"> Promotions </h1>
        <p> {{attraction.promotions}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { database } from "@/firebase/";
import firebase from "firebase";

export default {
    data() {
        return {
          date:'',
          hour:0,
          min:0,
          am:'am',
          attractions:[],
          attractionId:this.$route.params.id,
        }
    },
    beforeCreate: function() {
        document.body.className = 'details';
    },
    mounted() {
      if (sessionStorage.date) {
        this.date = sessionStorage.date; 
      }
      if(sessionStorage.hour){
        this.hour = sessionStorage.hour //Session storage: Once added to the planner, need to store the value in a separate variable bc once they add another attraction, the previous value will disappear
      }
      if(sessionStorage.min){
        this.min = sessionStorage.min
      }
      if(sessionStorage.am){
        this.am = sessionStorage.am
      }
      this.updateViews();
    },
    created(){
        this.fetchItems();
    },
    computed:{
        attraction(){
            return this.getAttraction(this.attractions);
        }
    },
  methods: {
    fetchItems: function () {
      database
        .collection("attraction2")
        .get()
        .then((querySnapShot) => {
          let item = {};
          querySnapShot.forEach((doc) => {
            item = doc.data();
            item.id = doc.id;
            this.attractions.push(item);
           
          });
        });
    },
    getAttraction:function(obj){
        return obj.find(obj => obj.id===this.$route.params.id);
    },
    checkTimingClash:function () {
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
    checkTimingFilled: function() {
      if (this.hour == 0) {
        if (this.min == 0) {
          return false
        }
      }
      return true
    },
    persist:function(){
      this.updateAdds();
      sessionStorage.address = this.attraction.address;
      sessionStorage.hour= this.hour;
      sessionStorage.min= this.min;
      sessionStorage.am= this.am;
      sessionStorage.name = this.attraction.name;
      sessionStorage.picture = this.attraction.picture;
      sessionStorage.exploreFood = true;
      if (this.checkTimingFilled()) {
        this.checkTimingClash();
      } else {
        alert('Please Select a Timing')
      }
    },
    
    updateViews: function(){
      database
          .collection("attraction2")
          .doc(this.attractionId).get().then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          var currentDate1= new Date()
          var currentDate=this.formatDate(currentDate1)
          if(currentDate in documentSnapshot.data().stats){
            database
                  .collection("attraction2")
                  .doc(this.attractionId)
                  .update({
                    [`stats.${currentDate}.views`]: firebase.firestore.FieldValue.increment(1)
                  })
          } else{
            database
                  .collection("attraction2")
                  .doc(this.attractionId)
                  .update({
                    [`stats.${currentDate}.views`]: 1,
                    [`stats.${currentDate}.adds`]: 0,
                    [`stats.${currentDate}.date`]: currentDate1
                  })
          }
        
          var bumpStatus = documentSnapshot.data().bump.status;
          if (bumpStatus == false) {
            database
                .collection("attraction2")
                .doc(this.attractionId)
                .update({
                  notBumpViews: firebase.firestore.FieldValue.increment(1),
                })
          } else {
            database
                .collection("attraction2")
                .doc(this.attractionId)
                .update({
                  bumpViews: firebase.firestore.FieldValue.increment(1),
                })
          }
        }
      });
    },
    updateAdds: function(){
      database
          .collection("attraction2")
          .doc(this.attractionId).get().then((documentSnapshot) => {
            if (documentSnapshot.exists) {
                var currentDate1= new Date()
                var currentDate=this.formatDate(currentDate1)
                if(currentDate in documentSnapshot.data().stats){
                  database
                        .collection("attraction2")
                        .doc(this.attractionId)
                        .update({
                          [`stats.${currentDate}.adds`]: firebase.firestore.FieldValue.increment(1)
                        })
                } 
            }
        });
        database
          .collection("attraction2")
          .doc(this.attractionId).get().then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          if(this.date in documentSnapshot.data().arrivals){
            database
                  .collection("attraction2")
                  .doc(this.attractionId)
                  .update({
                    [`arrivals.${this.date}.numArrivals`]: firebase.firestore.FieldValue.increment(1)
                  })
          } else{
            database
                  .collection("attraction2")
                  .doc(this.attractionId)
                  .update({
                    [`arrivals.${this.date}.numArrivals`]: 1,
                  })
          }
        }
      });
    },
    formatDate: function(date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;

      return [year, month, day].join('-');
    }
    },
  }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
  width:100%;
}
.left{
  float:left;
  padding-left:4%;
  padding-top: 4%;
  width:50%;
  overflow: hidden;

}
.right{
  float: left;
  color:white;
  width:50%;
  overflow: hidden;
  padding-left:5%;
  padding-top:4%;
}
img{
  border-radius:10px;
  width:100%;
}
#title{
  color:white;
  font-weight: lighter;
  border-bottom:solid;
  border-color:white;
  border-width: 1px;
  padding-bottom: 5px;
  font-size:40px;

}
#desc{
  color:rgba(244, 245, 245, 0.705);
}
a,button{
  background-color:rgb(255, 46, 81);
  color:white;
  padding:5px;
  border-radius:20px;
  font-weight: bolder;
  margin-right:10px;
  font-size: 10px;
  border:none;
}
.box{
  background-color: rgba(0, 0, 0, 0.342);
  width:90%;
  padding-left:3%;
  padding-top:2%;
  padding-bottom:5%;
  border-radius: 10px;
  margin-bottom:2%;

}
#righttitle{
  font-size:20px;
  font-weight: lighter;
}
.innerbox{
  background-color: rgba(82, 82, 100, 0.554);
  width:90%;
  border-radius: 30px;
  padding-left:8%;
  padding-top:1%;
  padding-bottom:1%;
}
#datetitle{
  float:left;
  width:50%;
  color:gray;
}
#date{
  color:gray;

}
#time{
  margin-top:-10px;
}
#timetitle{
  float:left;
  width:50%;
  margin-top:-10px;

}
#planneradd{
  position:relative;
  top:10px;
  margin-right: 10%;
  float: right;
}
.price ul{
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0% 5%;
  text-align: left;
  margin-left: -3%;
}
.price li{
  flex-grow: 1;
  flex-basis: 20px;
  height:150px;
  border-radius: 10px;
  text-align: center;
  padding: 5%;
  padding-top: 8%;
  margin: 10px;
  background-color: rgba(82, 82, 100, 0.554);
  position: relative;
}
#value{
  font-weight:bold;
  text-transform: uppercase;
  font-size:30px;
  line-height: 10px;
  white-space: nowrap;
}
.time ul{
  list-style-type: none;
  display:flex;
  position:relative;
  margin-right:330px;
}
.time li{
  padding-left:5px;
}

.leftt{
  margin-top: 10px;
  float:left;
  width:50%;
}
.rightt{
  margin-top: 10px;
  float:left;
  width:50%;
}
#box2{
  height:200px;
}

.dropdown {
  position: relative;
  top: -10px;
  border-color: rgba(255, 255, 255, 0.295);
  background: none;
  color: white;
}

.opDay {
  float: left;
  width: 30%;
  margin: 0px 5px;
}

.opTime {
  width: 70%;
}

.operatingHour {
  height: 2em;
}

</style>  
