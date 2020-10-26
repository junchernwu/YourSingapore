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
            <div id="image">
              <label id="image-label">Upload Verification Details</label>
              <input type="file" accept="image/png, image/jpeg" name="file-upload" value="file-upload" v-on:change="imgUpload">
            </div>
            <button class="ui fluid large red submit button" v-on:click.prevent= "checkform">
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
import {  storage } from "@/firebase/";
export default {
  name: "signUp",
  data() {
    return {
      email: "",
      password: "",
      validation_photo: "",
      success: false
    };
  },
  methods: {imgUpload(e){
        
        var files = e.target.files;
        var image = files[0];
        console.log("IMAGE")
        this.validation_photo = image
        console.log(this.validation_photo)
      },
    checkform: function(){
      if (this.validation_photo == "") {
        alert("Please attach validation details ")
      } else {
        this.submit()
      }
    },
    submit: function() {
      var uid = null
      var success= this.success;
      var router= this.$router;
      var validation_photo = this.validation_photo
      

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
            
            // console.log("VALIDATION PHOTO")
            // console.log(validation_photo)
            if(success){
              // console.log("successfully routed");
              // console.log(uid)
              sessionStorage.uid = uid
              var storageRef = storage.ref();
              var attractionRef = storageRef.child('images/validation_details/' + uid);
              attractionRef.put(validation_photo).then(router.push('/merchant/form'))
              
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
