<template>
  <div id="main">
    <div class="ui  middle aligned center aligned grid">
      <div class="column">
        <h2 class="ui image header">
          <div class="content" style="color: white;">
            Fill In Your Details
          </div>
        </h2>
        <form class="ui large form">
          <div class="ui stacked secondary  segment">
            <div class="field">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input
                  type="text"
                  name="email"
                  placeholder="E-mail address"
                  v-model="email"
                />
              </div>
            </div>
            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  v-model="password"
                />
              </div>
            </div>
            <button class="ui fluid large red submit button" v-on:click.prevent= "submit">
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"

export default {
  name: "signUp",
  data() {
    return {
      email: "",
      password: "",
      success: false
    };
  },
  methods: {
    submit: function() {
      var uid = null
      var success= this.success;
      var router= this.$router;
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          function(user) {
            console.log("SUCCESS");
            success=true;
            alert(user + "Your account has been created!");
            console.log("UID FROM REGISTRATION")
            uid = user.user.uid
          },
          function(err) {
            alert("oops" + err.message);
          }
        ).then(
          function(){
            if(success){
              console.log("successfully routed");
              console.log(uid)
              sessionStorage.uid = uid
              router.push('/merchant/form');
            }
          } 
        )
    }
  },
};
</script>

<style scoped>
body > .grid {
  height: 300%;
}
.image {
  margin-top: -100px;
}
.column {
  max-width: 600px;
}
</style>
