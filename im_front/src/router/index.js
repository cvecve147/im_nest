import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import Login from "../views/Login.vue"
import Admin from "../views/Admin.vue"
import Person from "../views/Person.vue"
import Logout from "../views/Logout.vue"
import Edit from "../views/Edit.vue"
import Create from "../views/Create.vue"
import AdminEdit from "../views/AdminEdit.vue"
import Import from "../views/Import.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/",
        name: "Person",
        component: Person,
        meta: {
          title: "個人",
        },
      },
      {
        path: "/Create/:admin",
        name: "Create",
        component: Create,
        meta: {
          title: "新增",
        },
        props: true,
      },
      {
        path: "/Import",
        name: "Import",
        component: Import,
        meta: {
          title: "匯入",
        },
      },
      {
        path: "/AdminEdit/:id",
        name: "AdminEdit",
        component: AdminEdit,
        meta: {
          title: "編輯",
        },
        props: true,
      },
      {
        path: "/Admin",
        name: "Admin",
        component: Admin,
        meta: {
          title: "管理人",
        },
      },
    ],
  },
  {
    path: "/Edit",
    name: "Edit",
    component: Edit,
    meta: {
      title: "個人編輯",
    },
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
    meta: {
      title: "登入",
    },
  },
  {
    path: "/Logout",
    name: "Logout",
    component: Logout,
  },
]

const router = new VueRouter({
  routes,
})

export default router
