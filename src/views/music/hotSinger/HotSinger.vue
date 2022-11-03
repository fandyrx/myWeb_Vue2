<template>
  <div class="hotS-wrapper">
    <!-- 网易云登录 -->
    <div class="hot-top sprite_02">
      <template v-if="userInfo && userInfo.userId">
        <el-button type="info" round size="mini" @click="handleLogout"
          >logout</el-button
        >
        <el-avatar
          class="avatar"
          shape="square"
          :src="userInfo.avatarUrl"
        ></el-avatar>
        <p class="nickname">{{ userInfo.nickname }}</p>
        <p class="signature">
          {{ userInfo.signature }}
        </p>
      </template>

      <template v-else>
        <p>登录网易云音乐</p>
        <a class="login-btn sprite_02" @click="dialogVisible = true"
          >用户登录</a
        >
      </template>
    </div>
    <!-- 展示歌手 -->
    <div class="hot-down">
      <Singers :topSingers="topSingers" />
    </div>

    <!-- 登录modal -->
    <el-dialog :visible.sync="dialogVisible" width="30%" destroy-on-close>
      <div slot="title">
        <p>登录</p>
      </div>

      <div>
        <page-search
          :searchFormConfig="searchFormConfig"
          @searchBtnClick="login"
          :CollectBtn="{ icon: '', CollectBtnName: '登录' }"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Singers from "./Singers.vue";
import PageSearch from "@/components/common/page-search/src/page-search.vue";
import { searchFormConfig } from "./config/search.config";

export default {
  components: { Singers, PageSearch },
  name: "HotSinger",
  data() {
    return {
      dialogVisible: false,
      searchFormConfig: {},
    };
  },
  created() {
    this.searchFormConfig = searchFormConfig;
  },
  computed: {
    ...mapState("music", ["topSingers", "userInfo"]),
  },
  methods: {
    login(loginInfo) {
      // this.dialogVisible = false
      const loginOption = {
        loginInfo,
        cb: (payload) => {
          //请求到数据时回调
          this.dialogVisible = false;
        },
      };
      this.$store.dispatch("music/getMusicLogin", loginOption);
    },
    handleLogout() {
      this.$store.commit("music/LogOut");
    },
  },
};
</script>

<style scoped lang="less">
.hotS-wrapper {
  width: 250px;

  .hot-top {
    width: 100%;
    height: 126px;
    font-size: 14px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    font-size: 12px;
    color: #666;
    font-family: Arial, Helvetica, sans-serif;

    .avatar {
      align-self: center;
    }
    .signature {
      padding: 0 10px 0 30px;
      text-indent: 0.5em;
      word-break: break-all;
      // white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .login-btn {
      margin: 0 auto;
      display: block;
      width: 100px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      color: #fff;
      text-shadow: 0 1px 0 #8a060b;
      background-position: 0 -195px;
      &:hover {
        background-position: -110px -195px;
      }
    }
  }
  /deep/ .el-dialog {
    border-radius: 4px 4px 0 0;
  }

  /deep/ .el-dialog__header {
    background-color: #2d2d2d;
    padding: 0 45px 0 18px;
    border-bottom: 1px solid #191919;
    border-radius: 4px 4px 0 0;
    height: 38px;
    line-height: 38px;
    font-weight: bold;
    font-size: 14px;
    color: #fff;
  }
}
</style>
