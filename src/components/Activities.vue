<template>
  <div class="main">
      <!-- Testing session storage -->
      {{date}}
      {{location}}
  </div>
</template>

<script>
export default {
    data(){
        return{
            date:'',
            location:''
        }
    },
    beforeCreate: function() {
        document.body.className = 'activities';
    },
    mounted() {
    if (localStorage.location) {
      this.location = sessionStorage.location;
    }
    if(sessionStorage.date){
        this.date=  sessionStorage.date;
    }
    
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div{
    color:white;
}


</style>
