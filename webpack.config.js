const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// eslint-disable-next-line arrow-body-style
module.exports = (env, argv) => {
  return {
    entry: path.join(__dirname, '/src/index.js'),
    output: {
      path: path.join(__dirname, '/dist/'),
      publicPath: './',
      filename: 'vi-ui.min.js',
      libraryTarget: 'umd',
      libraryExport: 'default',
      library: 'VueViUi',
      umdNamedDefine: true,
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
          test: /\.(css|styl(us)?)$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: () => [autoprefixer],
              },
            },
            'stylus-loader',
          ],
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
    /* eslint-disable */
    plugins: argv && argv.mode !== 'production'
      ? []
      : [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
          filename: "vi-ui.min.css",
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
    /* eslint-enable */
    devtool: 'source-map',
    devServer: {
      noInfo: true,
    },
    performance: {
      hints: false,
    },
  };
};
