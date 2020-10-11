<template>
   <div>
     <header>
        <h2>Trip <br> Details</h2>
        <h3 id="title1">Selected Date</h3>
        <p>{{date}} </p>
        <h3 id= "title2">Weather</h3>

      </header> 
    </div>
</template>

<script>

export default {

  data(){
    return{
      date:''
    
    }
  },
  mounted() {
    if (sessionStorage.date) {
      this.date = sessionStorage.date;
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header{
    background-image: url(../assets/Rain.jpg);
    background-repeat: no-repeat;
    overflow: hidden;
    background-size: cover;
    height:180px;
    
}

h2{
    color:ivory;
    float:left;
    padding:20px;
    text-align: justify;
    font-display:Abel;

}
h3{
    padding:5px;
    color : rgb(112, 112, 112);
    float: left;
    margin-left: 80%;
    line-height: 0px;
}
p{
  position: relative;
  margin-left: 89%;
  color:white;
  font-weight:bold;
}
#title2{
  position: relative;
  margin-top: 0;
}

</style>