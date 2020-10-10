<template>
  <div class="main">
      
      <h1 id="title"> Start Your Local<br>Journey Here </h1> 
      <p> Plan your vacation and support our local tourism <br>during this covid period </p>
      <button v-on:click= "$router.push('/date')"> START </button>
  </div>
</template>

<script>

export default {
     beforeCreate: function() {
        document.body.className = 'home';
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
    font-size:60px;
    color: white;
    font-weight: lighter;
}
p{
    position: relative;
    margin-left: 10%;
    font-size:30px;
    text-align: left;
    color: white;
}
button{
    position: relative;
    right:35%;
    border-style:none;
    border-radius:5px;
    width:150px;
    height: 50px;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.418);
    color: white;
    text-decoration: none;
    font-size:15px;
}

</style>
