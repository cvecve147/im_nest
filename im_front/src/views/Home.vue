<template>
  <div class="home">
    <headers></headers>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import headers from "@/components/Header.vue";
export default {
  name: "Home",
  components: {
    headers
  },
  async created() {}
};
</script>
