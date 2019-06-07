const merge = require('webpack-merge');
const config = require('./webpack.config.js');
const OfflinePlugin = require('offline-plugin');

module.exports = merge(config, {
  mode: 'production',
  devtool: 'none',
  plugins: [
    new OfflinePlugin({
      autoUpdate: true,
      ServiceWorker: {
        events: true
      }
    }),
  ]
});
