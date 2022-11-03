<template>
  <div class="nav-breadcrumbs">
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumbs">
        <el-breadcrumb-item :to="{ path: item.path }" :key="item.name">{{
          item.name
        }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "breadcrumb",
  props: {
    breadcrumbs: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
};
</script>

<style scoped></style>
