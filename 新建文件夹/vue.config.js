module.exports = {
  productionSourceMap: false,
  devServer: {
    proxy: {
      "/api": {
        target: "https://www.fastmock.site/mock/e56ecacd55ac051dcb8f514b2906a901/test",
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
