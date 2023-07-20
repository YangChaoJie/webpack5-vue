const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PrettierPlugin = require('prettier-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin-webpack5')
const Webpack = require('webpack');
const paths = require('./paths')
const portfinder = require('portfinder');
const Promise = require('pinkie-promise');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
module.exports = {
  // Where webpack looks to start building the bundle
  entry: [paths.src + '/main.js'],

  // Where webpack outputs the assets and bundles
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
  // Customize the webpack build process
  plugins: [
    // Removes/cleans build folders and unused assets when rebuilding 每次编译的时候清空之前的dist
    new CleanWebpackPlugin(),
    // vue loader plugin
    new VueLoaderPlugin(),
		new Webpack.ProvidePlugin({
			Vue: ['vue/dist/vue.esm.js', 'default'],
		}),
    // Copies files from target to destination folder 在每次进行 build 的时候，将某些静态资源复制到特定文件夹
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),

    // Generates an HTML file from a template
    // Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
    // html-webpack-plugin 的作用是：当使用 webpack打包时，创建一个 html 文件，并把 webpack 打包后的静态文件自动插入到这个 html 文件当中。
    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate',
      favicon: paths.src + '/assets/favicon.png',
      template: paths.src + '/template.html', // template file
      filename: 'index.html', // output file
    }),

    // ESLint configuration
    new ESLintPlugin({
      files: ['.', 'src', 'config'],
      formatter: 'table',
    }),

    // Prettier configuration
    new PrettierPlugin(),
  ],
  // note-notifier

  // Determine how modules within the project are treated
  module: {
    rules: [
      // JavaScript: Use Babel to transpile JavaScript files
      { test: /\.js$/, use: ['babel-loader'] },
      { test: /\.vue$/,use: [{ loader: 'vue-loader'}] },
      // Images: Copy image files to build folder
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },

      // Fonts and SVGs: Inline files
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },
    ],
  },

  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': paths.src,
    },
  },
}
