<template>
  <div>
    <headers></headers>
    <div class="container  mx-auto justify-center flex w-100">
      <div
        class="bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4 flex flex-col mt-60 w-1/2"
      >
        <div>
          <h3 class="text-grey-darker text-2xl  my-5 font-semibold">
            更新個人資料
          </h3>
        </div>
        <div>
          <span class="text-red-600">{{ message }}</span>
        </div>
        <div class="mb-6 ">
          <label class="block text-grey-darker text-sm font-bold mb-2">
            通訊地址
          </label>
          <input
            class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            placeholder="您的通訊地址"
            v-model="user.address"
          />
          <label class="block text-grey-darker text-sm font-bold mb-2">
            手機號碼
          </label>
          <input
            class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            placeholder="您的手機號碼"
            v-model="user.phoneNumber"
          />
          <label class="block text-grey-darker text-sm font-bold mb-2">
            工作產業
          </label>
          <select
            class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            v-model="user.industry"
          >
            <option :value="item" v-for="item in industrys" :key="item">{{
              item
            }}</option>
          </select>
          <input
            class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            placeholder="您的工作產業"
            v-model="user.industry_other"
            v-if="user.industry == '其他'"
          />
          <label class="block text-grey-darker text-sm font-bold mb-2">
            工作職位
          </label>
          <input
            class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            placeholder="您的工作職位"
            v-model="user.position"
          />
          <label class="block text-grey-darker text-sm font-bold mb-2">
            工作類別 {{ user.management }}
          </label>
          <label class="inline-flex items-center">
            <input
              type="radio"
              class="form-radio"
              value="true"
              v-model="user.management"
            />
            <span class="ml-2">管理</span>
          </label>
          <label class="inline-flex items-center ml-6">
            <input
              type="radio"
              class="form-radio"
              value="false"
              v-model="user.management"
            />
            <span class="ml-2">非管理</span>
          </label>
        </div>
        <div class="flex justify-center ">
          <button
            class="bg-blue hover:bg-blue-dark text-blue-500 font-bold py-2 px-4 rounded"
            type="button"
            @click="save"
          >
            儲存
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import headers from "@/components/Header.vue"
export default {
  data() {
    return {
      user: {
        industry_other: "",
      },
      industrys: [
        "資訊軟體業",
        "高科技製造業",
        "金融保險業",
        "遊戲軟體業",
        "傳統製造業",
        "電商平台",
        "網路行銷",
        "其他",
      ],
      message: "",
    }
  },
  components: {
    headers,
  },
  methods: {
    async fetch() {
      try {
        this.user = JSON.parse(localStorage.getItem("user"))
        const insplit = this.user.industry.split("_")

        this.user.industry = insplit[0]
        this.user.industry_other = insplit[1]
      } catch (e) {
        this.$router.push("login")
      }
    },
    async save() {
      for (var item in this.user) {
        if (
          item != "id" &&
          item != "level" &&
          item != "management" &&
          item != "industry_other" &&
          item != "__v"
        )
          this.user[item] = this.user[item].trim()
      }
      if (this.user.industry != "其他") {
        this.user.industry_other = ""
      }
      if (this.user.management == "false") {
        this.user.management = false
      }
      if (this.user.management == "true") {
        this.user.management = true
      }
      if (
        this.user.address == "" ||
        this.user.phoneNumber == "" ||
        this.user.industry == "" ||
        this.user.position == "" ||
        (this.user.industry == "其他" && this.user.industry_other == "")
      ) {
        alert("請填寫後儲存")
        return
      }

      if (this.user.industry == "其他" && this.user.industry_other != "") {
        this.user.industry = "其他_" + this.user.industry_other
      }
      delete this.user.industry_other
      try {
        await this.$http.put(`/`, this.user)
      } catch (error) {
        this.$router.push("logout")
      }
      const res2 = await this.$http.get("user")
      localStorage.setItem("user", JSON.stringify(res2.data))
      await this.fetch()
      this.message = "儲存成功"
    },
  },

  async created() {
    const token = localStorage.getItem("token")
    if (token === null || token == undefined) {
      this.$router.push("login")
    }
    await this.fetch()
  },
}
</script>
<style></style>
