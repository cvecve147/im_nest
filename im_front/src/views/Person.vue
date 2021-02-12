<template>
  <div>
    <div class="container mx-auto mt-4">
      <div v-if="!loading">
        <Tables :data="PersonData" datapath="person"></Tables>
      </div>
      <div v-else>
        載入中
      </div>
    </div>
  </div>
</template>
<script>
import Tables from "../components/Table";
export default {
  data() {
    return {
      search: "",
      PersonData: [],
      loading: false
    };
  },
  components: {
    Tables
  },
  computed: {},
  methods: {
    async fetchQuery() {
      try {
        this.loading = true;
        const user = JSON.parse(localStorage.getItem("user"));
        if (user.power && user.power != "user") {
          const res = await this.$http.get("users");
          this.PersonData = res.data;
          this.loading = false;
        } else {
          this.$router.push("/Edit");
        }
      } catch (error) {
        this.$router.push("/login");
      }
    }
  },
  async created() {
    if (localStorage.getItem("token") != null) {
      await this.fetchQuery();
    }
  }
};
</script>
<style></style>
