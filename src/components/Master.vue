<template>
  <div class="main">
    <h1 id="title">
      Master Branch<br />
      Start Verifying and Approving Users
    </h1>
    <br />
    <br />
    <div class="ui three wide column padded grid cards">
      <div class="ui fluid card" v-for="(pending, index) in pending_attractions" v-bind:key="index">

     
            <div class="image">
              <img id="resize" :src="geturl(pending.data())" />
            </div>
            <div class="content">
              <a class="header">{{ pending.data()["name"] }}</a>
              <div class="meta">
                User Account ID:
                <span class="date">{{ pending.data()["auth_id"] }}</span>
              </div>
            </div>
            <div class="meta" id="standard">
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

<style scoped>
#resize {
  max-width: 80%;
  display: block;
  margin-left: auto;
  margin-right: auto;

}
#standard {
  height: 80px;
}
.main {
  padding: 30px;
}
#title {
  padding: 0px 10px;
}
</style>
