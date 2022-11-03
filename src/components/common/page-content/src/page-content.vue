<template>
  <div class="content">
    <my-table
      :listData="listData"
      v-bind="contentTableConfig"
      @selectionChange="handleChange"
    >
      <template #headerHandler="scope">
        <div class="header">
          <h2>{{ scope.title }}</h2>
          <el-button type="primary" @click="handleNewClick">
            <span>{{ btnName }}</span>
          </el-button>
        </div>
      </template>

      <template #createAt="scope">
        <span>{{ scope.row.createAt | formatTime }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ scope.row.updateAt | formatTime }}</span>
      </template>
      <template #status="scope">
        <el-tag
          :type="scope.row.enable || scope.row.status ? 'primary' : 'danger'"
          >{{ scope.row.enable || scope.row.status ? "启用" : "禁用" }}</el-tag
        >
      </template>

      <template #handler="scope">
        <div class="handle-btns">
          <el-button
            size="small"
            type="text"
            icon="el-icon-edit"
            @click="handleEditClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="text"
            icon="el-icon-delete"
            @click="handleDeleteClick(scope.row)"
            >删除</el-button
          >
        </div>
      </template>

      <!-- 动态插槽 -->
      <template v-for="item in otherPropSlots" #[item.slotName]="scope">
        <template v-if="item.slotName">
          <div :key="item.prop">
            <slot :name="item.slotName" :row="scope.row"></slot>
          </div>
        </template>
      </template>
    </my-table>
  </div>
</template>

<script>
import MyTable from "@/base-ui/table";

import { mapGetters, mapState } from "vuex";
import { formatUtcString } from "@/utils/format";
export default {
  name: "page-content",
  props: {
    contentTableConfig: {
      type: Object,
      required: true,
    },
    pageName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      btnName: "新建用户",
      otherPropSlots: [],
    };
  },
  components: { MyTable },
  created() {
    //获取页面数据
    this.$store.dispatch("cms/system/getPageListAction", {
      pageName: this.pageName,
      queryInfo: {
        offset: 0,
        size: 10,
      },
    });

    this.initialPage();
  },

  computed: {
    ...mapGetters("cms/system", ["pageListCount", "pageListData"]),
    listData() {
      return this.pageListData(this.pageName);
    },
    listCount() {
      return this.pageListCount(this.pageName);
    },
  },
  methods: {
    getBtnName() {
      switch (this.pageName) {
        case "role":
          this.btnName = "新建角色";
          break;
        case "goods":
          this.btnName = "新建商品";
          break;
      }
    },
    //初始化页面
    initialPage() {
      //3.btn按钮名字获取
      this.getBtnName();
      //4.动态插槽
      this.otherPropSlots = this.contentTableConfig.propList.filter((item) => {
        if (item.slotName === "status") return false;
        if (item.slotName === "createAt") return false;
        if (item.slotName === "updateAt") return false;
        if (item.slotName === "handler") return false;
        return true;
      });
    },
    //勾选框回调
    handleChange(value) {
      // console.log(value, "use");
    },
    //新增按钮回调
    handleNewClick() {
      console.log("新增点击pageContent");
    },
  },
  filters: {
    formatTime(value) {
      return formatUtcString(value);
    },
  },
};
</script>

<style scoped>
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}

.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
