const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  // 打包处理,不生成MAP文件,减少文件体积.map用于运行报错查询
  productionSourceMap: false,
  transpileDependencies: true,

  lintOnSave: false,
  publicPath: "/", //这个必须，引入静态资源需要从根路径引入，否则会找不到静态资源
  devServer: {
    historyApiFallback: true,
    proxy: {
      "/api": {
        target: "https://api.apiopen.top/",
        // pathRewrite: {"^/api" : ""}
      },
      "^/cms": {
        target: "http://152.136.185.210:4000",
        pathRewrite: {
          "^/cms": "",
        },
        changeOrigin: true,
      },
    },
  },
  //webpack 配置  ts引入
  configureWebpack: {
    resolve: {
      extensions: [`.js`, `.vue`, `.json`, `.ts`, `.tsx`], // 后缀名
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          exclude: /node_modules/,
          options: {
            appendTsSuffixTo: [/\.vue$/], // ts-loader
          },
        },
      ],
    },
  },
});
