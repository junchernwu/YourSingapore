<template>
  <div class="main">
    <h1 id="title"> When would you <br> like to go? </h1> 
    
      <input type="date" id="date" name="date" v-model= "date" min="">
      <button v-on:click= "persist()">></button>
      
  </div>
</template>

<script>

export default {
  data(){
    return{
        date:'',
        maxDate:''
    }
  },
  beforeCreate: function() {
        document.body.className = 'date';
  },
  mounted() {
    document.getElementById("date").min= new Date().toISOString().split("T")[0];
    console.log(document.getElementById("date").min)
    if (sessionStorage.date) {
      this.date = sessionStorage.date;
      
    }
  },
  methods:{
    persist:function(){
      var current=new Date().getTime()
      this.maxDate=this.formatDate(new Date(current+ (14*86400000)).toString())
      if(document.getElementById("date").value==""){
        alert("Date input required");
      }else{
        if(document.getElementById("date").value>=this.maxDate){
          alert("The weather forecast for the date you have selected may not be accurate.")
        }
        sessionStorage.date= this.date;
        this.$router.push('/location');
      }
    },
    formatDate: function(date) {
          var d = new Date(date),
              month = '' + (d.getMonth() + 1),
              day = '' + d.getDate(),
              year = d.getFullYear();

          if (month.length < 2) 
              month = '0' + month;
          if (day.length < 2) 
              day = '0' + day;

          return [year, month, day].join('-');
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
    font-size: 4vw;
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
    width: 15vw;
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
