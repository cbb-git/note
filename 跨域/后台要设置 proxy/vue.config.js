module.exports = {
  productionSourceMap: false,
  devServer: {
    proxy: {
      "/api": {
        target: "http://192.168.1.63:8888",
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      },
      "/login/*": {
        target: "http://192.168.1.63:8888",
        changeOrigin: true,

      },
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/variables.scss";`,
      },
    },
  },
};