import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import { Message } from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import axios from "axios"
import "./index.css"

Vue.prototype.$http = axios.create({
  baseURL: "http://120.105.160.10:3000/auth",
})
Vue.prototype.$message = Message
Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app")
