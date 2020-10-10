<template>
  <div class="main">
    <h1 id="title"> About Us</h1> 
    <p id="desc"> Welcome to Your Singapore, a web application which aims to complement the governments’ SingapoRediscovers campaign in a bid to boost local tourism, thereby helping the Arts Entertainment and Recreation sector tide past this pandemic. </p>
    <p id="contact">CONTACT DETAILS</p>  
    <p id="contactdesc"> Feel free to contact us via phone or email </p>
    <p class="contactbody" id="address"> NUS School of Computing, COM1, 13, Computing Dr, 117417</p>
    <p class="contactbody" id="phone"> +65 6253 3762</p>
    <p class="contactbody" id="email"> btsgunited@gmail.com </p>

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
    position: absolute;
    text-align: left;
    color: white;
    left:10%;
}
#desc{
    top:38%;
    font-size:30px;
}

#contact{
    top:68%;
    font-size:15px;
}
.contactbody{    
    font-size:15px;
    left:13%;
}

#contactdesc{
    top:73%;
}
#address{
    top:78%;
}
#phone{
    top:82%;
}
#email{
    top:86%;
}

h1{
    position:absolute;
    top:25%;
    left:10%;
    text-align: left;
    font-size:60px;
    color: white;
    font-weight: lighter;
}
</style>
