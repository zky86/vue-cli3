const isProduction = process.env.NODE_ENV === 'production'
const path = require('path')
module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: './',
  lintOnSave: true,
  devServer: {
    // proxy: {
    //   '/api/manager': {
    //     // target: '',
    //     // ws: true,
    //     // changeOrigin: true
    //   }
    // }
  }
}
