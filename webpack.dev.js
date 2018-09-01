const merge = require('webpack-merge');
const config = require('./webpack.config.js');

module.exports = merge(config, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
        watchContentBase: true,
        port: 4000
    }
});
