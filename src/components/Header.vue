<template>
   <div>
    <header>
        <nav>
        <h1><router-link to="/" exact id="index">{{ msg }}</router-link></h1>
        <a class="active item">
          <router-link to="/about" exact class="small" id="about">ABOUT US </router-link>
        </a>
        <a class="item">
         <router-link to="/login" exact class="small">FOR MERCHANTS</router-link>
        </a>
        
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
div{
    border-bottom-style: solid;
    border-bottom-color: white;
    border-bottom-width: 1px;
    height:80px;
    width: 100%;
    top: 0;
    zIndex: 1;
}

h1 a{
    position: relative;
    float: left;
    top:30px;
    text-align: center;
    color: white;
    font-weight:lighter;
    margin-left:45%;
    font-size:20px;
    text-decoration: none;  
}
 
.small{
    position: relative;
    float:left;
    top:30px;
    left:20%;
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
</style>
