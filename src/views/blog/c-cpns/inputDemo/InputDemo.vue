<template>
  <div class="container" :style="{ width: width, height: height }">
    <!-- input text password ...-->
    <template v-if="type !== 'textarea'">
      <span :class="{ active: isEdit }">{{ placeholder }}</span>
      <input
        :class="isFocus ? 'border' : ''"
        :name="inputName"
        :style="{ color: color }"
        type="type"
        v-bind="$attrs"
        ref="input"
        @focus="inputFocus"
        @blur="inputBlur"
        @change="handleChange"
        @input="handleInput"
      />
    </template>
    <!-- v-model  绑定会造成二次触发 且不需要绑定$listener -->

    <!-- textarea -->
    <template v-else-if="type == 'textarea'">
      <textarea
        :class="isFocus ? 'border' : ''"
        id="textarea"
        :name="inputName"
        :style="{ color: color, width: width, height: height }"
        v-bind="$attrs"
        ref="textarea"
        :placeholder="placeholder"
        @focus="inputFocus"
        @blur="inputBlur"
        @change="handleChange"
        @input="handleInput"
      />
    </template>
    <!-- textarea -->

    <!-- 新样式? -->
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    inputName: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "",
    },

    placeholder: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    value: [String, Number],
    height: String,

    width: {
      type: String,
    },
  },
  name: "InputDemo",
  // 属性
  inheritAttrs: false,

  data() {
    return {
      isEdit: false,
      isFocus: false,
    };
  },
  created() {
    this.$nextTick(() => {
      //  if(this.type == "textarea" ){
      //   this.$refs.textarea.style.width = "100%"
      // }
    });
  },
  methods: {
    // 获取input框 DOM
    getInput() {
      return this.$refs.input || this.$refs.textarea;
    },
    // 聚焦
    inputFocus() {
      this.isFocus = true;
      this.isEdit = true;
    },
    // 失焦
    inputBlur(e) {
      e.target.value !== "" ? (this.isEdit = true) : (this.isEdit = false);

      this.isFocus = false;
    },
    // 数据改变回调
    handleChange(e) {
      this.$emit("change", e.target.value);
    },
    //输入回调
    handleInput(e) {
      this.$emit("input", e.target.value);
      // dom 更新,保持输入框显示和数据一致
      this.$nextTick(this.setNativeInputValue);
    },
    // 组件库
    // 3.设置value值
    setNativeInputValue() {
      const input = this.getInput();
      if (!input) return;
      if (input.value === this.nativeInputValue) return;
      //inputDom的值   和 本地props 存储值保持一致
      input.value = this.nativeInputValue;
    },
  },
  computed: {
    //  1. (获取本地存储value)
    nativeInputValue() {
      return this.value === null || this.value === undefined
        ? ""
        : String(this.value);
    },
  },
  watch: {
    // 2.监视本地存储Value改变
    nativeInputValue() {
      this.setNativeInputValue();
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  // 保证边框显现
  padding: 1px;

  width: 100%;
  position: relative;
  text-overflow: ellipsis;
  white-space: nowrap;

  span {
    color: lightgrey;
    position: absolute;
    transition: all linear 0.2s;
    top: 20px;
    left: 20px;
  }

  input {
    padding: 30px 20px 10px;
    width: 100%;
    background-color: lighten(lightblue, 15%);
    border: none;
    border-radius: 5px;
    transition: all linear 0.2s;
  }
  #textarea {
    width: 100%;
    padding: 15px;

    overflow: hidden;
    border-radius: 5px;
    background-color: lighten(lightgrey, 15%);
    resize: none;
  }
}

// span(placeholder) focus激活时样式
.active {
  color: var(--color-high-text) !important;
  font-size: 14px;
  transform: translateY(-20px);
}

// focus背景模糊 + 边界
.border {
  outline: 1px solid #ff5c00;
  box-shadow: 0 0 3px #ff5c00;
}
</style>
