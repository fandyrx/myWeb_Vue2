<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '50px' : '200px'">
        <NavMenu ref="navMenu" />
      </el-aside>
      <el-container>
        <el-header height="48px">
          <NavHeader @foldChange="handleChange" />
        </el-header>

        <el-main>
          <div class="content-views">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import NavHeader from "@/components/content/nav-header/nav-header.vue";
import NavMenu from "@/components/content/nav-menu/nav-menu.vue";

export default {
  name: "cmsMain",
  data() {
    return {
      isCollapse: false,
    };
  },
  components: { NavHeader, NavMenu },
  methods: {
    handleChange(isFold) {
      this.isCollapse = isFold;
      this.$refs.navMenu.isFold = isFold;
    },
  },
};
</script>

<style scoped lang="less">
.main {
  width: 100%;
  height: 100vh;
}
.main-content {
  height: 100%;
  .content-views {
    background-color: #fff;
  }

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    transition: width 0.3s linear;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .el-main {
    background-color: #f0f2f5;
  }
}
</style>
