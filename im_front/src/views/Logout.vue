<template>
  <div></div>
</template>
<script>
export default {
  async created() {
    localStorage.removeItem("token");
    this.$router.push("/login");
  }
};
</script>
<style></style>
