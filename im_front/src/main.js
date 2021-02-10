import Vue from "vue"
import App from "./App.vue"
import router from "./router"

import axios from "axios"
import "./index.css"

Vue.prototype.$http = axios.create({
  baseURL: "http://localhost:3000/auth",
})

Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app")
