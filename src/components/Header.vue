<template>
  <div>
    <header>
      <nav>
        <h1>{{ msg }}</h1>
        <router-link to="/merchants" exact style="color: white; text-decoration: none">FOR MERCHANTS</router-link>
        <p></p>
        <router-link to="/about" exact style="color: white; text-decoration: none">ABOUT US</router-link>
      </nav>
    </header>
  </div>

</template>

<script>

export default {
  props:
      {
        msg:{
          type:String
        }
      }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header {
  background: #0A223D;
  padding: 20px;
  border-bottom: solid;
  border-width: 1px;
  border-color: #E7E7F266; //NOTE: 66 represent 0.4 opacity
}
h1 {
  display: inline;
  padding: 20px;
}
p {
  display: inline;
  padding: 10px;
}
</style>