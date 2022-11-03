export const searchFormConfig = {
  labelWidth: "100px",
  colLayout: {
    span: 24,
  },
  formItems: [
    {
      field: "phone",
      type: "input",
      label: "手机号码",
      placeholder: "请输入手机号码",
      rules: [
        { required: true, message: "请输入手机号码", trigger: "blur" },
        { min: 11, max: 11, message: "手机号码为11位" },
      ],
    },
    {
      field: "password",
      type: "password",
      label: "密码",
      placeholder: "请输入密码",
      rules: { required: true, message: "请输入密码", trigger: "blur" },
    },
  ],
  CollectBtn: {
    icon: "el-icon-s-promotion",
    CollectBtnName: "登录",
  },
};
