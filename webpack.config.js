const Dotenv = require('dotenv-webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OfflinePlugin = require('offline-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const path = require('path')

module.exports = {
  entry: {
    app: './src/index.js'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|ico|svg)$/,
        loader: 'file-loader',
        options: {
          outputPath: './images/',
          name: '[name].[ext]?[hash:8]',
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          outputPath: './fonts/',
          name: '[name].[ext]?[hash:8]',
        }
      }
    ]
  },
  plugins: [
    new Dotenv(),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: __dirname + '/public/index.html',
      favicon: __dirname + '/public/favicon.ico',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css?[hash:8]',
      chunkFilename: '[id].css?[hash:8]'
    }),
    new OfflinePlugin({
      autoUpdate: true,
      ServiceWorker: {
        events: true
      }
    }),
    new CopyWebpackPlugin(['public/robots.txt']),
    new WebpackPwaManifest({
      name: 'Ticker',
      short_name: 'Ticker',
      description: 'Ticker App to receive recent news from the streets',
      orientation: 'portrait',
      background_color: '#fff',
      ios: true,
      icons: [{
        src: path.resolve('src/assets/app_icon_1024.png'),
        sizes: [96, 128, 192, 256, 384, 512, 1024],
        ios: true,
      }, {
        src: path.resolve('src/assets/app_icon_1024.png'),
        size: 1024,
        ios: 'startup',
      }],
      fingerprints: false,
    }),
  ],
  output: {
    publicPath: '/',
    filename: '[name].js?[hash:8]',
    path: __dirname + '/dist',
  }
}
