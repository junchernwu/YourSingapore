<template>
  <div>
    <section>
      <nav>
        <div class="ui icon input">
          <input
            class="prompt"
            type="text"
            v-model="search"
            placeholder="Search Attractions"
          />
          <i class="search icon"></i>
        </div>

        <div class="bar">
          <br /><select
            name="location"
            class="ui dropdown"
            id="filters"
            v-model="location"
          >
            <i class="dropdown icon"></i>
            <option value="">Select Location</option>
            <option value="all">All</option>
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="East">East</option>
            <option value="West">West</option>
            <option value="Central">Central</option>
          </select>
          <br />
          <br /><select
            name="discount"
            class="ui dropdown"
            id="filters"
            v-model="discount"
          >
            <i class="dropdown icon"></i>
            <option value="">Discount type</option>
            <option value="all">All</option>
            <optgroup label="Percentage">
              <option value="< 10%"> Less than 10%</option>
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
          <br />
          <br /><select
            name="attractionType"
            class="ui dropdown"
            id="filters"
            v-model="attractionType"
          >
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
          <br />
          <br /><select
            name="price"
            class="ui dropdown"
            id="filters"
            v-model="pricerange"
          >
            <i class="dropdown icon"></i>
            <option value="">Price range</option>
            <option value="all">All</option>
            <option value="$0-$20">$0 - $20</option>
            <option value="$20-$50">$20 - $50</option>
            <option value="$50-$100">$50 - $100</option>
            <option value=">$100">> $100</option>
          </select>
          <br />

          <br /><select
            name="demographic"
            class="ui dropdown"
            id="filters"
            v-model="demographic"
          >
            <i class="dropdown icon"></i>
            <option value="">Demographic</option>
            <option value="all">All</option>
            <option value="Elderly">Elderly</option>
            <option value="Kids">Kids</option>
            <option value="Wheelchair-Friendly">Wheelchair-Friendly</option>
          </select>
          <br />
        </div>
      </nav>

      <div id="content">
        <ul>
          <li v-for="item in filteredList" v-bind:key="item.name">
            <img v-bind:src="item.picture" />

            <h3>
              <router-link :to="'/attraction/' + item.id">{{
                item.name
              }}</router-link>
            </h3>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import { database } from "@/firebase/";

export default {
  data() {
    return {
      attractions: [],
      search: "",
      location: "",
      discount: "",
      attractionType: "",
      pricerange: "",
      demographic: "",
      days: [],
      date:""
    };
  },

  computed: {
    filteredList() {
      return this.sortItems(
        this.filterbydemographic(
          this.filterbydiscount(
            this.filterbyactivity(
              this.filterbyprice(this.filterbylocation(this.filtersearch))
            )
          )
        )
      );
    },

    filtersearch() {
      return this.attractions.filter((obj) => {
        return obj.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },

  methods: {
    fetchItems: function() {
      database
        .collection("attraction2")
        .get()
        .then((querySnapShot) => {
          let item = {};
          querySnapShot.forEach((doc) => {
              this.getDay(this.date);
              console.log(doc.data().openDays)
            if(doc.data().openDays.includes(this.date)){
              item = doc.data();
              item.id = doc.id;
              this.attractions.push(item);
            }
          });
          console.log(this.attractions);
        });
    },
    getDay: function(obj){
      var parts = obj.split('-')
      var year = parseInt(parts[0],10)
      var month = parseInt(parts[1],10) -1
      var day = parseInt(parts[2],10)
      var date=new Date(year,month,day)
      if(date.getDay()==0){
        this.date="sun"
      }
      else if(date.getDay()==1){
        this.date="mon"
      }
      else if(date.getDay()==2){
        this.date="tue"
      }
      else if(date.getDay()==3){
        this.date="wed"
      }
      else if(date.getDay()==4){
        this.date="thu"
      }
      else if(date.getDay()==5){
        this.date="fri"
      }
      else if(date.getDay()==6){
        this.date="sat"
      }
    },

    sortItems: function(obj) {
      var bump = [];
      for (let y in obj) {
        if (obj[y].bump) {
          if ("bump" in obj[y]) {
            if (obj[y].bump != null) {
              if (obj[y].bump.status == true) {
                bump.push(obj[y]);
              }
            }
          }
        }
      }
      bump.sort(function(x, y) {
        return x.bump.date - y.bump.date;
      });
      bump.reverse();
      var randomise = [];
      for (let x in obj) {
        if (!bump.includes(obj[x])) {
          randomise.push(obj[x]);
        }
      }
      this.shuffle(randomise);
      var final = bump.concat(randomise);
      return final;
    },
  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
},

    filterbylocation: function(obj) {
      if (this.location == "all" || this.location == "") {
        return obj;
      } else {
        return obj.filter((obj) => obj.location.name == this.location);
      }
    },
    filterbyprice: function(obj) {
      if (this.pricerange == "all" || this.pricerange == "") {
        return obj;
      } else {
        return obj.filter((obj) => obj.pricerange.name == this.pricerange);
      }
    },
    filterbyactivity: function(obj) {
      if (this.attractionType == "all" || this.attractionType == "") {
        return obj;
      }
      else{
      var dict=[];
          for(let key in obj){
            for(let x in obj[key].attractionType){
              if(obj[key].attractionType[x].name==this.attractionType){
                
              dict.push(obj[key]);

            }
          }
          return dict;
        }
      }
    },

    filterbydiscount: function(obj) {
      if (this.discount == "all" || this.discount == "") {
        return obj;
      } else {
        var dict = [];
        for (let key in obj) {
          for (let x in obj[key].demographicType) {
            if (obj[key].promotiontype[x].name == this.discount) {
              dict.push(obj[key]);
            }
          }
        }
        return dict;
      }
    },
    filterbydemographic: function(obj) {
      if (this.demographic == "all" || this.demographic == "") {
        return obj;
      } else {
        var dict = [];
        for (let key in obj) {
          for (let x in obj[key].demographicType) {
            if (obj[key].demographicType[x].name == this.demographic) {
              dict.push(obj[key]);
            }
          }
        }
        return dict;

        // return obj.filter(obj =>obj.demographic.includes(this.demographic));
      }
    },
  },
  created() {
    this.fetchItems();
  },
  mounted() {
    if (sessionStorage.date) {
      this.location = sessionStorage.location;
      this.date = sessionStorage.date;
      console.log(this.date);
    }
  },
  beforeCreate: function() {
    document.body.className = "activityList";
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1 {
  color: paleturquoise;
}
a{
  
  color:white;
  font-weight:lighter;
}
p {
  padding: 2%;
  color:#2c3e50;
  float: left;
  
}
nav {
  float: left;
  width:18%;
  padding-left: 2%;
  padding-top: 15%;
  height: 100%;
  position:fixed;
}
.bar{
  float: left;
  padding-right:20%;
}
#filters{
  position:static;
  float:center;
  padding-top:10%;
  color: whitesmoke;
  padding:1%;
  width:160%;
  padding-left:10%;
  background-color: rgba(87, 80, 80, 0.404);
  fill-opacity: initial;
  border-color:white;
  border-width:2%;
  border-radius: 2%;
  margin-left: 10%;
}
#content{
  float: right;
  padding-top: 13%;
  width:85%;
}
section{
height:100%px;
}
#attractions {
  width: 100%;
  max-width: 100%;
  margin: 30% auto;
  padding: 0 5%;
  box-sizing: border-box;
}
img{
  width:280px;
  height: 200px;
  border-radius:5%;
}
ul{
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding-left: 8%;
}
li{
    flex-grow: 1;
    flex-basis: 300px;
    text-align: center;
    padding: 3%;
}
input{
  
  border-radius: 15%;
  border:none;
  width:240px;
  height:20%;
  position:relative;
  left:6%;
}

</style>


