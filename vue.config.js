module.exports = {
  /** 区分打包环境与开发环境
     * process.env.NODE_ENV==='production'  (打包环境)
     * process.env.NODE_ENV==='development' (开发环境)
     */
  // 基本路径
  // publicPath: process.env.NODE_ENV === 'development' ? '/' : '/static/pc/',
  publicPath: '/',
  // 输出文件目录
  // outputDir: '../docker/dist/static/pc',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  chainWebpack: config => {
    // 移除 prefetch、preload加载模式
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
  },
  // vue-loader 配置项
  // https://vue-loader.vuejs.org/en/options.html
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项

    // 启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: true,
    loaderOptions: {
      css: {
        // options here will be passed to css-loader
      },
      sass: {
        // @/ 是 src/ 的别名
        // 全局变量
        // data: `@import "@/assets/style/common.scss";`
      }
    }
  },
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    open: process.platform === 'darwin',
    port: 8082,
    https: false,
    hotOnly: false,
    // 设置代理
    proxy: {
      // proxy table example
      '/': {
        target: 'https://delivery.deeptel.com.cn',
        changeOrigin: true,
        pathRewrite: {
          // 如果接口本身没有/api需要通过pathRewrite来重写了地址
          //   '^api': ''
        }
      }
    }
    // before: app => {}
  }
}
