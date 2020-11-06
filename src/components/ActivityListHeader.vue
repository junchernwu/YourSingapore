<template>
   <div>
    
     
     <header :style="{ background:'url('+picture+')'}">
      
        <h2>Trip <br> Details</h2>
        <h3 id="title1">Selected Date:</h3>
        <input type="date" id="date" name="date" v-model= "date" v-on:change="fetchData()">
        <h3 id= "title2">Weather:</h3>
              <h3 id="weather">{{Selected_weather}}</h3>
              <img v-bind:src="icon"/>
     
      
      </header> 
      
      
     
    </div>
    
</template>


<script>
import rain from '@/assets/Rain.jpg';
import cloud from '@/assets/Cloud.jpg';
import sunny from '@/assets/sunny.jpg';
import axios from 'axios'


export default {
  data(){
    return{
      date:'',
      weather_results: [],
      Selected_weather:'',
      icon:'',
      picture:''
      
      

      
   
      

    
    }
  },



  methods:{
    
    fetchData : function(){
        axios.get('https://api.weatherbit.io/v2.0/forecast/daily?city=Singapore&key=782b9a2558104ec1898b21424a5780b4').then(response=>{
        this.weather_results=response.data.data
   
        for(let key in this.weather_results){
     
          if(this.weather_results[key].datetime==this.date ){
            this.Selected_weather=this.weather_results[key].weather.description
           
     
            this.icon="https://www.weatherbit.io/static/img/icons/"+this.weather_results[key].weather.icon+".png"
            
          }
            
        }
          this.picture_display();
    }).catch(error => console.log(error))

  
    
    },
    picture_display:function(){
      var x=this.Selected_weather;
      
      if(x.includes('rain')){
        
        this.picture= rain;
        
      }else if(x.includes("clouds")){
       this.picture=cloud;
        
      }
      else{
        this.picture=sunny;
      }


    },

   
  },
    
    
  



  mounted() {
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
  height: 30%;
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
h3{
    
    
    float: left;
    margin-left: 75%;
    line-height: 0%;
    color: rgb(248, 248, 248);
    margin-top: 2%;
    text-size-adjust: 2%;
 
}
#date{
  position: absolute;
  left:83.5%;
  top:15%;
  background-color: rgba(11, 23, 49, 0.233);
  color:rgb(255, 255, 255);
  font-weight:bold;
  font-size: 110%
}
#title2{
  position: relative;
  margin-top: 3%;
   color : rgb(240, 235, 235);
   font-display: bold;
   font-display:Abel;
   font-size: 150%;
}
#title1{
  position: relative;
  font-size: 145%;
  margin-top: 1%;
  color : rgb(253, 253, 253);
}
img{
  float:right;
  width:6%;
  height: 40%;
  margin-right:8%;
  padding-bottom:1%;
  padding-right: 1%;

}

#weather{
  position: relative;
  left: 7%;
}


</style>