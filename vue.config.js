/* eslint-disable */
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
/* eslint-enable */

module.exports = {
  baseUrl: './',
  assetsDir: 'assets',
  productionSourceMap: false,
  css: {
    extract: true,
    loaderOptions: {
      css: {
        options: {
          importLoaders: 1,
          minimize: true,
        },
      },
      postcss: {
        options: {
          ident: 'postcss',
          plugins: () => [autoprefixer],
        },
      },
    },
  },
  configureWebpack: (env) => {
    const prod = {
      entry: path.join(__dirname, '/src/index.js'),
      output: {
        path: path.join(__dirname, '/dist/'),
        filename: 'vi-ui.min.js',
        libraryExport: 'default',
        library: 'VueViUi',
      },
      resolve: {
        alias: {
          vue$: 'vue/dist/vue.esm.js',
        },
      },
      module: {
        rules: [
          {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
              presets: ['env'],
            },
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: ['react', 'env'],
            },
          },
          {
            test: /\.(eot|ttf|woff(2)?)(\?[a-z0-9]+)?$/,
            exclude: /node_modules/,
            loader: 'file-loader?name=fonts/[name].[ext]',
          },
          {
            test: /\.(svg|png|jpg|gif)(\?[a-z0-9]+)?$/,
            exclude: /node_modules/,
            loader: 'file-loader?name=images/[name].[ext]',
          },
        ],
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: 'vi-ui.min.css',
        }),
        new OptimizeCSSAssetsPlugin({}),
        new UglifyJsPlugin({
          sourceMap: true,
          uglifyOptions: {
            compress: true,
            mangle: true,
          },
        }),
      ],
      devServer: {
        noInfo: true,
      },
      performance: {
        hints: false,
      },
    };

    const dev = {
      devtool: 'cheap-module-source-map',
      module: {
        rules: [
          {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
              presets: ['env'],
            },
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: ['react', 'env'],
            },
          },
        ],
      },
      devServer: {
        noInfo: true,
      },
      performance: {
        hints: false,
      },
    };

    if (env.mode === 'production') return prod;
    return dev;
  },
};
