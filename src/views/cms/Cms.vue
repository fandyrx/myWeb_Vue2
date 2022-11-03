<template>
  <div class="cms-wrapper">
    <router-view :key="key"></router-view>
  </div>
</template>

<script>
export default {
  name: "cms",
  data() {
    return {
      key: this.$route.fullPath,
    };
  },
};
</script>

<style scoped>
.cms-wrapper {
  min-height: 100vh;
}
</style>
