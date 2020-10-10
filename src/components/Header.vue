<template>
   <div>
    <header>
        <nav>
        <h1><router-link to="/" exact id="index">{{ msg }}</router-link></h1>
        
        <router-link to="/about" exact class="small" id="about">ABOUT US </router-link>
        <router-link to="/merchants" exact class="small">FOR MERCHANTS</router-link>
        

        </nav>
    </header>
    </div>
  
</template>

<script>
export default {
  
  data(){
    return{
        msg: 'YOUR SINGAPORE'
        }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div{
    border-bottom-style: solid;
    border-bottom-color: white;
    border-bottom-width: 1px;
    height:80px;
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

</style>