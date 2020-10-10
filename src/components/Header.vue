<template>
   <div>
    <header>
        <nav>
        <h1><router-link to="/" exact id="index">{{ msg }}</router-link></h1>
        
        <router-link to="/aboutus" exact id="about">ABOUT US </router-link>
        <router-link to="/merchants" exact id="merch">FOR MERCHANTS</router-link>
        

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
    text-align: center;
    color: white;
    font-weight:lighter;
    padding-left:40%;
    float: left;
    font-size:20px;
}
 
#about{
    padding-right:20px;;
}
a{
    position: relative;
    top:30px;
    left:100px;
    font-size:15px; 
    font-weight: lighter;
    color : white;
    text-decoration: none;
    
}

</style>