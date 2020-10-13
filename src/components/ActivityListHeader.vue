
<template>
   <div>
     <header style="background-image:url(../assets/Rain.jpg);">
        <h2>Trip <br> Details</h2>
        <h3 id="title1">Selected Date</h3>
        <p>{{date}} </p>
        <h3 id= "title2">Weather</h3>
              <h3>{{Selected_weather}}</h3>
              <img v-bind:src="icon"/>


      </header> 
    </div>
</template>


<script>
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
        console.log(this.weather_results)
        for(let key in this.weather_results){
          console.log(this.date)
          console.log(this.weather_results[key].datetime)
          if(this.weather_results[key].datetime==this.date ){
            this.Selected_weather=this.weather_results[key].weather.description
            console.log(this.Selected_weather)
            this.icon="https://www.weatherbit.io/static/img/icons/"+this.weather_results[key].weather.icon+".png"
            
          }
            
        }
    }).catch(error => console.log(error))
    
    },
    picture_display:function(){
      if(this.Selected_weather.includes("rain")){
        return "../assets/Rain.jpg";
      }else{
        return "../assets/Cloud.jpg";

      }


    }
    
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
    
    background-repeat: no-repeat;
    overflow: hidden;
    background-size: cover;
    height:180px;
    
}

h2{
    color:ivory;
    float:left;
    padding:20px;
    text-align: justify;
    font-display:Abel;

}
h3{
    
    
    float: left;
    margin-left: 75%;
    line-height: 0px;
    color: ivory;
    margin-top: 2%;
    text-size-adjust: 8px;
 
}
p{
  position: absolute;
  left:85.3%;
  top:4%;
  color:white;
  font-weight:bold;
}
#title2{
  position: relative;
  margin-top: 3%;
   color : rgb(112, 112, 112);
   font-display: bold;
   font-display:Abel;
}
#title1{
  position: relative;
  margin-top: 1%;
  color : rgb(112, 112, 112);
}
img{
  float:right;
  width:80px;
  height: 80px;
  margin-right:8%;

}


</style>