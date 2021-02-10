<template>
  <div class="w-full bg-blue-400  py-5">
    <div class="container text-white mx-auto text-left flex justify-between">
      <div>
        <span span class="text-grey-darker text-2xl  mb-2 font-semibold "
          >系友資訊系統</span
        >
        <router-link
          class="mx-4 text-xl font-bold "
          to="/"
          v-if="user.power === 'root' || user.power === 'admin'"
          >一般用戶資料</router-link
        >
        <router-link
          class="mx-4 text-xl font-bold "
          to="/admin"
          v-if="user.power === 'root'"
          >管理員用戶資料</router-link
        >
      </div>
      <div>
        <div class="relative inline-block text-left">
          <div>
            <button
              type="button"
              class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
              id="options-menu"
              aria-haspopup="true"
              aria-expanded="true"
              @click="open = !open"
            >
              {{ user.name }}
              <!-- Heroicon name: solid/chevron-down -->
              <svg
                class="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div
            class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
            v-if="open"
          >
            <div
              class="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <router-link
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                to="/logout"
                >登出</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      open: false,
      user: {}
    };
  },
  methods: {
    async fetch() {
      try {
        this.user = JSON.parse(localStorage.getItem("user"));
      } catch (error) {
        this.$router.push("login");
      }
    }
  },
  async created() {
    if (localStorage.getItem("token") != null) {
      await this.fetch();
    } else {
      this.$router.push("login");
    }
  }
};
</script>
<style></style>
