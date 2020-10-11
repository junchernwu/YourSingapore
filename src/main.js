import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import myRoutes from "./routes.js";

import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBCe2AqXx3qP_mO7D9Ev3AyF17mcOoJRlQ",
  authDomain: "singapore-united.firebaseapp.com",
  databaseURL: "https://singapore-united.firebaseio.com",
  projectId: "singapore-united",
  storageBucket: "singapore-united.appspot.com",
  messagingSenderId: "1013321690441",
  appId: "1:1013321690441:web:ad3dabcfc79f26b081fe98",
  measurementId: "G-XJB9B9ZGSX",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.use(VueRouter);
Vue.config.productionTip = false;

const myRouter = new VueRouter({
  routes: myRoutes,
  mode: "history",
});
new Vue({
  render: (h) => h(App),
  router: myRouter,
}).$mount("#app");
