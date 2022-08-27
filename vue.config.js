const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // 打包处理,不生成MAP文件,减少文件体积.map用于运行报错查询
  productionSourceMap:false,
  transpileDependencies: true,
  
  lintOnSave:false,
  devServer: { 
    proxy: {
      "/api": {
        target: "https://api.apiopen.top/",
        // pathRewrite: {"^/api" : ""}
      },
    
    }
    
  }

  
})


