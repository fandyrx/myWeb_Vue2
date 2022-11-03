export const searchFormConfig = {
  labelWidth: "120px",
  itemLayout: {
    padding: "10px 40px",
  },
  colLayout: {
    span: 8,
  },
  formItems: [
    {
      field: "name",
      type: "input",
      label: "商品名称",
      placeholder: "请输入商品名称",
    },

    {
      field: "oldPrice",
      type: "input",
      label: "原价格",
      placeholder: "请输入原价格",
    },
    {
      field: "newPrice",
      type: "input",
      label: "新价格",
      placeholder: "请输入新价格",
    },
    {
      field: "status",
      type: "select",
      label: "状态",
      placeholder: "请选择状态",
      options: [
        { title: "禁用", value: "0" },
        { title: "启用", value: "1" },
      ],
    },
    {
      field: "createAt",
      type: "datepicker",
      label: "创建时间",
      otherOptions: {
        startPlaceholder: "开始时间",
        endPlaceholder: "结束时间",
        type: "daterange",
      },
    },
  ],
};
