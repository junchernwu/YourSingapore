<template>
  <div class="main">
      <h1 id="title"> The virus is still<br> amongst us </h1>
      <p> As we go about re-discovering Singapore, do remember to </p>
      <p> <img src="../assets/Group.png" width=30px> Go in groups of 5 or less </p>
      <p> <img src="../assets/Mask.png" width=40px>  Mask up <p> 
      <p><img src="../assets/Wash.png" width=40px>  Wash your hands </p>
      
      <button v-on:click= "$router.push('/activities')">></button>
  </div>
</template>

<script>
export default {
  beforeCreate: function() {
        document.body.className = 'reminder';
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
    margin-left:10%;
    font-size:30px;
    text-align: left;
    color: white;
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
