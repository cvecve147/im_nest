<template>
  <div>
    <div class="container mx-auto mt-4">
      <div v-if="!loading">
        <Tables :data="AdminData" datapath="admin"></Tables>
      </div>
      <div v-else>載入中</div>
    </div>
  </div>
</template>
<script>
import Tables from "../components/Table"
export default {
  data() {
    return {
      AdminData: [],
      loading: false,
    }
  },
  components: {
    Tables,
  },
  methods: {
    async fetchQuery() {
      this.loading = true
      try {
        const res = await this.$http.get("manager")
        this.AdminData = res.data
        this.loading = false
      } catch (error) {
        this.$router.push("logout")
      }
    },
  },
  async created() {
    await this.fetchQuery()
  },
}
</script>
<style></style>
