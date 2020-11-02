<template>
   <div>
    
     
     <header :style="{ background:'url('+picture+')'}">
      
        <h2>Trip <br> Details</h2>
        <h3 id="title1">Selected Date:</h3>
        <p>{{date}} </p>
        <h3 id= "title2">Weather:</h3>
              <h3>{{Selected_weather}}</h3>
              <img v-bind:src="icon"/>
     
      
      </header> 
      
      
     
    </div>
    
</template>


<script>
import rain from '@/assets/Rain.jpg';
import cloud from '@/assets/Cloud.jpg';
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
      console.log(this.Selected_weather+'aa');
      if(x.includes('rain')){
        
        this.picture= rain;
        
      }else{
       this.picture=cloud;
        
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
  height: 180px;
  position:fixed;
  width: 100%;
  
  
 
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
    color: rgb(248, 248, 248);
    margin-top: 2%;
    text-size-adjust: 8px;
 
}
p{
   position: absolute;
  left:83.5%;
   top:15%;
  background-color: rgba(11, 23, 49, 0.233);
  color:rgb(255, 255, 255);
  font-weight:bold;
  font-size: 18px;
}
#title2{
  position: relative;
  margin-top: 3%;
   color : rgb(203, 230, 255);
   font-display: bold;
   font-display:Abel;
   font-size: 25px;
}
#title1{
  position: relative;
  font-size: 25px;
  margin-top: 1%;
  color : rgb(255, 255, 255);
}
img{
  float:right;
  width:80px;
  height: 80px;
  margin-right:12%;
  padding-bottom:18px;
  margin-bottom: 30px;
  padding-left: 15px;

}


</style>