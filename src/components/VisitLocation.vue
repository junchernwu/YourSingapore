<template>
  <div class="main">
    <h1 id="title"> Where would you <br> like to go? </h1> 
      <select name="location" id="location" v-model= "location">
        <option value="" selected disabled>Location</option>
        <option value="North">North</option>
        <option value="South">South</option>
        <option value="East">East</option>
        <option value="West">West</option>
        <option value="Central">Central</option>
      </select>
      <button v-on:click= "persist();$router.push('/reminder')">></button>
  </div>
</template>

<script>
export default {
  data(){
    return{
        location:''
    }
  },
  beforeCreate: function() {
        document.body.className = 'location';
  },
  mounted() {
    if (sessionStorage.location) {
      this.location = sessionStorage.location;
    }
  },
  methods:{
    persist:function(){
      sessionStorage.location= this.location;
    }
    
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1{
    position:relative;
    margin-left: 10%;
    margin-top:10%;
    text-align: left;
    font-size:4vw;
    color: white;
    font-weight: lighter;
}
  select {
    position: relative;
    margin-left: 10%;
    border:none;
    border-radius: 5px;
    background-color: rgba(80, 80, 80, 0.5);
    color: white;
    width: 15vw;
    height:40px;
    font-weight: bold;
    font-family: Arial, Helvetica, sans-serif;
    padding-left:10px;
    font-size:15px;
    -webkit-appearance:none;
  }

  button{
    background-color: rgba(255, 255, 255, 0.295);
    position: absolute;
    left:90%;
    bottom: 45%;
    border:none;
    width:50px;
    height:50px;
    border-radius: 50%;
    color:white;
    font-size:20px;
    text-decoration: none;
    font-weight:bold;
  }


</style>
