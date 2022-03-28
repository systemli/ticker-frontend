import { Configuration } from 'webpack'
import baseConfig from './webpack.common.config'
import merge from 'webpack-merge'
import TerserPlugin = require('terser-webpack-plugin')

const config: Configuration = merge(baseConfig, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    runtimeChunk: 'single',
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
})

export default config
