<template>
  <my-breadcrumb v-bind="$attrs" />
</template>

<script>
import MyBreadcrumb from "@/base-ui/breadcrumb";
export default {
  name: "header-crumbs",

  components: {
    MyBreadcrumb,
  },
};
</script>

<style scoped></style>
