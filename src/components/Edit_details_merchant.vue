<template>
  <div class="main">
    <div class="left">
      <img v-bind:src="attractions.picture">
      <input v-if = "title_edit" v-model = "attractions.name"
                  @blur= "title_edit = false; $emit('update')"
                  @keyup.enter = "title_edit=false; $emit('update')">
      <div v-else>
      <h1 @click = "title_edit = true" id="title"> {{attractions.name}}</h1> 
      </div>
      
      <p id="desc"> {{attractions.description}} </p>
      <a v-bind:href="attractions.link"> BOOK NOW </a> <!-- Link in database should have https:// in front -->
      <button> EXPLORE FOOD OPTIONS </button>
    </div>
    <div class="right">
      <div class="two ui buttons ">
        <button v-on:click = "update_changes" class="ui green button">Done Editing</button>
        <button class="ui red button" v-on:click="bump" :style="bumpStyle">BUMP</button>
      </div>
      <button class="ui button" v-on:click="$router.push({name: 'dashboard', query:{docId: doc_id}})">Dashboard</button>
      <div class="box time" id="box2">
        <h1 id="righttitle"> Operating hours </h1>
        <div class="leftt">
        <ul reversed>
          Monday
          <li v-for="time in attractions.operations.mon" v-bind:key="time.id">
            <!-- <input v-if = "editedTodo" v-model = "time.hour"
                  @blur= "editedTodo = false; $emit('update')"
                  @keyup.enter = "editedTodo=false; $emit('update')">  -->

              <div v-if="editedTodo && time.hour" >
              <select class="dropdown" name="hour" id="hour" v-model = "time.hour" @blur= "editedTodo = false; $emit('update')"
                  @keyup.enter = "editedTodo=false; $emit('update')">>
                <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option  value="7">7</option>
                  <option  value="8">8</option>
                  <option  value="9">9</option>
                  <option  value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
              </select>
              <select class="dropdown" name="min" id="min" v-model= "time.min" @blur= "editedTodo = false; $emit('update')"
                  @keyup.enter = "editedTodo=false; $emit('update')">>
                <option value="Minute">Minute</option>
                <option value="10">00</option>
                  <option value="20">15</option>
                  <option value="30">30</option>
                  <option value="45">45</option>
              </select>
              <select class="dropdown" name="am" id="am" v-model= "time.am" @blur= "editedTodo = false; $emit('update')"
                  @keyup.enter = "editedTodo=false; $emit('update')">>
                <option value="am">am</option>
                <option value="pm">pm</option>
              </select>
              </div>
              
       
            
          
            <div v-else>
            <label @click = "editedTodo = true && time.hour">{{time.hour}}{{time.min}}{{time.am}}</label>
            </div>
          </li>
        </ul>
        <ul reversed>
          Tuesday
          <li v-for="time in attractions.operations.tue" v-bind:key="time.id">
            <div v-if="editedTodo_tues && time.hour" >
              <select class="dropdown" name="hour" id="hour" v-model = "time.hour" @blur= "editedTodo_tues = false; $emit('update')"
                  @keyup.enter = "editedTodo_tues=false; $emit('update')">>
                <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option  value="7">7</option>
                  <option  value="8">8</option>
                  <option  value="9">9</option>
                  <option  value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
              </select>
              <select class="dropdown" name="min" id="min" v-model= "time.min" @blur= "editedTodo_tues = false; $emit('update')"
                  @keyup.enter = "editedTodo_tues=false; $emit('update')">>
                <option value="Minute">Minute</option>
                <option value="10">00</option>
                  <option value="20">15</option>
                  <option value="30">30</option>
                  <option value="45">45</option>
              </select>
              <select class="dropdown" name="am" id="am" v-model= "time.am" @blur= "editedTodo_tues = false; $emit('update')"
                  @keyup.enter = "editedTodo_tues=false; $emit('update')">>
                <option value="am">am</option>
                <option value="pm">pm</option>
              </select>
              </div>
              
       
            
          
            <div v-else>
            <label @click = "editedTodo_tues = true && time.hour">{{time.hour}}{{time.min}}{{time.am}}</label>
            </div>
          </li>
          
        </ul>
        <ul reversed>
          Wednesday
          <li v-for="time in attractions.operations.wed" v-bind:key="time.id">
            <div v-if="editedTodo_wed && time.hour" >
              <select class="dropdown" name="hour" id="hour" v-model = "time.hour" @blur= "editedTodo_wed = false; $emit('update')"
                  @keyup.enter = "editedTodo_wed=false; $emit('update')">>
                <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option  value="7">7</option>
                  <option  value="8">8</option>
                  <option  value="9">9</option>
                  <option  value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
              </select>
              <select class="dropdown" name="min" id="min" v-model= "time.min" @blur= "editedTodo_wed = false; $emit('update')"
                  @keyup.enter = "editedTodo_wed=false; $emit('update')">>
                <option value="Minute">Minute</option>
                <option value="10">00</option>
                  <option value="20">15</option>
                  <option value="30">30</option>
                  <option value="45">45</option>
              </select>
              <select class="dropdown" name="am" id="am" v-model= "time.am" @blur= "editedTodo_wed = false; $emit('update')"
                  @keyup.enter = "editedTodo_wed=false; $emit('update')">>
                <option value="am">am</option>
                <option value="pm">pm</option>
              </select>
              </div>
          
            <div v-else>
            <label @click = "editedTodo_wed = true && time.hour">{{time.hour}}{{time.min}}{{time.am}}</label>
            </div>
          </li>
         
        </ul>
        <ul reversed>
          Thursday
          <li v-for="time in attractions.operations.thu" v-bind:key="time.id">
            <div v-if="editedTodo_thurs && time.hour" >
              <select class="dropdown" name="hour" id="hour" v-model = "time.hour" @blur= "editedTodo_thurs = false; $emit('update')"
                  @keyup.enter = "editedTodo_thurs=false; $emit('update')">>
                <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option  value="7">7</option>
                  <option  value="8">8</option>
                  <option  value="9">9</option>
                  <option  value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
              </select>
              <select class="dropdown" name="min" id="min" v-model= "time.min" @blur= "editedTodo_thurs = false; $emit('update')"
                  @keyup.enter = "editedTodo_thurs=false; $emit('update')">>
                <option value="Minute">Minute</option>
                <option value="10">00</option>
                  <option value="20">15</option>
                  <option value="30">30</option>
                  <option value="45">45</option>
              </select>
              <select class="dropdown" name="am" id="am" v-model= "time.am" @blur= "editedTodo_thurs = false; $emit('update')"
                  @keyup.enter = "editedTodo_thurs=false; $emit('update')">>
                <option value="am">am</option>
                <option value="pm">pm</option>
              </select>
              </div>
          
            <div v-else>
            <label @click = "editedTodo_thurs = true && time.hour">{{time.hour}}{{time.min}}{{time.am}}</label>
            </div>
          </li>
         
        </ul>
        </div>
        <div class="rightt">
        <ul reversed>
          Friday
          <li v-for="time in attractions.operations.fri" v-bind:key="time.id">
            <div v-if="editedToDo_fri && time.hour" >
              <select class="dropdown" name="hour" id="hour" v-model = "time.hour" @blur= "editedToDo_fri = false; $emit('update')"
                  @keyup.enter = "editedToDo_fri=false; $emit('update')">>
                <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option  value="7">7</option>
                  <option  value="8">8</option>
                  <option  value="9">9</option>
                  <option  value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
              </select>
              <select class="dropdown" name="min" id="min" v-model= "time.min" @blur= "editedToDo_fri = false; $emit('update')"
                  @keyup.enter = "editedToDo_fri=false; $emit('update')">>
                <option value="Minute">Minute</option>
                <option value="10">00</option>
                  <option value="20">15</option>
                  <option value="30">30</option>
                  <option value="45">45</option>
              </select>
              <select class="dropdown" name="am" id="am" v-model= "time.am" @blur= "editedToDo_fri = false; $emit('update')"
                  @keyup.enter = "editedToDo_fri=false; $emit('update')">>
                <option value="am">am</option>
                <option value="pm">pm</option>
              </select>
              </div>
          
            <div v-else>
            <label @click = "editedToDo_fri = true && time.hour">{{time.hour}}{{time.min}}{{time.am}}</label>
            </div>
          </li>
          
        </ul>
        <ul reversed>
          Saturday
          <li v-for="time in attractions.operations.sat" v-bind:key="time.id">
            <div v-if="editedToDo_sat && time.hour" >
              <select class="dropdown" name="hour" id="hour" v-model = "time.hour" @blur= "editedToDo_sat = false; $emit('update')"
                  @keyup.enter = "editedToDo_sat=false; $emit('update')">>
                <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option  value="7">7</option>
                  <option  value="8">8</option>
                  <option  value="9">9</option>
                  <option  value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
              </select>
              <select class="dropdown" name="min" id="min" v-model= "time.min" @blur= "editedToDo_sat = false; $emit('update')"
                  @keyup.enter = "editedToDo_sat=false; $emit('update')">>
                <option value="Minute">Minute</option>
                <option value="10">00</option>
                  <option value="20">15</option>
                  <option value="30">30</option>
                  <option value="45">45</option>
              </select>
              <select class="dropdown" name="am" id="am" v-model= "time.am" @blur= "editedToDo_sat = false; $emit('update')"
                  @keyup.enter = "editedToDo_sat=false; $emit('update')">>
                <option value="am">am</option>
                <option value="pm">pm</option>
              </select>
              </div>
          
            <div v-else>
            <label @click = "editedToDo_sat = true && time.hour">{{time.hour}}{{time.min}}{{time.am}}</label>
            </div>
          </li>
          
        </ul>
        <ul reversed>
          Sunday
          <li v-for="time in attractions.operations.sun" v-bind:key="time.id">
            <div v-if="editedToDo_sun && time.hour" >
              <select class="dropdown" name="hour" id="hour" v-model = "time.hour" @blur= "editedToDo_sun = false; $emit('update')"
                  @keyup.enter = "editedToDo_sun=false; $emit('update')">>
                <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option  value="7">7</option>
                  <option  value="8">8</option>
                  <option  value="9">9</option>
                  <option  value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
              </select>
              <select class="dropdown" name="min" id="min" v-model= "time.min" @blur= "editedToDo_sun = false; $emit('update')"
                  @keyup.enter = "editedToDo_sun=false; $emit('update')">>
                <option value="Minute">Minute</option>
                <option value="10">00</option>
                  <option value="20">15</option>
                  <option value="30">30</option>
                  <option value="45">45</option>
              </select>
              <select class="dropdown" name="am" id="am" v-model= "time.am" @blur= "editedToDo_sun = false; $emit('update')"
                  @keyup.enter = "editedToDo_sun=false; $emit('update')">>
                <option value="am">am</option>
                <option value="pm">pm</option>
              </select>
              </div>
          
            <div v-else>
            <label @click = "editedToDo_sun = true && time.hour">{{time.hour}}{{time.min}}{{time.am}}</label>
            </div>
          </li>
          
        </ul>
    
        </div>
      </div>
      <div class="box price" id="box3">
        <h1 id="righttitle"> Pricing Options </h1>
        <ul>
          <li v-for="field in attractions.pricing" v-bind:key="field.category">
            <input v-if = "price_edit" v-model = "field.category"
                  @blur= "price_edit = false; $emit('update')"
                  @keyup.enter = "price_edit=false; $emit('update')">
   

            <input v-if = "price_edit" v-model = "field.price"
                  @blur= "price_edit = false; $emit('update')"
                  @keyup.enter = "price_edit=false; $emit('update')">
   
            <div v-else id="pricefield">
              <p id="value"> {{field.category}} </p>
              <p @click = "price_edit = true" id="value"> {{field.price}} </p>
            </div>
          </li>
        </ul>
      </div>
      <div class="box" id="box4">
        <h1 id="righttitle"> Promotions </h1>
          <input v-if = "promo_edit" v-model = "attractions.promotions"
                  @blur= "promo_edit = false; $emit('update')"
                  @keyup.enter = "promo_edit=false; $emit('update')">
          <div v-else>
          <h1 @click = "promo_edit = true" > {{attractions.promotions}}</h1> 
          </div>
       
      </div>
    </div>

  </div>
</template>

<script>
import { database } from "@/firebase/"
import firebase from "firebase";
export default {
    data() {
        return {
            attractions: null,
            attractionId:this.$route.params.merchantId,
            editedTodo: null,
            editedTodo_tues:null,
            editedTodo_wed:null,
            editedTodo_thurs:null,
            editedToDo_fri:null,
            editedToDo_sat:null,
            editedToDo_sun:null,
            title_edit:null,
            price_edit:null,
            doc_id: null,
            promo_edit:null,
            bumped: false,
        }
    },

    beforeCreate: function() {
        document.body.className = 'details';
    },

    created(){
        this.fetchItems();
    },
  computed: {
    bumpStyle() {
      if (this.bumped == true) {
        return {
          'background-color': 'grey',
        }
      } else {
        return {
          'background-color': 'red',
        }
      }
    },
  },
  methods: {
    fetchItems: function () {
      console.log("INITIATE FIREBASE")
      if(firebase.auth().currentUser){
      database
        .collection("attraction2")
        .get()
        .then((querySnapShot) => {
          let item = {};
          querySnapShot.forEach((doc) => {
            item = doc.data();
            var match = this.$route.params.merchantId
            if (item.auth_id == match) {
           
              this.doc_id = doc.id
              this.attractions = item 
              console.log("WORKS")
              console.log(this.attractions)
              }
            });
          });
      } else {
          alert("Unauthorised Access. Please Login")
          this.$router.push('/login')
      }

        
    },
    edit: function(){
      this.editedTodo = true
    },
    update_changes: function(){
      var id = this.doc_id
      var updated = this.attractions
     
      database
        .collection("attraction2")
        .doc(id)  
        .set(updated)
        .then(console.log("SET"))
    },
    bump: function(){
      if (this.bumped == false) {
        console.log("BUMP")
        this.bumped = true;
        var id = this.doc_id
        database
            .collection("attraction2")
            .doc(id)
            .update({
              bump: {
                status: true,
                date: new Date(),
              },
              bumpTimes: firebase.firestore.FieldValue.increment(1),
            })
        // NOTE: TESTED FOR 11 MINUTES
        // 7 Days: 86400000 TO CHANGE!!!
        setTimeout(this.removeBump, 60000)
      } else {
        alert("Attraction can only be bumped once every 7 days")
      }
    },
    removeBump: function() {
      this.bumped = false;
      var id = this.doc_id
      database
          .collection("attraction2")
          .doc(id)
          .update({
            bump: {
              date: '',
              status: false,
            },
          })
      console.log("REMOVED BUMP")
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
  background-color: rgba(0, 0, 0, 0.34);
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