<template>
   <div>
     <header>
       
        <h2>{{title}}</h2>
        <h3>{{date}}</h3>
      
      </header>
      
    
    </div>
  
</template>

<script>

export default {
  
  data(){
    return{
      title:"Trip Details",
      date:"Selected Date",
    
        
    }
  },
  
 
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header{
  overflow: hidden;
  background: white url('https://snap-photos.s3.amazonaws.com/img-thumbs/960w/8F830E9235.jpg') no-repeat center center;
  background-size: cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  opacity: 0.6;
  line-height: 2.8em;
  height:150px;
  position: relative;
}

h2{
    color:ivory;
    float:left;
    padding:20px;
    font-display:Abel;

}
h3{
    padding:5px;
    color : white;
    float: left;
    margin-left: 1000px;
}
</style>