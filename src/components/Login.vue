<template>
  <div id="main">
    <div class="ui  middle aligned center aligned grid">
      <div class="column">
        <h2 class="ui image header">
          <div class="content" style="color: white;">
            Log-in to your account
          </div>
        </h2>
        <form class="ui large form" @submit.prevent="login">
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
            <button class="ui fluid large red submit button" type="submit">
              Login
            </button>
          </div>
        </form>

        <div class="ui message">
          New to us?
          <router-link
            to="/merchant/Registration_new"
            exact
            style="color: blue; text-decoration: none"
            >Register</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login: function() {
      var router= this.$router;
      var uid = null
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          function() {
            console.log("LOGGED IN SUCCESSFULLY")
            var loggedin = firebase.auth().currentUser;
            uid = loggedin.uid
            router.push('/merchant/'+uid);
            console.log(uid)

          },
          function(err) {
            alert("oops" + err.message);
          }
        );
    },
    persist: function(){
        sessionStorage.date= this.date;
    }
  }
}
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