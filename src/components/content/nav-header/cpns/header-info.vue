<template>
  <div class="header-info">
    <div class="operation">
      <span>
        <i class="el-icon-bell" />
      </span>
      <span>
        <i class="el-icon-chat-dot-round" />
      </span>
      <span>
        <span class="dot"></span>
        <i class="el-icon-postcard" />
      </span>
    </div>
    <div class="info">
      <el-dropdown>
        <span class="user-info">
          <el-avatar
            :size="30"
            class="avatar"
            src="https://upload.jianshu.io/users/upload_avatars/1102036/c3628b478f06.jpeg"
          />
          <span class="name">{{ userInfo.name }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click.native="handleExitClick">
              <i class="el-icon-circle-close"></i>
              退出系统
            </el-dropdown-item>
            <el-dropdown-item divided>
              <i class="el-icon-info"></i>
              个人信息
            </el-dropdown-item>
            <el-dropdown-item>
              <i class="el-icon-key"></i>
              修改密码
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import localCache from "@/utils/cache";
import { mapState } from "vuex";
export default {
  name: "header-info",
  data() {
    return {};
  },
  computed: {
    ...mapState("cms/cmsLogin", ["userInfo"]),
  },
  methods: {
    handleExitClick() {
      localCache.deleteCache("token");
      localCache.deleteCache("userInfo");
      localCache.deleteCache("userMenus");

      this.$router.push("/cms/cmsLogin");
    },
  },
};
</script>

<style scoped lang="less">
.header-info {
  display: flex;
  align-items: center;
}
.operation {
  display: inline-flex;
  margin-right: 20px;
  span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 35px;
    &:hover {
      background: #f2f2f2;
    }
    i {
      font-size: 20px;
    }
    .dot {
      position: absolute;
      top: 3px;
      right: 3px;
      z-index: 10;
      width: 6px;
      height: 6px;
      background: red;
      border-radius: 100%;
    }
  }
}
.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
  .name {
    margin-left: 8px;
  }
}
.info {
  :global(.el-dropdown-menu__item) {
    line-height: 36px !important;
    padding: 6px 22px;
  }
}
</style>
