<template>
  <div class="main">
    <div class="left">
      <img v-bind:src="attraction.picture">
      <h1 id="title"> {{attraction.name}}</h1> 
      <p id="desc"> {{attraction.description}} </p>
      <a v-bind:href="attraction.link"> BOOK NOW </a> <!-- Link in database should have https:// in front -->
       <button><router-link :to="'/eateries/'+ attraction.name">EXPLORE FOOD OPTIONS</router-link></button>
      
    </div>
    <div class="right">
      <div class= "box" id="box1">
        <h1 id="righttitle"> Add to Planner </h1>
        <div class="innerbox">
          <p id="datetitle"> DATE</p>
          <p id="date">  TIME </p>

          <p id="timetitle"> {{date}}</p>
          <select class="dropdown" name="hour" id="hour" v-model="hour">
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
            <option value="1">00</option>
              <option value="2">15</option>
              <option value="3">30</option>
              <option value="4">45</option>
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
        <ul reversed>
          Monday
          <li v-for="time in attraction.operations.mon" v-bind:key="time.id">
            <p>{{time.hour}}{{time.min}}{{time.am}}</p>
          </li>
        </ul>
        <ul reversed>
          Tuesday
          <li v-for="time in attraction.operations.tue" v-bind:key="time.id">
            <p>{{time.hour}}{{time.min}}{{time.am}}</p>
          </li>
          
        </ul>
        <ul reversed>
          Wednesday
          <li v-for="time in attraction.operations.wed" v-bind:key="time.id">
            <p>{{time.hour}}{{time.min}}{{time.am}}</p>
          </li>
         
        </ul>
        <ul reversed>
          Thursday
          <li v-for="time in attraction.operations.thu" v-bind:key="time.id">
            <p>{{time.hour}}{{time.min}}{{time.am}}</p>
          </li>
         
        </ul>
        </div>
        <div class="rightt">
        <ul reversed>
          Friday
          <li v-for="time in attraction.operations.fri" v-bind:key="time.id">
            <p>{{time.hour}}{{time.min}}{{time.am}}</p>
          </li>
          
        </ul>
        <ul reversed>
          Saturday
          <li v-for="time in attraction.operations.sat" v-bind:key="time.id">
            <p>{{time.hour}}{{time.min}}{{time.am}}</p>
          </li>
          
        </ul>
        <ul reversed>
          Sunday
          <li v-for="time in attraction.operations.sun" v-bind:key="time.id">
            <p>{{time.hour}}{{time.min}}{{time.am}}</p>
          </li>
          
        </ul>
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
import database from "../firebase.js";
export default {
    data() {
        return {
            date:'',
            hour:0,
            min:0,
            am:'',
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
        .collection("attractions")
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
      
    persist:function(){
      sessionStorage.hour= this.hour;
      sessionStorage.min= this.min;
      sessionStorage.am= this.am;
    }
  }
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
  padding-top:4%;
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
  left:410px;
}
.price ul{
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding-right: 5%;
    text-align: left;
    margin-left:-45px;
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
    
}
#value{
  font-weight:bold;
  text-transform: uppercase;
  font-size:30px;
  line-height: 10px;
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
  float:left;
  width:50%;
}
.rightt{
  float:left;
  width:50%;
}
#box2{
  height:230px;
}
</style>  
