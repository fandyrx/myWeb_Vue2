<template>
  <div class="login-panel">
    <h2 class="title">后台管理系统</h2>
    <el-form class="form" :model="userInfo" :rules="rules" ref="loginForm">
      <el-form-item class="item" prop="name">
        <span :class="{ active: isEdit.name }">username or email</span>
        <div class="input">
          <el-input
            v-model="userInfo.name"
            @focus="isEdit.name = true"
            @blur="handleBlur"
          ></el-input>
        </div>
      </el-form-item>

      <el-form-item class="item" prop="password">
        <span :class="{ active: isEdit.password }">password</span>
        <div class="input">
          <el-input
            v-model="userInfo.password"
            @focus="isEdit.password = true"
            @blur="handleBlur"
          ></el-input>
        </div>
      </el-form-item>
    </el-form>
    <div class="tips">Tips:coderwhy 123456</div>

    <div class="btn">
      <el-button @click="handleLogin">LOGIN</el-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "loginPanel",
  data() {
    return {
      userInfo: {
        name: "",
        password: "",
      },
      isEdit: { name: false, password: false },
      rules: {
        name: [
          { required: true, message: "请输入账户" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  components: {},
  methods: {
    handleBlur() {
      if (this.userInfo.name == "") {
        this.isEdit.name = false;
      }
      if (this.userInfo.password == "") {
        this.isEdit.password = false;
      }
    },

    handleLogin() {
      this.$refs["loginForm"].validate((valid) => {
        if (valid) {
          this.userLogin({ ...this.userInfo });
        } else {
          this.$message({
            type: "warning",
            message: "请输入正确信息",
          });
          return false;
        }
      });
    },
    ...mapActions("cms/cmsLogin", ["userLogin"]),
  },
};
</script>

<style scoped lang="less">
.login-panel {
  min-height: 100vh;
  background: var(--color-bg1);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  .tips {
    font-size: 0.6em;
    font-weight: normal;
    margin-left: -9%;
  }
}

// element  form-item
.el-form-item {
  position: relative;

  /deep/ .el-form-item__content span {
    position: absolute;
    left: 0;
    z-index: 999999999; //el组件样式层级
    padding: 0 15px;
    pointer-events: none;
    font-size: 1em;
    color: rgba(255, 255, 255, 0.5);
    text-transform: uppercase;
    transition: 0.3s;
  }
}

// element input
.el-input /deep/ .el-input__inner {
  width: 300px;
  padding: 15px;
  font-size: 1em;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background: var(--color-bg1);
  border-radius: 5px;
}

//valid focus
.active {
  color: var(--color-bg2) !important;
  font-size: 0.45em !important;
  line-height: 100%;
  padding: 5px !important;
  transform: translateX(5px) translateY(-15px);

  background-color: #09203f;
  letter-spacing: 0.1em;
  border: 1px solid #50c9c3;
}

.el-button {
  background: none;
  padding: 10px 30px;
  border-radius: 5px;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 700;
  font-size: 1em;
  &:hover {
    color: #50c9c3;
    border: 1px solid #50c9c3;
  }
}
</style>
