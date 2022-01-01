module.exports = {
  configureWebpack: {
    /*
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.js' // full version include compiler to compile templates on the client
      }
    }
    */
  },
  devServer: {
    proxy: {
      'api': {  // webpack config - vue is using webpack server
        target: 'http://localhost:8081',
        changeOrigin: true,
      }
    }
  }
}
