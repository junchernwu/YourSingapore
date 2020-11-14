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
  margin-left: 10vw;
  margin-top:10vw;
  text-align: left;
  font-size:4vw;
  color: white;
  font-weight: lighter;
}
p{
  position: relative;
  margin-left: 10vw;
  font-size:2vw;
  text-align: left;
  color: white;
}
button{
  position: relative;
  margin-left: 10vw;
  border-style:none;
  border-radius:5px;
  width:10vw;
  height: 4vw;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.418);
  color: white;
  text-decoration: none;
  font-size:1.5vw;
}

</style>