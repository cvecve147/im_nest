<template>
  <div>
    <div class="container  mx-auto justify-center flex w-100" v-if="!loading">
      <div
        class="bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4 flex flex-col mt-60 w-1/2"
      >
        <div>
          <h3 class="text-grey-darker text-2xl  my-5 font-semibold">
            更新{{ user.name }}資料
          </h3>
        </div>
        <div>
          <span class="text-red-600">{{ message }}</span>
        </div>
        <div
          class="mb-6 "
          v-for="(item, index) in user"
          :key="item"
          :class="{
            hidden:
              index == '_id' ||
              index == 'updatedAt' ||
              index == 'createdAt' ||
              index == '__v'
          }"
        >
          <label
            class="block text-grey-darker text-sm font-bold mb-2"
            v-if="index != 'name'"
          >
            {{ metchTable(index) }}
          </label>
          <input
            class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            :placeholder="`您的${metchTable(index)}`"
            v-if="index != 'name'"
            v-model="input[index]"
          />
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
    <div v-else>
      載入中
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {},
      input: {},
      message: "",
      loading: false
    };
  },

  props: {
    id: String
  },
  methods: {
    metchTable(val) {
      switch (val) {
        case "id":
          return "編號";
        case "name":
          return "帳號";
        case "level":
          return "級別";
        case "industry":
          return "產業";
        case "position":
          return "職位";
        case "power":
          return "權限";
        case "phoneNumber":
          return "電話";
        case "address":
          return "住址";
        case "management":
          return "管理";
        default:
          break;
      }
    },
    format() {
      delete this.user.id;
      delete this.user.power;
      this.input.phoneNumber = this.user.phoneNumber;
      this.input.address = this.user.address;
      this.input.level = this.user.level;
      this.input.position = this.user.position;
      this.input.management = this.user.management;
      this.input.industry = this.user.industry;
    },
    async fetch() {
      try {
        this.loading = true;
        const res = await this.$http.get(`/${this.id}`);
        this.user = res.data[0];
        this.format();
        this.loading = false;
      } catch (e) {
        this.$router.push("/login");
      }
    },
    async save() {
      delete this.user.power;
      delete this.user.name;
      await this.$http.put(`user/${this.id}`, this.input);
      await this.fetch();
      this.$message({
        showClose: true,
        message: "修改成功",
        type: "success"
      });
      this.$router.push("/");
      return;
    }
  },

  async created() {
    await this.fetch();
  }
};
</script>
<style></style>
