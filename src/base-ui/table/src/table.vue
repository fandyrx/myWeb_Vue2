<template>
  <div class="my-table">
    <div class="headerHandler">
      <slot name="headerHandler" :title="title"></slot>
    </div>
    <el-table
      border
      :data="listData"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      @selection-change="handleChange"
    >
      <template v-if="showSelectColumn">
        <el-table-column type="selection" align="center" width="50" />
      </template>
      <!-- 1.序号 -->
      <template v-if="showIndexColumn">
        <el-table-column type="index" label="序号" align="center" width="80" />
      </template>

      <template v-for="item in propList">
        <el-table-column v-bind="item" :key="item.prop" align="center">
          <template #default="scope">
            <slot :name="item.slotName" :row="scope.row">
              {{ scope.row[item.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <!-- footer -->
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          :page-sizes="[10, 20, 30]"
          layout="total,prev, pager, next,jumper,sizes"
          :total="listCount"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    listData: {
      type: Array,
      required: true,
    },
    listCount: {
      type: Number,
      default: 0,
    },
    propList: {
      type: Array,
      required: true,
    },
    showIndexColumn: {
      type: Boolean,
      default: false,
    },
    showSelectColumn: {
      type: Boolean,
      default: false,
    },
    page: {
      type: Object,
      default: () => ({ currentPage: 0, pageSize: 10 }),
    },
    showFooter: {
      type: Boolean,
      default: false,
    },
  },

  name: "myTable",

  methods: {
    handleChange(value) {
      this.$emit("selectionChange", value);
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 1) {
        return "warning-row";
      } else {
        return "success-row";
      }
      return "";
    },
    handleSelectionChange(value) {
      console.log(value, "selectChange");
    },
    handleCurrentChange(currentPage) {
      console.log(currentPage, "currentPage");
    },
    handleSizeChange(size) {
      console.log(size, "size");
    },
  },
};
</script>

<style scoped lang="less">
.headerHandler {
  display: flex;
  justify-content: flex-end;
  margin: 0 5px 10px 0;
}

.footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

/deep/ .el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
