<template>
  <div>
    <div class="container  mx-auto justify-center flex w-100">
      <div
        class="bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4 flex flex-col mt-60 w-1/2"
      >
        <div>
          <h3 class="text-grey-darker text-2xl  mb-2 font-semibold">
            創建{{ admin == 1 ? "管理員" : "用戶" }}
          </h3>
        </div>
        <div>
          <span class="text-red-600">{{ message }}</span>
        </div>
        <div class="mb-6 ">
          <label
            class="block text-grey-darker text-sm font-bold mb-2"
            for="password"
          >
            帳號
          </label>
          <input
            class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            placeholder="您的姓名"
            v-model="data.name"
          />
          <label
            class="block text-grey-darker text-sm font-bold mb-2"
            for="password"
          >
            密碼
          </label>
          <input
            class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="password"
            type="password"
            placeholder="******************"
            v-model="data.password"
          />
          <label
            class="block text-grey-darker text-sm font-bold mb-2"
            for="password"
            v-if="admin == 0"
          >
            級別
          </label>
          <input
            class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            placeholder="106"
            v-model="data.level"
            v-if="admin == 0"
          />
          <div v-if="admin == 1">
            <label
              class="block text-grey-darker text-sm font-bold mb-2"
              for="password"
              v-if="admin == 1"
            >
              管理員
            </label>
            <label class="inline-flex items-center">
              <input
                type="radio"
                class="form-radio"
                value="root"
                v-model="data.power"
              />
              <span class="ml-2">root</span>
            </label>
            <label class="inline-flex items-center ml-6">
              <input
                type="radio"
                class="form-radio"
                value="admin"
                v-model="data.power"
              />
              <span class="ml-2">admin</span>
            </label>
          </div>
        </div>
        <div class="flex justify-center ">
          <button
            class="bg-blue hover:bg-blue-dark text-blue-500 font-bold py-2 px-4 rounded"
            type="button"
            @click="create"
          >
            創建
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    admin: String,
  },
  data() {
    return {
      data: {},
      message: "",
    }
  },
  methods: {
    async create() {
      try {
        const res = await this.$http.post("users", this.data)
        if (res.data != "重複資料") {
          this.message = "重複資料"
        } else {
          this.message = "創建成功" + res.data.name
        }
        if (this.admin) {
          this.$router.push("/admin")
        } else {
          this.$router.push("/")
        }
      } catch (error) {
        return
      }
    },
  },
}
</script>
<style></style>
