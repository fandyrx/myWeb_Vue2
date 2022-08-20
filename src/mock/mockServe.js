const Mock = require('mockjs');//mockjs 导入依赖模块
const userMock =require ("./userMock")

Mock.mock("/mock/user",{
  code:200,data:userMock
})




