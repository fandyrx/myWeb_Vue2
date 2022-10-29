<template>
  <my-form v-bind="searchFormConfig" v-model="formData">
    <div slot="header">
      <h1 class="title">{{ title }}</h1>
    </div>
    <div slot="footer">
      <div class="btn">
        <el-button @click="handleResetClick" icon="el-icon-refresh-right"
          >重置</el-button
        >
        <el-button
          type="primary"
          @click="handleSearchClick"
          icon="CollectBtn.icon"
          >{{ CollectBtn.CollectBtnName }}</el-button
        >
      </div>
    </div>
  </my-form>
</template>

<script>
import MyForm from "@/base-ui/form";
export default {
  props: {
    searchFormConfig: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      default: "",
    },
    CollectBtn: {
      type: Object,
      default() {
        return {
          icon: "el-icon-search",
          CollectBtnName: "搜索",
        };
      },
    },
  },
  data() {
    return {
      formData: {},
    };
  },
  components: {
    MyForm,
  },
  created() {
    //动态决定formData属性
    const formItems = this.searchFormConfig.formItems ?? [];
    const formOriginData = {};
    for (const item of formItems) {
      formOriginData[item.field] = "";
    }
    this.formData = formOriginData;
  },
  methods: {
    handleResetClick() {
      this.formData = {};
      // for (const key in this.formOriginData) {
      //   this.formData[key] = this.formOriginData[key];
      // }

      this.$emit("resetBtnClick");
    },
    handleSearchClick() {
      // console.log("search:", this.formData);
      this.$emit("searchBtnClick", this.formData);
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  text-align: center;
}
.btn {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
