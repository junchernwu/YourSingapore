<template>
<div id="page" class="main">

  <div class="col-md-12" v-bind:class="{ 'not-visible' : active }"  >
          <iframe frameborder="0" style="width: 100%; height: 350px; border:0" v-bind:src="'https://www.google.com/maps/embed/v1/place?key=AIzaSyAO8NFaYvyURO_o-4KvCmhyMqPfx3LNemI&q='+search+',Singapore'" allowfullscreen></iframe></div>

    <section>
     <nav>
        <div class="ui icon input">
            <input
              class="prompt"
              type="text"
              v-model="search"
              placeholder="Search Attractions"
            >
            <i class="search icon"></i>
        </div>
         <div class="ui icon input" id="place">
            <input
              class="prompt"
              type="text"
              v-model="restaurant"
              placeholder="Search Restaurant"
            >

        </div>
      
        <div class="innerbox">
          <p id="datetitle"> DATE</p>
          <p id="datetitle">  TIME </p>
          
          <p id="timetitle">{{date}}</p>
          
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
        
 
        </nav>
        <div id="content">
        <ul>
          <li v-for="item in filtersearch"  v-bind:key="item.name">
            <img v-bind:src="get_pic(item.photos[0].photo_reference)"/>
            <aside>
            <h3>{{item.name.trim()}}</h3>
            <p>{{item.formatted_address}}</p>

           <div id="btn"> <button id="button">Add to planner</button></div>
         
        
            </aside>
          </li>
        </ul>
      </div>
      
      


   
</section>

    </div>
</template>


<script>
import axios from 'axios'

export default {

  data(){
    return{
        search:this.$route.params.name,
        location:"",
        results:[],
        restaurant:"",
        final_results:[],
        date:'',
        hour:0,
        min:0,
        am:'',
        

      

      

    
    }
  },
  computed: {


    filtersearch(){
      return this.final_results.filter(obj => {return obj.name.toLowerCase().includes(this.restaurant.toLowerCase())})
    }
  },

  methods:{
      fetchData : function(){
        const URL="https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+"+this.search+"&key=AIzaSyAO8NFaYvyURO_o-4KvCmhyMqPfx3LNemI";
        axios.get(URL).then(response=>{
          
        this.results=response.data.results ;
        for(let key in this.results){
          console.log(this.results[key].business_status)
          if(this.results[key].business_status=="OPERATIONAL"){
              this.final_results.push(response.data.results[key]);

          }
        }
        console.log(this.results)

            
    }).catch(error => console.log(error))
    
    },
     get_pic: function(x){
         var link="https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="+x+"&key=AIzaSyAO8NFaYvyURO_o-4KvCmhyMqPfx3LNemI";
         return link


    },
     open:function(y){
        if(""+y==true){
            var msg="Currently Open"
            return msg
        }else{
            var msgs="Currently Close"
            return msgs
        }

    },
   
   
     

    
  
    
    },

beforeCreate: function() {
        document.body.className = 'eateries';
  },

  created() {
      this.fetchData();
   
   
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
    persist:function(){
      sessionStorage.hour= this.hour;
      sessionStorage.min= this.min;
      sessionStorage.am= this.am;
    }
  
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  color: rgb(148, 155, 155);
  float:left;
  font-size: 25px;
  margin-bottom:10px;
  text-align: center;

 
}
button{
  padding-top:5px;
  padding-bottom:5px;
  margin-right: 100px;
  background-color: tomato;
  color: azure;

}

.innerbox{
  background-color: rgba(82, 82, 100, 0.554);
  width:165%;
  border-radius: 20px;
  padding-left:5%;
  padding-top:1%;
  padding-bottom:5%;

  
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
  
  margin-bottom:10px;

}
#timetitle{
  float:left;
  width:50%;
  margin-top:-10px;
  
}
p {
 
  color:white;
  float: right;
  padding-right:50px;
  font-size:15px;
  text-align: center;
  
}
aside {
  width:60%;
  padding-left: 10px;
  margin-left: 10px;
  float: right;
  font-style: Times;
 
}
#place{
    padding-top:20px;
    padding-bottom:20px;


}

nav {
  float: left;
  width:18%;
  padding-left: 30px;
  padding-top: 30px;
  height: 800px;
  position:fixed;

}
.bar{
  float: left;
  padding-right:200px;
}
#btn{
  padding-top:150px;
}
#content{
  float: right;
  padding: 0px;
  text-align: right;
 


}
section{
height:6200px;
background-color:#2c3e50;

}

#page{
background-color:#4b5763;

}
img{
  width:250px;
  height: 200px;
  margin-right: 10px;
}


ul{
    display: flex;
    flex-wrap: wrap;
    text-align: right;
    padding-left: 400px;
    padding-right: 20px;
    display: block;
    padding-top:1px;
}

li{
  
background: rgb(66, 66, 73);
flex: 50%;
flex-basis: 100px;
text-align: right;
padding:  50px 50px;
margin: 10px;
display: block;
width: 900px;
    

    
}
input{
  padding-left:5px;
  border-radius: 15px;
  border:none;
  width:250px;
  height:25px;
  position:relative;
  left:4%;
}
</style>