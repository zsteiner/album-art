module.exports = {
  devServer: {
    historyApiFallback: true,
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/styles/_variables.scss";',
      },
    },
  },
};
