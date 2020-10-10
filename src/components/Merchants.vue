<template>
  <div id="main">
    <p>For Merchants</p>
    <router-link to="/merchant/form" exact style="text-decoration: none">Merchant Form</router-link>
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


</style>
