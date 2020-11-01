<template>
  <div class="main">
    <h1 id="title"> When would you <br> like to go? </h1> 
    
      <input type="date" id="date" name="date" v-model= "date">
      <button v-on:click= "persist();$router.push('/location')">></button>
      
  </div>
</template>

<script>

export default {
  data(){
    return{
        date:''
    }
  },
  beforeCreate: function() {
        document.body.className = 'date';
  },
  mounted() {
    if (sessionStorage.date) {
      this.date = sessionStorage.date;
      
    }
  },
  methods:{
    persist:function(){
      sessionStorage.date= this.date;
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
    font-size:60px;
    color: white;
    font-weight: lighter;
}
  input[type="date"] {
    position: relative;
    margin-left: 10%;
    border:none;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.295);
    color:white;
    width:250px;
    height:40px;
    font-weight: bold;
    font-family: Arial, Helvetica, sans-serif;
    letter-spacing: 2px;
    padding-left:10px;
    font-size:15px;
  }
  input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(100%);
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
