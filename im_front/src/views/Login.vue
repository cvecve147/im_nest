<template>
  <div class="container  mx-auto justify-center flex w-100">
    <div
      class="bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4 flex flex-col mt-60 w-1/2"
    >
      <div>
        <h3 class="text-grey-darker text-2xl  mb-2 font-semibold">
          系友資訊系統登入
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
          required
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
          required
        />
        <p class="text-red text-xs italic">請輸入密碼(預設為身份證字號)</p>
      </div>
      <div class="flex justify-center ">
        <button
          class="bg-blue hover:bg-blue-dark text-blue-500 font-bold py-2 px-4 rounded"
          type="button"
          @click="login"
        >
          登入
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: "",
      data: {
        name: "",
        password: ""
      }
    };
  },
  methods: {
    async login() {
      this.data.name = this.data.name.trim();
      this.data.password = this.data.password.trim();
      if (this.data.name == "" || this.data.password == "") {
        alert("請輸入姓名與密碼");
        return;
      }
      try {
        const res = await this.$http.post("login", this.data);
        this.$message({
          showClose: true,
          message: "登入成功",
          type: "success"
        });
        localStorage.removeItem("token");
        const token = await res.data.token;
        await localStorage.setItem("token", token);
        this.$http.defaults.headers.common["Authorization"] =
          (await "Bearer ") + localStorage.getItem("token");
        const res2 = await this.$http.get("user");
        localStorage.setItem("user", JSON.stringify(res2.data));
        switch (res2.data.power) {
          case "user":
            this.$router.push("Edit");
            break;
          default:
            break;
        }
        this.$router.push("/");
      } catch (error) {
        this.$message({
          showClose: true,
          message: "登入失敗  帳號或密碼錯誤",
          type: "error"
        });
      }
    }
  }
};
</script>
<style></style>
