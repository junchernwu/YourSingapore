<template>
  <div>
   <act-header></act-header>

    <section>
      <nav>
        <div class="space">
          <div class="ui icon input">
            <input
              class="prompt"
              type="text"
              v-model="search"
             
              placeholder="Search Attractions"
            >
            <i class="search icon"></i>
          </div>
        </div>

        <div class="bar">
          <br ><select name="location" class="ui dropdown" id ="filters" v-model="location">
            <i class="dropdown icon"></i>
            <option value="">Select Location</option>
            <option value="all">All</option>
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="East">East</option>
            <option value="West">West</option>
            <option value="Central">Central</option>
          </select>
          <br>
          <br><select name="discount" class="ui dropdown" id ="filters" v-model="discount">
            <i class="dropdown icon"></i>
            <option value="">Discount type</option>
            <option value="all">All</option>
            <optgroup label="Percentage">
            <option value="<10%"> Less than 10%</option>
            <option value="10-20%">10-20%</option>
            <option value=">20%"> 20%</option>
            </optgroup>
            <optgroup label="Absolute">
            <option value="<$10">Less than $10</option>
           <option value="$10-$30">$10 - $30</option>
            <option value=">20%"> > 20%</option>
            </optgroup>
            <optgroup label="Bundle Promotion">
            <option value="1 for 1">1 for 1</option>
           <option value="2 for 1">Buy 2 get 1 Free</option>
           </optgroup>
           <option value="others">others</option>
          </select>
          <br>
          <br><select name="attractionType" class="ui dropdown" id ="filters" v-model="attractionType">
            <i class="dropdown icon"></i>
            <option value="">Activity type</option>
            <option value="all">All</option>
            <option value="Exhibitions">Exhibitions</option>
            <option value="Museum">Museum</option>
            <option value="Nature">Nature</option>
            <option value="Sightseeing">Sightseeing</option>
            <option value="Sports">Sports</option>
            <option value="Theme Parks">Theme Parks</option>
          </select>
          <br>
          <br><select name="price" class="ui dropdown" id ="filters" v-model="pricerange">
            <i class="dropdown icon"></i>
            <option value="">Price range</option>
            <option value="all">All</option>
            <option value="$0-$20">$0 - $20</option>
            <option value="$20-$50">$20 - $50</option>
            <option value="$50-$100">$50 - $100</option>
            <option value=">$100">> $100</option>
          </select>
          <br>

          <br><select name="demographic" class="ui dropdown" id ="filters" v-model="demographic">
            <i class="dropdown icon"></i>
            <option value="">Demographic</option>
            <option value="all">All</option>
            <option value="Elderly">Elderly</option>
            <option value="Kids">Kids</option>
            <option value="Wheelchair-Friendly">Wheelchair-Friendly</option>
          </select>
          <br>
        </div>
      </nav>

      <div id="content">
        <ul>
          <li v-for="item in filteredList"  v-bind:key="item.name">
            <img v-bind:src="item.picture"/>
            <h3>{{item.name}}</h3>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import database from "../firebase.js";
import ActivityListHeader from './ActivityListHeader.vue';
export default {
  components:{
    'act-header':ActivityListHeader,
  },
  data() {
    return {
      attractions: [],
      search: "",
      location: "",
      discount: "",
      attractionType: "",
      pricerange: "",
      demographic:""
    };
  },

  computed: {

    filteredList(){
        return this.filterbydemographic(this.filterbydiscount(this.filterbyactivity(this.filterbyprice(this.filterbylocation(this.filtersearch)))))

    },

    filtersearch(){
      return this.attractions.filter(obj => {return obj.name.toLowerCase().includes(this.search.toLowerCase())})
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

    filterbylocation:function(obj){
      if(this.location=="all" || this.location==""){
        return obj;
      }else{
      return obj.filter(obj => obj.location==this.location);}

    },
    filterbyprice:function(obj){
      if(this.pricerange=="all" || this.pricerange==""){
        return obj;
      }else{
      return obj.filter(obj => obj.pricerange==this.pricerange);}

    },
    filterbyactivity:function(obj){
      if(this.attractionType=="all" || this.attractionType==""){
        return obj;
      }else{
      return obj.filter(obj => obj.attractionType==this.attractionType);}

    },
    filterbydiscount:function(obj){
      if(this.discount=="all" || this.discount==""){
        return obj;
      }else{
      return obj.filter(obj => obj.discount.includes(this.discount));}

    },
    filterbydemographic:function(obj){
      if(this.demographic=="all" || this.demographic==""){
        return obj;
      }else{
       
        return obj.filter(obj =>obj.demographic.includes(this.demographic));

    }
    

    }
    
  },
  created() {
    this.fetchItems();
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header {
  padding: 10px;

}
h1 {
  color: paleturquoise;
}
p {
  padding: 2px;
  color:#2c3e50;
  float: left;
  padding-right: 20px;
}

nav {
  float: left;
  width:18%;
  background: #2c3e50;
  padding-right: 1px;
  height: 800px;
  position:fixed;

}
.bar{
  float: left;
  padding-right:200px;
}
#filters{
  position:static;
  fill-opacity: initial;
  float:center;
  padding-top:10px;
  color: whitesmoke;
  padding:10px;
  width:210px;
  padding-left:10px;
  background-color: rgba(87, 80, 80, 0.705);
  fill-opacity: initial;
  border-color:white;
  border-width:1px;
  border-radius: 5px;
  margin-left: 10px;
}
.space{
  float: left;
  padding:12px;

}

#content{
  float: right;
  padding: 40px;
  width:85%;
  background: #5d7286;

}
section{

height:800px;
background: #5d7286;

}

#attractions {
  width: 100%;
  max-width: 1200px;
  margin: 30px auto;
  padding: 0 5px;
  box-sizing: border-box;
}
img{
  width:250px;
  height: 200px;
}


ul{
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
}
li{
    flex-grow: 1;
    flex-basis: 300px;
    text-align: center;
    padding: 10px;
    margin: 10px;
    
}

</style>