<template>
  <div>
    <h1>Submitted!</h1>
    <h2>Please wait up to 2 working days for your attraction to be verified and listed.</h2>
    <router-link to="/" class="ui button" tag="button">HOME</router-link>
  </div>
</template>

<script>
export default {
name: "Verification"
}
</script>

<style scoped>
  div {
    position: relative;
    top: 15%;
  }
  .ui.button {
    margin-top: 30px;
    background-color: #FF5048;
    color: white;
    border-radius: 20px;
    width: 200px;
  }
</style>