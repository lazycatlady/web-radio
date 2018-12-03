const path = require('path');

function addStyleResource(rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/css/variables.less'),
      ],
    });
}
module.exports = {
  baseUrl: '/',
  outputDir: 'dist',

  chainWebpack: (config) => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)));
  },
  devServer: {
    proxy: {
      '/api': {
        // 目标 API 地址
        target: 'http://218.28.119.155/api/',
        // 如果要代理 websockets
        // ws: true,
        // 将主机标头的原点更改为目标URL
        // changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        },
      }
    }
  }
};