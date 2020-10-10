<template>
  <div class="main">
      
      <h1 id="title"> Start Your Local<br>Journey Here </h1> 
      <p> Plan your vacation and support our local tourism <br>during this covid period </p>
      <button> <router-link to="/date" exact> START </router-link> </button>
  </div>
</template>

<script>

export default {
     beforeCreate: function() {
        document.body.className = 'index';
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1{
    position:absolute;
    top:25%;
    left:10%;
    text-align: left;
    font-size:60px;
    color: white;
    font-weight: lighter;
}
p{
    position: absolute;
    left:10%;
    top:48%;
    font-size:30px;
    text-align: left;
    color: white;
}
button{
    border-style:none;
    border-radius:5px;
    width:150px;
    height: 50px;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.418);
    position:relative;
    margin-top:30%;
    margin-right:70%;
}
a{
    color: white;
    text-decoration: none;
    font-size:15px;
}

</style>
