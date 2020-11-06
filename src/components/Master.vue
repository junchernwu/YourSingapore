<template>
  <div class="main">
    <h1 id="title">
      Master Branch<br />
      Start Verifying and Approving Users
    </h1>
    <div class="ui grid">
      <ul reversed>
        Pending approval

        <li v-for="(pending, index) in pending_attractions" v-bind:key="index">
          <div class="four wide column ">
            <div class="ui fluid card">
            <div class="image">
              <img width="30%" height="10%" :src="geturl(pending.data())" />
            </div>
            <div class="content">
              <a class="header">{{ pending.data()["name"] }}</a>
              <div class="meta">
                User Account ID:
                <span class="date">{{ pending.data()["auth_id"] }}</span>
              </div>
            </div>
            <div class="extra content">
              <a>
                <i class="address book icon"></i>

                {{ pending.data()["address"] }}
              </a>
            </div>

            <button
              class="positive ui button"
              v-on:click="approve(pending)"
              type="button"
            >
              Approve
            </button>
            
          </div>
          </div>
          <br/>
          <br/>
        </li>
      </ul>
      <div class="ui special cards"></div>
    </div>
  </div>
</template>

<script>
import { database } from "@/firebase/";
export default {
  name: "Master",
  data() {
    return {
      pending_attractions: [],
    };
  },

  beforeCreate() {
    database
      .collection("attraction2")
      .get()
      .then((querySnapShot) => {
        let item = {};
        querySnapShot.forEach((doc) => {
          item = doc.data();
          if (item.approved == "pending") {
            this.pending_attractions.push(doc);

            // router.push("/");
          }
        });
      })
      .then(function() {
        console.log("PENDING");
      });
  },
  methods: {
    geturl: function(doc) {
      return doc["verification_url"];
    },
    approve: function(document) {
      var id = document.id;
      console.log(id);
      console.log("APPROVED");
      database
        .collection("attraction2")
        .doc(id)
        .update({
          approved: "approved",
        })
        .then(function() {
          alert("Succesfully approved");
        });
      console.log(this.pending_attractions);
      console.log(typeof this.pending_attractions[0]);
      // this.pending_attractions.filter(function(value) {
      //       return value[0] != id;
      //     });

      console.log(this.pending_attractions);

      for (var key in this.pending_attractions) {
        console.log(this.pending_attractions[key]["id"]);
        if (this.pending_attractions[key]["id"] == id) {
          console.log(this.pending_attractions[key]);
          this.pending_attractions.splice(key, 1);

          console.log(this.pending_attractions);
        }
      }
    },
  },
};
</script>