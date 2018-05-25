const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// eslint-disable-next-line arrow-body-style
module.exports = (env, argv) => {
  return {
    entry: path.join(__dirname, '/src/index.js'),
    output: {
      path: path.join(__dirname, '/dist/'),
      publicPath: '/dist/',
      filename: 'vi-ui.min.js',
      libraryTarget: 'umd',
      libraryExport: 'default',
      library: 'VueViUi',
      umdNamedDefine: true,
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            extractCSS: argv && argv.mode === 'production',
            presets: ['env'],
            loaders: argv && argv.mode !== 'production'
              ? [
                'vue-style-loader',
                'stylus-loader',
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
              ]
              : ExtractTextPlugin.extract({
                fallback: 'vue-style-loader',
                use: [
                  'stylus-loader',
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
                ],
              }),
          },
        },
        {
          test: /\.(css)$/,
          exclude: /node_modules/,
          use: [
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
          ],
        },
        {
          test: /\.styl$/,
          exclude: /node_modules/,
          use: [
            'stylus-loader',
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
        new webpack.LoaderOptionsPlugin({
          minimize: true,
        }),
        new ExtractTextPlugin({
          filename: "vi-ui.min.css",
        }),
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
