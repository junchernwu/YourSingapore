<template>
  <div id="main">
    <div class="ui  middle aligned center aligned grid">
      <div class="column">
        <h2 class="ui image header">
          <div class="content" style="color: white;">
            Fill In Your Details
          </div>
        </h2>
        <form class="ui large form" @submit.prevent="submit">
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
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "signUp",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    submit: function() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          function(user) {
            console.log("SUCCESS");
            alert(user + "Your account has been created!");
          },
          function(err) {
            alert("oops" + err.message);
          }
        );
    },
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
