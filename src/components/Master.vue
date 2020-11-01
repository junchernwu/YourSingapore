<template>
  <div class="main">
    <h1 id="title">
      Master Branch<br />
      Start Verifying and Approving Users
    </h1>
    <ul reversed>
      Pending approval
      <li v-for="(pending, index) in pending_attractions" v-bind:key="index">
        {{ pending }}
        <button v-on:click="approve(pending)" type="button">
          Approve
        </button>
      </li>
    </ul>
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
            this.pending_attractions.push(doc.id);

            // router.push("/");
          }
        });
      })
      .then(function() {
        console.log("PENDING");
      });
  },
  methods: {
    approve: function(document_id) {

      var id = document_id;
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
      console.log(typeof(this.pending_attractions[0]))
      // this.pending_attractions.filter(function(value) {
      //       return value[0] != id;
      //     });
      
      
      console.log(this.pending_attractions);
      
      for(var key in this.pending_attractions) {
        console.log(key)
        if(this.pending_attractions[key] == id) {
                console.log(this.pending_attractions[key])
                this.pending_attractions.splice(key, 1);

                console.log(this.pending_attractions)
          }
        }
      }
     

  },

};
</script>
