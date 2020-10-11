<template>
  <div>
    <div class="ui inverted segment">
      <div class="ui secondary inverted pointing menu">
        <a class="active item">
          <router-link
            to="/about"
            exact
            style="color: white; text-decoration: none"
            >About Us</router-link
          >
        </a>
        <a class="item">
          <router-link
            to="/merchants"
            exact
            style="color: white; text-decoration: none"
            >Merchants</router-link
          >
        </a>

        <a class="item"> Explore </a>
        <div class="right menu ui tiny images">
          <img
            class="ui medium circular image"
            src="https://www.vhv.rs/dpng/d/592-5927996_your-singapore-hd-png-download.png"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  mounted() {
    $(document).ready(function() {
      $(".ui  .item").on("click", function() {
        console.log("removed");
        $(".ui .item").removeClass("active");
        $(this).addClass("active");
      });
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header {
  background: #0A223D;
  padding: 20px;
  border-bottom: solid;
  border-width: 1px;
  border-color: #E7E7F266;
  margin-bottom: 20px;
}
h1 {
  display: inline;
  padding: 20px;
}
p {
  display: inline;
  padding: 10px;
}

.ui.segment {
  background-color: #0a223d;
}

.active {
  border-left-color: green;
}
</style>
