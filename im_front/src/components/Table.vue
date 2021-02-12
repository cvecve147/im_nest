<template>
  <div>
    <div
      class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8"
    >
      <div
        class="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12"
      >
        <div class="flex justify-between">
          <div
            class="inline-flex border rounded w-7/12 px-2 lg:px-6 h-12 bg-transparent"
          >
            <div
              class="flex flex-wrap items-stretch w-full h-full mb-6 relative"
            >
              <div class="flex">
                <span
                  class="flex items-center leading-normal bg-transparent rounded rounded-r-none border border-r-0 border-none lg:px-3 py-2 whitespace-no-wrap text-grey-dark text-sm"
                >
                  <svg
                    width="18"
                    height="18"
                    class="w-4 lg:w-auto"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.11086 15.2217C12.0381 15.2217 15.2217 12.0381 15.2217 8.11086C15.2217 4.18364 12.0381 1 8.11086 1C4.18364 1 1 4.18364 1 8.11086C1 12.0381 4.18364 15.2217 8.11086 15.2217Z"
                      stroke="#455A64"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M16.9993 16.9993L13.1328 13.1328"
                      stroke="#455A64"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </div>
              <input
                type="text"
                class="flex-shrink flex-grow flex-auto leading-normal tracking-wide w-px flex-1 border border-none border-l-0 rounded rounded-l-none px-3 relative focus:outline-none text-xxs lg:text-xs lg:text-base text-gray-500 font-thin"
                placeholder="Search"
                v-model="search"
              />
            </div>
          </div>
          <div>
            <button
              class="px-5 py-2 mx-2 border-blue-700 border text-blue-700 rounded transition duration-300 hover:bg-blue-900 hover:text-white focus:outline-none"
              @click="exportfile"
            >
              匯出
            </button>
          </div>
          <div>
            <router-link
              class="px-5 py-2 mx-2 border-green-500 border text-green-500 rounded transition duration-300 hover:bg-green-600 hover:text-white focus:outline-none"
              to="/create/1"
              admin="true"
              v-if="datapath == 'admin' && user.power == 'root'"
            >
              新增管理員
            </router-link>
            <router-link
              class="px-5 py-2 mx-2 border-green-500 border text-green-500 rounded transition duration-300 hover:bg-green-600 hover:text-white focus:outline-none"
              to="/create/0"
              admin="false"
              v-if="datapath == 'person' && user.power == 'root'"
            >
              新增用戶
            </router-link>
            <router-link
              class="px-5 py-2 mx-2 border-blue-700 border text-blue-700 rounded transition duration-300 hover:bg-blue-900 hover:text-white focus:outline-none"
              to="/import"
              v-if="datapath == 'person' && user.power == 'root'"
            >
              匯入
            </router-link>
          </div>
        </div>
      </div>
      <div
        class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg"
      >
        <table class="min-w-full" v-if="data.length">
          <thead>
            <tr>
              <th
                class="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-blue-500 tracking-wider"
                v-for="(i, index) in data[0]"
                :key="index"
                :class="{
                  hidden:
                    index == '_id' ||
                    index == 'updatedAt' ||
                    index == 'createdAt' ||
                    index == '__v',
                }"
              >
                {{ metchTable(index) }}
              </th>

              <th
                :colspan="this.datapath == 'person' ? 2 : 1"
                class="px-6 py-3 border-b-2 border-gray-300  text-center text-sm leading-4 text-blue-500 tracking-wider"
                v-if="user.power == 'root'"
              >
                功能
              </th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr v-for="item in filers" :key="item.id" class="m-2">
              <td
                class="px-6 py-4 whitespace-no-wrap border-b border-gray-500"
                v-for="(i, index) in filers[0]"
                :key="index"
                :class="{
                  hidden:
                    index == '_id' ||
                    index == 'updatedAt' ||
                    index == 'createdAt' ||
                    index == '__v',
                }"
              >
                <div
                  class="text-sm leading-5 text-blue-900"
                  v-html="item[index]"
                ></div>
              </td>

              <td
                class="px-6 py-4 whitespace-no-wrap text-center border-b border-gray-500 text-sm leading-5"
                v-if="user.power == 'root' && datapath == 'person'"
              >
                <button
                  class="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
                  @click="changeData(item._id)"
                >
                  修改
                </button>
              </td>
              <td
                class="px-6 py-4 whitespace-no-wrap text-center border-b border-gray-500 text-sm leading-5"
                v-if="user.power == 'root'"
              >
                <button
                  class="px-5 py-2 border-red-500 border text-red-500 rounded transition duration-300 hover:bg-red-700 hover:text-white focus:outline-none"
                  @click="delData(item)"
                >
                  刪除
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div
          v-else
          class="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-blue-500 tracking-wider"
        >
          沒有資料
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import XLSX from "xlsx"
export default {
  computed: {
    filers() {
      return this.data.filter((user) => {
        var tag = []
        if (this.datapath == "admin") {
          tag = ["name"]
        } else {
          tag = ["name", "industry", "power", "position"]
        }
        var find = true
        tag.forEach((el) => {
          if (user[el].toLowerCase().indexOf(this.search.toLowerCase()) != -1) {
            find = true
          }
        })
        return find
      })
    },
  },
  data() {
    return {
      search: "",
      message: "",
      user: {},
    }
  },
  props: {
    data: Array,
    datapath: String,
  },
  methods: {
    metchTable(val) {
      switch (val) {
        case "id":
          return "編號"
        case "name":
          return "帳號"
        case "level":
          return "級別"
        case "industry":
          return "產業"
        case "position":
          return "職位"
        case "power":
          return "權限"
        case "phoneNumber":
          return "電話"
        case "address":
          return "住址"
        case "management":
          return "管理"
        default:
          break
      }
    },
    changeData(val) {
      this.$router.push("/AdminEdit/" + val)
    },
    exportfile() {
      var data = this.data.filter((user) => {
        var tag = []
        if (this.datapath == "admin") {
          tag = ["name"]
        } else {
          tag = ["name", "industry", "power", "position"]
        }
        var find = false
        tag.forEach((el) => {
          if (user[el].toLowerCase().indexOf(this.search.toLowerCase()) != -1) {
            find = true
          }
        })
        return find
      })

      var datas = [
        ["帳號", "電話", "住址", "級別", "產業", "職位", "管理", "權限"],
      ]
      data.forEach((el) => {
        var arr = []
        arr.push(el.name)
        arr.push(el.phoneNumber)
        arr.push(el.address)
        arr.push(el.level)
        arr.push(el.industry)
        arr.push(el.position)
        arr.push(el.management)
        datas.push(arr)
      })
      const ws = XLSX.utils.aoa_to_sheet(datas)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, "SheetJS")
      XLSX.writeFile(wb, this.search + "_人員資料.xlsx")
    },

    async fetch() {
      var url = ""
      if (this.datapath == "person") {
        url = "users"
      } else {
        url = "manager"
      }
      const res = await this.$http.get(url)
      this.data = res.data
    },
    async delData(val) {
      if (!confirm("確認刪除 " + val.name + " 的資料嗎?")) {
        return
      }
      try {
        await this.$http.delete("user/" + val._id)
        await this.fetch()
        this.$message({
          showClose: true,
          message: "刪除成功",
          type: "success",
        })
      } catch (error) {
        this.$message({
          showClose: true,
          message: "權限不足 請重新登入",
          type: "error",
        })
        this.$router.push("logout")
      }
    },
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("user"))
  },
}
</script>
<style></style>
