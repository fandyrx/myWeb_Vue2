<template>
  <div class="nav-header">
    <div class="menu-icon" @click="handleFoldClick">
      <i :class="isFold ? 'el-icon-s-unfold' : 'el-icon-s-fold'" />
    </div>
    <div class="content">
      <header-crumb :breadcrumbs="breadcrumbs" />
      <header-info />
    </div>
  </div>
</template>

<script>
import HeaderCrumb from "./cpns/header-crumbs.vue";
import HeaderInfo from "./cpns/header-info.vue";
import { pathMapBreadcrumbs } from "@/utils/map-menus";
export default {
  name: "nav-header",
  data() {
    return {
      isFold: false,
    };
  },
  components: {
    HeaderCrumb,
    HeaderInfo,
  },
  methods: {
    handleFoldClick() {
      this.isFold = !this.isFold;
      this.$emit("foldChange", this.isFold);
    },
  },
  computed: {
    breadcrumbs() {
      const userMenus = this.$store.state.cms.cmsLogin.userMenus;
      const currenPath = this.$route.path;
      const breadcrumbs = pathMapBreadcrumbs(userMenus, currenPath);

      return breadcrumbs;
    },
  },
};
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;
  .menu-icon {
    font-size: 25px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
