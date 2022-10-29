<template>
  <div class="my-form">
    <!-- 头部插槽 -->
    <div class="header">
      <slot name="header"></slot>
    </div>
    <!-- form内容区域  -->
    <el-form :label-width="labelWidth" :model="formData">
      <el-row>
        <div v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :rules="item.rules"
              :prop="item.field"
              :style="itemStyles"
              v-if="!item.isHidden"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :show-password="item.type === 'password'"
                  :value="value[`${item.field}`]"
                  @input="handleValueChange($event, item.field)"
                />
              </template>

              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  :value="value[`${item.field}`]"
                  @input="handleValueChange($event, item.field)"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.title }}</el-option
                  >
                </el-select>
              </template>
              <!-- datepicker -->
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  :value="value[`${item.field}`]"
                  @input="handleValueChange($event, item.field)"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </div>
      </el-row>
    </el-form>
    <!-- 底部插槽 -->
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true,
    },
    formItems: {
      type: Array,
      default: () => {
        return [];
      },
    },
    labelWidth: {
      type: String,
      default: "100px",
    },
    itemStyles: {
      type: Object,
      default: () => ({ padding: "10px 40px" }),
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6,
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24,
      }),
    },
  },
  name: "MyForm",
  data() {
    return {
      formData: {},
    };
  },
  created() {
    // props传入的value ,绑定到elInput表单，用于展示
    // this.formData = { ...this.value };
    // console.log(this.formData, "form");
  },
  watch: {
    //更新验证用数据（form自存data）
    value: {
      handler: function (newValue) {
        this.formData = newValue;
      },
      deep: true,
    },
  },
  methods: {
    handleValueChange(newValue, field) {
      // console.log("valuechange:", { ...this.value, [field]: newValue });
      this.$emit("input", { ...this.value, [field]: newValue });
    },
  },
};
</script>

<style scoped lang="less">
.my-form {
  padding-top: 22px;
}
</style>
