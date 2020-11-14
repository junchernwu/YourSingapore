<template>
   <div id="main">
    <header>
        <nav>
        <h1><router-link to="/" exact id="index">{{ msg }}</router-link></h1>
        <div class="small">
          <a class="active item">
            <router-link to="/about" exact id="about">ABOUT US </router-link>
          </a>
          <a class="item">
          <router-link to="/login" exact>FOR MERCHANTS</router-link>
          </a>
        </div>
        
        </nav>
    </header>
    </div>
  
</template>

<script>
import $ from "jquery";
export default {
  data(){
    return{
        msg: 'YOUR SINGAPORE'
        }
  },
  mounted() {
    $(document).ready(function() {
      $(".ui  .item").on("click", function() {
        console.log("removed");
        $(".ui .item").removeClass("active");
        $(this).addClass("active");
      });
    });
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#main{
    border-bottom-style: solid;
    border-bottom-color: white;
    border-bottom-width: 1px;
    height:80px;
    width: 100%;
    top: 0;
    
}

h1 {
    float: left;
    margin-top:2vw;
    text-align: center;
    color: white;
    font-weight:lighter;
    
    font-size:20px;
    text-decoration: none;  
}

a{
  color:white;
  text-decoration: none;
}
 
.small{
    float:left;
    margin-left:20vw;
    margin-top:2.5vw;
    font-size:15px; 
    font-weight: lighter;
    color : white;
    text-decoration: none;
    
}
#about{
    padding-right:20px;
}

.ui.segment {
  background-color: #0a223d;
}

.active {
  border-left-color: green;
}

nav{
  position: relative;
  left:45%;

}
</style>
