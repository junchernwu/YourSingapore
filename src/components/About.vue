<template>
  <div class="main">
    <h1 id="title"> About Us</h1> 
    <p id="desc"> Welcome to Your Singapore, a web application which aims to complement the governments’ SingapoRediscovers campaign in a bid to boost local tourism, thereby helping the Arts Entertainment and Recreation sector tide past this pandemic. </p>
    <p>CONTACT DETAILS</p>  
    <p> Feel free to contact us via phone or email </p>
    <p class="contactbody"> <img src="../assets/Home.png" width=30px> NUS School of Computing, COM1, 13, Computing Dr, 117417</p>
    <p class="contactbody"> <img src="../assets/Phone.png" width=30px> +65 6253 3762</p>
    <p class="contactbody"> <img src="../assets/Mail.png" width=30px> btsgunited@gmail.com </p>

  </div>
</template>

<script>
  export default {
       beforeCreate: function() {
          document.body.className = 'about';
      }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p{
    position: relative;
    text-align: left;
    color: white;
    margin-left: 10%;
    
}
#desc{
    font-size: 30px;
    
}

h1{
    position:relative;
    margin-left: 10%;
    margin-top:10%;
    text-align: left;
    font-size:60px;
    color: white;
    font-weight: lighter;
}

</style>
