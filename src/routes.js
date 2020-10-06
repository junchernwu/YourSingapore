import Home from "./components/Home.vue";

import About from "./components/About.vue";
import MerchantForm from "./components/MerchantForm";
import Registration_new from "./components/Registration_new";
export default [
  { path: "/", component: Home },
  { path: "/merchants", component: MerchantForm },
  { path: "/about", component: About },
  { path: "/merchant/form", component: MerchantForm },
  { path: "/merchant/Registration_new", component: Registration_new },
];
