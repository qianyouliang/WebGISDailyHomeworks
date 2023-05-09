const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {//配置代理服务器
      '/calendar': {//如果以canlender开头的请求，就会转发到target的地址,这个target地址才是聚合数据的域名
        target: 'http://v.juhe.cn',
      }
    }
  }
})
