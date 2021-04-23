const webpack = require('webpack')
const { merge } = require('webpack-merge')

const common = require('./webpack.common.js')
const paths = require('./paths')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const Webpack = require('webpack')
const portfinder = require('portfinder')
const Promise = require('pinkie-promise')
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = merge(common, {
  // Set the mode to development or production
  mode: 'development',

  // Control how source maps are generated
  devtool: 'inline-source-map',

  // Spin up a server for quick development
  devServer: {
    historyApiFallback: true,
    // contentBase: paths.build,
    contentBase: false,
    open: false, // auto open brow
    compress: true,
    overlay: true, // Full screen overwrite when compilation fails
    hot: true,
    quiet: true,
    port: 8080,
  },

  module: {
    rules: [
      // Styles: Inject CSS into the head with source maps
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 1, modules: true },
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          // eslint options (if necessary)
        },
      },
    ],
  },

  plugins: [
    // Only update what has changed on hot reload
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    // 模块热替换(HMR - hot module replacement)功能会在应用程序运行过程中，替换、添加或删除 模块，而无需重新加载整个页面
    new Webpack.HotModuleReplacementPlugin({
      // Options...
    }),
    // 在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。
    //如果你在使用 CLI(命令行界面command-line interface)，启用此插件后，webpack 进程遇到错误代码将不会退出。
    new Webpack.NoEmitOnErrorsPlugin(),
    new ESLintPlugin({
      files: ['.', 'src', 'config'],
      formatter: 'table',
    })
  ],
})

new Promise((resolve, reject) => {
  //查找端口号
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
      return
    }

    //端口被占用时就重新设置evn和devServer的端口
    // devConfig.devServer.port = process.env.PORT = port;

    // resolve(devConfig);
  })
})
