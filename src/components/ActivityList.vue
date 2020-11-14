<template>
  <div>
    <section>
      <nav>
        <div class="bar">
          <button id="planner" v-on:click="toPlanner">
            VIEW PLANNER
          </button>
          <div class="ui icon input" :style="{marginBottom: '20px', width: '100%'}">
            <input
                class="prompt"
                type="text"
                v-model="search"
                placeholder="Search Attractions"
            />
            <i class="search icon"></i>
          </div>
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
              <option value="10 - 20%">10%-20%</option>
              <option value="> 20%">>20%</option>
            </optgroup>
            <optgroup label="Absolute">
              <option value="< $20">Less than $20</option>
              <option value="$20 - $50">$20 - $50</option>
              <option value="> $50">>$50</option>
            </optgroup>
            <optgroup label="Bundle Promotion">
              <option value="1 for 1">1 for 1</option>
              <option value="2 for 1">Buy 2 get 1 Free</option>
            </optgroup>
            <option value="0thers">Others</option>
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
            <option value="$0 - $20">$0 - $20</option>
            <option value="$20 - $50">$20 - $50</option>
            <option value="$50 - $100">$50 - $100</option>
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
          <button class="clear_filters" v-on:click="Clear_filters()">
            Clear Filters
          </button>
        </div>
      </nav>
      <div id="content">
        <h2 id="noAttractions" v-show="Object.keys(this.filteredList).length == 0">No Attractions Listed</h2>
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
      date: "",
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
    toPlanner: function() {
      this.$router.push('/planner')
    },
    fetchItems: function() {
      database
        .collection("attraction2")
        .get()
        .then((querySnapShot) => {
          let item = {};
          querySnapShot.forEach((doc) => {
            this.getDay(this.date);
            //console.log(doc.data().openDays)
            if (doc.data().openDays.includes(this.date)) {
              item = doc.data();
              item.id = doc.id;
              console.log(item.promotiontype);
              this.attractions.push(item);
            }
          });
          console.log(this.attractions);
        });
    },
    getDay: function(obj) {
      var parts = obj.split("-");
      var year = parseInt(parts[0], 10);
      var month = parseInt(parts[1], 10) - 1;
      var day = parseInt(parts[2], 10);
      var date = new Date(year, month, day);
      if (date.getDay() == 0) {
        this.date = "sun";
      } else if (date.getDay() == 1) {
        this.date = "mon";
      } else if (date.getDay() == 2) {
        this.date = "tue";
      } else if (date.getDay() == 3) {
        this.date = "wed";
      } else if (date.getDay() == 4) {
        this.date = "thu";
      } else if (date.getDay() == 5) {
        this.date = "fri";
      } else if (date.getDay() == 6) {
        this.date = "sat";
      }
    },
    Clear_filters() {
      this.location = "";
      this.discount = "";
      this.attractionType = "";
      this.pricerange = "";
      this.demographic = "";
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
        return obj.filter((obj) => obj.priceRange.name == this.pricerange);
      }
    },
    filterbyactivity: function(obj) {
      if (this.attractionType == "all" || this.attractionType == "") {
        return obj;
      } else {
        var dict = [];

        for (let key in obj) {
          for (let x in obj[key].attractionType) {
            if (obj[key].attractionType[x].name == this.attractionType) {
              dict.push(obj[key]);
            }
          }
        }
        return dict;
      }
    },

    filterbydiscount: function(obj) {
      if (this.discount == "all" || this.discount == "") {
        return obj;
      } else {
        var dict = [];
        for (let key in obj) {
          for (let x in obj[key].promotiontype) {
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
    if (this.date == sessionStorage.date) {
      this.fetchItems();
    } else {
      this.date = sessionStorage.date;
      this.fetchItems();
    }
  },
  mounted() {
    if (sessionStorage.date) {
      this.location = sessionStorage.location;
      this.date = sessionStorage.date;
      console.log(this.attractions);
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
a {
  color: white;
  font-weight: lighter;
}
p {
  padding: 2%;
  color: #2c3e50;
  float: left;
}
nav {
  float: left;
  padding-left: 2%;
  padding-right: 2%;
  height: 100%;
  position: fixed;
  padding-top: 30px;
  width: 300px;
}
.bar {
  float: left;
  width: 250px;
}
#filters {
  color: whitesmoke;
  width: 100%;
  padding: 1% 10%;
  background-color: rgba(87, 80, 80, 0.404);
  border-color: white;
  border-width: 1px;
  border-radius: 10px;
  position: relative;
  left: 6%;
}
#content {
  float: right;
  width: calc(100% - 300px);
  padding-top: 1%;
}
section {
  padding-top: 230px;
}
img {
  width: 280px;
  height: 200px;
  border-radius: 5%;
}
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  margin: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 30px;
}
input {
  border-radius: 15%;
  border: none;
  width: 240px;
  height: 20%;
  position: relative;
  left: 6%;
}

/* planner CSS */
#planner {
  background-color: rgb(255, 46, 81);
  color: white;
  padding: 7px 65px;
  border-radius: 10px;
  margin: 20px 0px;
  border: none;
  position: relative;
  left: 6%;
  width: 100%;
}

#planner a {
  font-weight: bolder;
  font-size: 14px;
}

.clear_filters {
  padding: 60%;
  color: rgb(97, 89, 89);
  padding: 7px 20px;
  border-radius: 10px;
  margin-top: 20px;
  border: none;
  position: relative;
  float: right;
  left: 6%;
}

#noAttractions {
  text-align: center;
  padding-top: 2%;
}
#plandiv{
  padding-bottom: 10%;
}
</style>
