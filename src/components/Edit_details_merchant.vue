<template>
  <div class="main">
    <div class="left">
      <div id="image">
        <label id="image-label">To Replace Attraction photo</label>
        <br />
        <input
          style="text-align: center"
          type="file"
          accept="image/png, image/jpeg"
          name="file-upload"
          value="file-upload"
          v-on:change="imgUpload"
        />
      </div>

      <img v-bind:src="attractions.picture" />

      <input
        id="input_title"
        v-if="title_edit"
        v-model="attractions.name"
        @keyup.enter="
          title_edit = false;
          $emit('update');
        "
      />
      <div v-else>
        <h1 @click="title_edit = true" id="title">{{ attractions.name }}</h1>
      </div>

      <p id="desc">{{ attractions.description }}</p>
      <h3>Address :</h3>
      <input
        id="address"
        v-if="address_edit"
        v-model="attractions.address"
        @keyup.enter="
          address_edit = false;
          $emit('update');
        "
      />
      <div v-else>
        <h1 @click="address_edit = true" id="desc">
          {{ attractions.address }}
        </h1>
      </div>
      <br />

      <a v-bind:href="attractions.link"> BOOK NOW </a>
      <!-- Link in database should have https:// in front -->
      <button>EXPLORE FOOD OPTIONS</button>
    </div>
    <div class="right">
      <div class="two ui buttons ">
        <button v-on:click="update_changes" class="ui green button">
          Done Editing
        </button>
        <button class="ui red button" v-on:click="bump" :style="bumpStyle">
          BUMP
        </button>
      </div>
      <button
        class="ui button"
        v-on:click="
          $router.push({ name: 'dashboard', query: { docId: doc_id } })
        "
      >
        Dashboard
      </button>

      <div class="box time" id="box2">
        <h1 id="righttitle">Operating hours</h1>
        <div class="leftt">
          <ul reversed>
            Monday
            <li v-for="time in attractions.operations.mon" v-bind:key="time.id">
              <!-- <input v-if = "editedTodo" v-model = "time.hour"
                  @blur= "editedTodo = false; $emit('update')"
                  @keyup.enter = "editedTodo=false; $emit('update')">  -->

              <div v-if="editedTodo && time.hour">
                <select
                  id="dropdown"
                  name="hour"
                  v-model="time.hour"
                  @keyup.enter="
                    RevertMonday();
                    $emit('update');
                  "
                  >>
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
                <select
                  id="dropdown"
                  class="dropdown"
                  name="min"
                  v-model="time.min"
                  @keyup.enter="
                    RevertMonday();
                    $emit('update');
                  "
                  >
                  <option value="00">00</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                  <option value="50">50</option>
                </select>
                <select
                  id="dropdown"
                  class="dropdown"
                  name="am"
                  v-model="time.am"
                  @keyup.enter="
                    RevertMonday();
                    $emit('update');
                  "
                  >>
                  <option value="am">am</option>
                  <option value="pm">pm</option>
                </select>
              </div>

              <div v-else>
                <label @click="Monday_click"
                  >{{ time.hour }}{{ time.min }}{{ time.am }}</label
                >
              </div>
            </li>
          </ul>
          <ul reversed>
            Tuesday
            <li v-for="time in attractions.operations.tue" v-bind:key="time.id">
              <div v-if="editedTodo_tues && time.hour">
                <select
                  id="dropdown"
                  name="hour"
                  v-model="time.hour"
                  @keyup.enter="
                    RevertTues();
                    $emit('update');
                  "
                  >>
                  <option id="dropdown" value="1">1</option>
                  <option id="dropdown" value="2">2</option>
                  <option id="dropdown" value="3">3</option>
                  <option id="dropdown" value="4">4</option>
                  <option id="dropdown" value="5">5</option>
                  <option id="dropdown" value="6">6</option>
                  <option id="dropdown" value="7">7</option>
                  <option id="dropdown" value="8">8</option>
                  <option id="dropdown" value="9">9</option>
                  <option id="dropdown" value="10">10</option>
                  <option id="dropdown" value="11">11</option>
                  <option id="dropdown" value="12">12</option>
                </select>
                <select
                  class="dropdown"
                  name="min"
                  id="dropdown"
                  v-model="time.min"
                  @keyup.enter="
                    RevertTues();
                    $emit('update');
                  "
                  >>
                  
                  <option value="00">00</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                  <option value="50">50</option>
                </select>
                <select
                  class="dropdown"
                  name="am"
                  id="dropdown"
                  v-model="time.am"
                  @keyup.enter="
                    RevertTues();
                    $emit('update');
                  "
                  >>
                  <option id="dropdown" value="am">am</option>
                  <option id="dropdown" value="pm">pm</option>
                </select>
              </div>

              <div v-else>
                <label @click="Tues_click"
                  >{{ time.hour }}{{ time.min }}{{ time.am }}</label
                >
              </div>
            </li>
          </ul>
          <ul reversed>
            Wednesday
            <li v-for="time in attractions.operations.wed" v-bind:key="time.id">
              <div v-if="editedTodo_wed && time.hour">
                <select
                  id="dropdown"
                  class="dropdown"
                  name="hour"
                  v-model="time.hour"
                  @keyup.enter="
                    RevertWed();
                    $emit('update');
                  "
                  >>
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
                <select
                  class="dropdown"
                  id="dropdown"
                  name="min"
                  v-model="time.min"
                  @keyup.enter="
                    RevertWed();
                    $emit('update');
                  "
                  >>
                  
                  <option value="00">00</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                  <option value="50">50</option>
                </select>
                <select
                  id="dropdown"
                  class="dropdown"
                  name="am"
                  v-model="time.am"
                  @keyup.enter="
                    RevertWed();
                    $emit('update');
                  "
                  >>
                  <option id="dropdown" value="am">am</option>
                  <option id="dropdown" value="pm">pm</option>
                </select>
              </div>

              <div v-else>
                <label @click="Wed_click"
                  >{{ time.hour }}{{ time.min }}{{ time.am }}</label
                >
              </div>
            </li>
          </ul>
          <ul reversed>
            Thursday
            <li v-for="time in attractions.operations.thu" v-bind:key="time.id">
              <div v-if="editedTodo_thurs && time.hour">
                <select
                  id="dropdown"
                  class="dropdown"
                  name="hour"
                  v-model="time.hour"
                  @keyup.enter="
                    RevertThurs();
                    $emit('update');
                  "
                  >>
                  <option id="dropdown" value="1">1</option>
                  <option id="dropdown" value="2">2</option>
                  <option id="dropdown" value="3">3</option>
                  <option id="dropdown" value="4">4</option>
                  <option id="dropdown" value="5">5</option>
                  <option id="dropdown" value="6">6</option>
                  <option id="dropdown" value="7">7</option>
                  <option id="dropdown" value="8">8</option>
                  <option id="dropdown" value="9">9</option>
                  <option id="dropdown" value="10">10</option>
                  <option id="dropdown" value="11">11</option>
                  <option id="dropdown" value="12">12</option>
                </select>
                <select
                  id="dropdown"
                  class="dropdown"
                  name="min"
                  v-model="time.min"
                  @keyup.enter="
                    RevertThurs();
                    $emit('update');
                  "
                  >>
                 
                  <option value="00">00</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                  <option value="50">50</option>
                </select>
                <select
                  class="dropdown"
                  name="am"
                  id="dropdown"
                  v-model="time.am"
                  @keyup.enter="
                    RevertThurs();
                    $emit('update');
                  "
                  >>
                  <option value="am">am</option>
                  <option value="pm">pm</option>
                </select>
              </div>

              <div v-else>
                <label @click="Thurs_click"
                  >{{ time.hour }}{{ time.min }}{{ time.am }}</label
                >
              </div>
            </li>
          </ul>
        </div>
        <div class="rightt">
          <ul reversed>
            Friday
            <li v-for="time in attractions.operations.fri" v-bind:key="time.id">
              <div v-if="editedToDo_fri && time.hour">
                <select
                  id="dropdown"
                  class="dropdown"
                  name="hour"
                  v-model="time.hour"
                  @keyup.enter="
                    RevertFri();
                    $emit('update');
                  "
                  >>
                  <option id="dropdown" value="1">1</option>
                  <option id="dropdown" value="2">2</option>
                  <option id="dropdown" value="3">3</option>
                  <option id="dropdown" value="4">4</option>
                  <option id="dropdown" value="5">5</option>
                  <option id="dropdown" value="6">6</option>
                  <option id="dropdown" value="7">7</option>
                  <option id="dropdown" value="8">8</option>
                  <option id="dropdown" value="9">9</option>
                  <option id="dropdown" value="10">10</option>
                  <option id="dropdown" value="11">11</option>
                  <option id="dropdown" value="12">12</option>
                </select>
                <select
                  id="dropdown"
                  class="dropdown"
                  name="min"
                  v-model="time.min"
                  @keyup.enter="
                    RevertFri();
                    $emit('update');
                  "
                  >>
                  
                  <option value="00">00</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                  <option value="50">50</option>
                </select>
                <select
                  class="dropdown"
                  name="am"
                  id="dropdown"
                  v-model="time.am"
                  @keyup.enter="
                    RevertFri();
                    $emit('update');
                  "
                  >>
                  <option id="dropdown" value="am">am</option>
                  <option id="dropdown" value="pm">pm</option>
                </select>
              </div>

              <div v-else>
                <label @click="Fri_click"
                  >{{ time.hour }}{{ time.min }}{{ time.am }}</label
                >
              </div>
            </li>
          </ul>
          <ul reversed>
            Saturday
            <li v-for="time in attractions.operations.sat" v-bind:key="time.id">
              <div v-if="editedToDo_sat && time.hour">
                <select
                  class="dropdown"
                  name="hour"
                  id="dropdown"
                  v-model="time.hour"
                  @keyup.enter="
                    RevertSat();
                    $emit('update');
                  "
                  >>
                  <option id="dropdown" value="1">1</option>
                  <option id="dropdown" value="2">2</option>
                  <option id="dropdown" value="3">3</option>
                  <option id="dropdown" value="4">4</option>
                  <option id="dropdown" value="5">5</option>
                  <option id="dropdown" value="6">6</option>
                  <option id="dropdown" value="7">7</option>
                  <option id="dropdown" value="8">8</option>
                  <option id="dropdown" value="9">9</option>
                  <option id="dropdown" value="10">10</option>
                  <option id="dropdown" value="11">11</option>
                  <option id="dropdown" value="12">12</option>
                </select>
                <select
                  class="dropdown"
                  name="min"
                  id="dropdown"
                  v-model="time.min"
                  @keyup.enter="
                    RevertSat();
                    $emit('update');
                  "
                  >
                  
                  <option value="00">00</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                  <option value="50">50</option>
                </select>
                <select
                  class="dropdown"
                  name="am"
                  id="dropdown"
                  v-model="time.am"
                  @keyup.enter="
                    RevertSat();
                    $emit('update');
                  "
                  >>
                  <option value="am">am</option>
                  <option value="pm">pm</option>
                </select>
              </div>

              <div v-else>
                <label @click="Sat_click"
                  >{{ time.hour }}{{ time.min }}{{ time.am }}</label
                >
              </div>
            </li>
          </ul>
          <ul reversed>
            Sunday
            <li v-for="time in attractions.operations.sun" v-bind:key="time.id">
              <div v-if="editedToDo_sun && time.hour">
                <select
                  class="dropdown"
                  name="hour"
                  id="dropdown"
                  v-model="time.hour"
                  @keyup.enter="
                    RevertSun();
                    $emit('update');
                  "
                  >>
                  <option id="dropdown" value="1">1</option>
                  <option id="dropdown" value="2">2</option>
                  <option id="dropdown" value="3">3</option>
                  <option id="dropdown" value="4">4</option>
                  <option id="dropdown" value="5">5</option>
                  <option id="dropdown" value="6">6</option>
                  <option id="dropdown" value="7">7</option>
                  <option id="dropdown" value="8">8</option>
                  <option id="dropdown" value="9">9</option>
                  <option id="dropdown" value="10">10</option>
                  <option id="dropdown" value="11">11</option>
                  <option id="dropdown" value="12">12</option>
                </select>
                <select
                  class="dropdown"
                  name="min"
                  id="dropdown"
                  v-model="time.min"
                  @keyup.enter="
                    RevertSun();
                    $emit('update');
                  "
                  >
                  <option value="00">00</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                  <option value="50">50</option>
                </select>
                <select
                  class="dropdown"
                  name="am"
                  id="dropdown"
                  v-model="time.am"
                  @keyup.enter="
                    RevertSun();
                    $emit('update');
                  "
                  >
                  <option id="dropdown" value="am">am</option>
                  <option id="dropdown" value="pm">pm</option>
                </select>
              </div>

              <div v-else>
                <label @click="Sun_click"
                  >{{ time.hour }}{{ time.min }}{{ time.am }}</label
                >
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="box price" id="box3">
        <button id="addbutton" v-on:click="newPrice()" type="button">
          <h3>Pricing Options</h3>
          <p id="plus">&#8853;</p>
        </button>

        <ul>
          <li v-for="(field, index) in attractions.pricing" v-bind:key="index">
            <div id="total">
              <div id="button">
                <button v-on:click="deleteOption(index)" type="button">
                  x
                </button>
              </div>
              <div :style="divStyle">
                <input
                  id="pricefield_input"
                  v-if="price_edit"
                  v-model="field.category"
                  @keyup.enter="
                    price_edit = false;
                    $emit('update');
                  "
                />

                <br />
                <input
                  id="pricefield_input"
                  v-if="price_edit"
                  type="text"
                  class="price"
                  v-model="field.price"
                  @keyup.enter="
                    price_edit = false;
                    $emit('update');
                  "
                />

                <div @click="price_edit = true" v-else>
                  <p id="value">{{ field.category }}</p>
                  <p id="value">{{ field.price }}</p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="box" id="box4" @click="promo_edit = true">
        <h1 id="righttitle">Promotions</h1>
        <input
          id="pricefield_input"
          v-if="promo_edit"
          v-model="attractions.promotions"
          @keyup.enter="
            promo_edit = false;
            $emit('update');
          "
        />
        <div v-else>
          <h1>{{ attractions.promotions }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { database } from "@/firebase/";
import firebase from "firebase";
import { storage } from "@/firebase/";
export default {
  data() {
    return {
      curr: 0,
      attractions: null,
      attractionId: this.$route.params.merchantId,
      editedTodo: null,
      editedTodo_tues: null,
      editedTodo_wed: null,
      editedTodo_thurs: null,
      editedToDo_fri: null,
      editedToDo_sat: null,
      editedToDo_sun: null,
      title_edit: null,
      price_edit: null,
      address_edit: null,
      doc_id: null,
      promo_edit: null,
      bumped: false,
    };
  },

  beforeCreate: function() {
    document.body.className = "details";
  },

  created() {
    this.fetchItems();
  },
  computed: {
    bumpStyle() {
      if (this.bumped == true) {
        return {
          "background-color": "grey",
        };
      } else {
        return {
          "background-color": "red",
        };
      }
    },
    divStyle() {
      return {
        "border-radius": "50px",
        margin: "5px 5px",
        float: "left",
        width: "calc(" + 100 / this.count + "%" + " - 10px",
      };
    },
  },

  methods: {
    imgUpload(e) {
      var files = e.target.files;
      var image = files[0];
      console.log("IMAGE");
      console.log(image);
      var dt = new Date().getTime();
      var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function(c) {
          var r = (dt + Math.random() * 16) % 16 | 0;
          dt = Math.floor(dt / 16);
          return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
      );
      var storageRef = storage.ref();
      var attractionRef = storageRef.child("images/attractions/" + uuid);
      var new_pic = this.attractions.picture 
    
      attractionRef.put(image).then(() => {
        
        attractionRef
          .getDownloadURL()
          .then(result => {
            console.log("after reassignment");
            new_pic = result;
            
            this.attractions.picture = new_pic
            console.log(this.attractions.picture);

          });
      })


    },
    workingclick: function() {
      console.log("CLICKING WORKS");
    },
    deleteOption: function(index) {
      console.log("DELETING");
      console.log(this.attractions.pricing);
      console.log(index);
      delete this.attractions.pricing[index];
      this.$forceUpdate();
    },
    newPrice: function() {
      var prev = Object.keys(this.attractions.pricing);
      if (prev.length < 3) {
        var key = Math.random();
        while (key in prev) {
          key = Math.random();
        }

        this.attractions.pricing[key] = { category: "CATEGORY", price: "$$$" };
        this.num_of_adds += 1;

        this.$forceUpdate();
      } else {
        alert("Please limit prices to 3 categories");
      }
    },
    fetchItems: function() {
      console.log("INITIATE FIREBASE");
      if (firebase.auth().currentUser) {
        database
          .collection("attraction2")
          .get()
          .then((querySnapShot) => {
            let item = {};
            querySnapShot.forEach((doc) => {
              item = doc.data();
              var match = this.$route.params.merchantId;
              if (item.auth_id == match) {
                this.doc_id = doc.id;
                this.attractions = item;
                console.log("WORKS");
                console.log(this.attractions);
              }
            });
          });
      } else {
        alert("Unauthorised Access. Please Login");
        this.$router.push("/login");
      }
    },
    Monday_click: function() {
      if (this.curr == 0) {
        this.curr = 1;
        this.editedTodo = true;
      }
    },
    RevertMonday: function() {
      this.curr = 0;
      this.editedTodo = false;
    },
    Tues_click: function() {
      if (this.curr == 0) {
        this.curr = 1;
        this.editedTodo_tues = true;
      }
    },
    RevertTues: function() {
      this.curr = 0;
      this.editedTodo_tues = false;
    },
    Wed_click: function() {
      if (this.curr == 0) {
        this.curr = 1;
        this.editedTodo_wed = true;
      }
    },
    RevertWed: function() {
      this.curr = 0;
      this.editedTodo_wed = false;
    },
    Thurs_click: function() {
      if (this.curr == 0) {
        this.curr = 1;
        this.editedTodo_thurs = true;
      }
    },
    RevertThurs: function() {
      this.curr = 0;
      this.editedTodo_thurs = false;
    },
    Fri_click: function() {
      if (this.curr == 0) {
        this.curr = 1;
        this.editedToDo_fri = true;
      }
    },
    RevertFri: function() {
      this.curr = 0;
      this.editedToDo_fri = false;
    },
    Sat_click: function() {
      if (this.curr == 0) {
        this.curr = 1;
        this.editedToDo_sat = true;
      }
    },
    RevertSat: function() {
      this.curr = 0;
      this.editedToDo_sat = false;
    },
    Sun_click: function() {
      if (this.curr == 0) {
        this.curr = 1;
        this.editedToDo_sun = true;
      }
    },
    RevertSun: function() {
      this.curr = 0;
      this.editedToDo_sun = false;
    },

    update_changes: function() {
      var id = this.doc_id;
      var updated = this.attractions;

      database

        .collection("attraction2")
        .doc(id)
        .set(updated)
        .then(console.log("SET"))
        .then(alert("Succesfully updated attraction's details"));
      this.title_edit = false;
      this.RevertMonday();
      this.RevertTues();
      this.RevertWed();
      this.RevertThurs();
      this.RevertFri();
      this.RevertSat();
      this.RevertSun();
    },
    bump: function() {
      if (this.bumped == false) {
        console.log("BUMP");
        this.bumped = true;
        var id = this.doc_id;
        database
          .collection("attraction2")
          .doc(id)
          .update({
            bump: {
              status: true,
              date: new Date(),
            },
            bumpTimes: firebase.firestore.FieldValue.increment(1),
          });
        // NOTE: TESTED FOR 11 MINUTES
        // 7 Days: 86400000 TO CHANGE!!!
        setTimeout(this.removeBump, 60000);
      } else {
        alert("Attraction can only be bumped once every 7 days");
      }
    },
    removeBump: function() {
      this.bumped = false;
      var id = this.doc_id;
      database
        .collection("attraction2")
        .doc(id)
        .update({
          bump: {
            date: "",
            status: false,
          },
        });
      console.log("REMOVED BUMP");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  width: 100%;
}
.left {
  float: left;
  padding-left: 4%;
  padding-top: 4%;
  width: 50%;
  overflow: hidden;
}
.right {
  float: left;
  color: white;
  width: 50%;
  overflow: hidden;
  padding-left: 5%;
  padding-top: 4%;
}
img {
  border-radius: 10px;
  width: 100%;
}
#input_title {
  background-color: transparent;
  color: white;
  font-weight: lighter;
  border-bottom: solid;
  border-color: white;
  font-size: 40px;
  float: left;
  clear: both;
}
#pricefield_input {
  background-color: transparent;
  width: 80%;
  margin-bottom: 2%;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 15px;
  padding-right: 3%;
  text-align: left;
}

#title {
  color: white;
  font-weight: lighter;
  border-bottom: solid;
  border-color: white;
  border-width: 1px;
  padding-bottom: 5px;
  font-size: 40px;
}
#desc {
  color: rgba(244, 245, 245, 0.705);
}

a,
button {
  background-color: rgb(255, 46, 81);
  color: white;
  padding: 5px;
  border-radius: 20px;
  font-weight: bolder;
  margin-right: 10px;
  font-size: 10px;
  border: none;
}

.box {
  background-color: rgba(0, 0, 0, 0.342);
  width: 90%;
  padding-left: 3%;
  padding-top: 2%;
  padding-bottom: 5%;
  border-radius: 10px;
  margin-bottom: 2%;
}
#righttitle {
  font-size: 20px;
  font-weight: lighter;
}

.innerbox {
  background-color: rgba(82, 82, 100, 0.554);
  width: 90%;
  border-radius: 30px;
  padding-left: 8%;
  padding-top: 1%;
  padding-bottom: 1%;
}
#dropdown {
  background: transparent;
  color:white;
}
#datetitle {
  float: left;
  width: 50%;
  color: gray;
}
#date {
  color: gray;
}
#total {
  display: flex;
  justify-content: center;
  margin-top: -20px;
  flex-grow: 1;
  flex-basis: 50px;
  border-radius: 5px;
  text-align: center;
}

.price ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding-right: 5%;
  text-align: left;
  margin-left: -45px;
}

#time {
  margin-top: -10px;
}
#timetitle {
  float: left;
  width: 50%;
  margin-top: -10px;
}
#planneradd {
  position: relative;
  top: 10px;
  left: 410px;
}
.price ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding-right: 5%;
  text-align: left;
  margin-left: -45px;
}
.price li {
  flex-grow: 1;
  flex-basis: 20px;
  height: 150px;
  border-radius: 10px;
  text-align: center;
  padding: 5%;
  padding-top: 6%;
  margin: 10px;
  background-color: rgba(82, 82, 100, 0.554);
}
#value {
  font-weight: bold;
  text-transform: uppercase;
  font-size: 30px;
  line-height: 10px;
  top: 0px;
}

#address {
  font-size: 26px;
  float: left;
}
.time ul {
  list-style-type: none;
  display: flex;
  position: relative;
  margin-right: 330px;
}
.time li {
  padding-left: 5px;
}
.leftt {
  float: left;
  width: 50%;
}
.rightt {
  float: left;
  width: 50%;
}
#box2 {
  height: 230px;
}

input {
  background-color: transparent;
  color: white;
  border: 1px solid lightblue;
  padding: 5px 10px;
  margin: 5px 10px;
  width: calc(100% - 40px);
  text-align: center;
}
::placeholder {
  color: white;
  text-align: center;
}
#field {
  float: left;
  position: relative;
  width: calc(100% - 35px);
  left: calc(6% - 3px);
  padding-top: 15px;
  padding-bottom: 15px;
}
#button {
  float: left;
  top: 10;
  right: 30;
  margin-top: -10px;
}
button {
  background: none;
  border: none;
  color: white;
  font-weight: bold;
}
.category {
  font-weight: bold;
  font-size: 18px;
  width: 7em;
}
#addbutton {
  font-size: 26px;
  width: 100%;
  float: right;
}

#plus {
  float: right;
}
button h3 {
  float: left;
}
select{
  color:white;
}
select option{
  color:white;
}
</style>
