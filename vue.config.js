const isProduction = process.env.NODE_ENV === 'production'
const RouterWebpackPlugin = require('./plugins/Router.webpack.plugin')
const path = require('path')
module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: './',
  lintOnSave: true,
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/styles/_shared.scss";`
      }
    }
  },
  configureWebpack: config => {
    config
      .plugins
      .push(new RouterWebpackPlugin())
    isProduction
  },
  devServer: {
    proxy: {
      '': {
        target: 'http://localhost:7001',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
