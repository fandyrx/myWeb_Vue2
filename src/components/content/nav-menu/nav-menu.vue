<template>
  <div class="nav-menu">
    <div class="logo">
      <i class="el-icon-ice-drink"></i>
      <span v-show="!isFold" class="title">CMS</span>
    </div>
    <el-menu
      :default-active="defaultValue"
      :collapse="isFold"
      text-color="#b7bdc3"
      active-text-color="#fff"
      background-color="#001529"
    >
      <div v-for="item in userMenus" :key="item.id">
        <!-- 1.系统总览 -->
        <el-submenu :index="item.id + ''">
          <template #title>
            <i :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </template>

          <div v-for="subitem in item.children" :key="subitem.id">
            <el-menu-item
              :index="subitem.id + ''"
              @click="handleItemClick(subitem)"
            >
              <i :class="subitem.icon"></i>
              {{ subitem.name }}
            </el-menu-item>
          </div>
        </el-submenu>
      </div>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { pathMapToMenu } from "@/utils/map-menus";
export default {
  name: "nav-menu",
  data() {
    return {
      isFold: false,
      defaultValue: "",
    };
  },
  computed: {
    ...mapState("cms/cmsLogin", ["userMenus"]),
  },
  methods: {
    handleItemClick(item) {
      this.defaultValue = item.id + "";
      this.$router.push(item.url);
      console.log("侧边栏地址", item.url);
    },
  },
  mounted() {
    const menu = pathMapToMenu(this.userMenus, this.$route.path);

    this.defaultValue = menu.id + "";
  },
};
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;
}
.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  i {
    color: aquamarine;
    height: 100%;
    margin: 0 10px;
  }
  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }
}
.el-menu {
  border-right: none;
  user-select: none;
}
.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }
}

.el-menu-item:hover {
  color: #fff !important;
}
.el-menu-item.is-active {
  background-color: #0a60bd !important;
}
</style>
