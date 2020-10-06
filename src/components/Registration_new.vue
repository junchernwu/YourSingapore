<template>
  <div id="main">
    <div class="ui  middle aligned center aligned grid">
      <div class="column">
        <h2 class="ui image header">
          <div class="content" style="color: white;">
            Fill In Your Details
          </div>
        </h2>
        <form
          action="https://s.codepen.io/voltron2112/debug/PqrEPM?"
          method="get"
          class="ui large form"
        >
          <div class="ui stacked secondary  segment">
            <div class="field">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input type="text" name="email" placeholder="E-mail address" />
              </div>
            </div>
            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input type="password" name="password" placeholder="Password" />
              </div>
            </div>
            <div class="ui fluid large red submit button">Login</div>
          </div>

          <div class="ui error message"></div>
        </form>

        <div class="ui message">
          New to us?
          <router-link
            to="/merchant/Registration_new"
            exact
            style="color: blue; text-decoration: none"
            >Register</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script></script>

<style scoped>
body > .grid {
  height: 300%;
}
.image {
  margin-top: -100px;
}
.column {
  max-width: 600px;
}
</style>
