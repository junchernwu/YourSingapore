<template>
   <div>
     <header :style="{ background:'url('+picture+')',backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundSize: '100%'}">
       <h2>Trip <br> Details</h2>
       <div id="rightContent">
         <h3 id="title1">Selected Date:</h3>
         <input type="date" id="date" name="date" v-model= "date" v-on:change="setDate();reload();fetchData()">
         <h3 id= "title2">Weather:</h3>
         <h3 id="weather">{{Selected_weather}}</h3>
         <img v-bind:src="icon"/>
       </div>
      </header>
    </div>
</template>


<script>
import rain from '@/assets/rain.jpeg';
import cloud from '@/assets/clouds.jpeg';
import sunny from '@/assets/sun.jpeg';
import axios from 'axios'

export default {
  data(){
    return{
      date:'',
      weather_results: [],
      Selected_weather:'',
      icon:'',
      picture:'',
      maxDate:''
    }
  },

  methods:{
    setDate: function(){
      sessionStorage.date=this.date
      var current=new Date().getTime()
      this.maxDate=this.formatDate(new Date(current+ (14*86400000)).toString())
      if(this.date==""){
        alert("Date input required");
      }
      else if(this.date>=this.maxDate){
        alert("The weather forecast for the date you have selected may not be accurate.");
      }

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
        },
    reload: function(){
      document.location.reload()
    },
    fetchData : function(){
      console.log(sessionStorage.date)
      
        axios.get('https://api.weatherbit.io/v2.0/forecast/daily?city=Singapore&key=782b9a2558104ec1898b21424a5780b4').then(response=>{
        this.weather_results=response.data.data
   
        for(let key in this.weather_results){
     
          if(this.weather_results[key].datetime==this.date ){
            this.Selected_weather=this.weather_results[key].weather.description
            if (this.Selected_weather.includes("Thunderstorm")) {
              this.Selected_weather = "Thunderstorm";
            }
            this.icon="https://www.weatherbit.io/static/img/icons/"+this.weather_results[key].weather.icon+".png"
          }
            
        }
          this.picture_display();
    }).catch(error => console.log(error))
    
    },
    picture_display:function(){
      var x=this.Selected_weather;
      
      if(x.includes('rain') || x.includes('Thunderstorm')){
        this.picture= rain;
      } else if(x.includes("Broken")){
        this.picture=sunny;
      }
      else{
        this.picture=cloud;
      }
    },
  },

  mounted() {
    document.getElementById("date").min= new Date().toISOString().split("T")[0]
    if (sessionStorage.date) {
      this.date = sessionStorage.date;
      this.fetchData();
    }
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header{
  height: 188px;
  position:fixed;
  width: 100%;
}
h2{
  color:ivory;
  float:left;
  padding:2%;
  text-align: justify;
  font-display:Abel;
}
#rightContent {
  float: right;
  width: 15%;
  padding: 25px 5px;
}
h3{
  line-height: 0;
  color: rgb(248, 248, 248);
  text-size-adjust: 2%;
}
#date{
  background-color: rgba(255, 248, 248, 0.2);
  color:rgb(255, 255, 255);
  font-weight:bold;
  font-size: 110%;
  border: none;
  margin: 2% 0%;
}
#title2{
  position: relative;
  color : rgb(240, 235, 235);
  font-display: bold;
  font-display:Abel;
  font-size: 150%;
  line-height: 0;
}
#title1{
  position: relative;
  font-size: 145%;
  margin-top: 1%;
  color : rgb(253, 253, 253);
}
#weather {
  float: left;
  position: relative;
  top: -10px;
}
img{
  float: left;
  width: 50px;
  margin: 1% 5%;
  position: relative;
  top: -12px;
}
</style>