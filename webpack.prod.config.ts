import { Configuration } from 'webpack'
import baseConfig from './webpack.common.config'
import merge from 'webpack-merge'
import TerserPlugin from 'terser-webpack-plugin'
import { GenerateSW } from 'workbox-webpack-plugin'

const config: Configuration = merge(baseConfig, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    runtimeChunk: 'single',
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new GenerateSW({
      skipWaiting: true,
      clientsClaim: true,
    }),
  ],
})

export default config
