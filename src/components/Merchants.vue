<template>
  <div id="main">
    <router-link to="/login" exact style="color: white; text-decoration: none">Login</router-link>
  </div>
</template>

<script>
export default {
     beforeCreate: function() {
        document.body.className = 'merchants';
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div{
  text-align: center;
}


</style>
