const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// eslint-disable-next-line arrow-body-style
module.exports = (env, argv) => {
  /*
    const prod = argv && argv.mode === 'production';
  */
  return {
    entry: path.join(__dirname, '/src/index.js'),
    output: {
      path: path.join(__dirname, '/dist/'),
      publicPath: '/dist/',
      filename: 'vitta-visual-components.min.js',
      libraryTarget: 'umd',
      libraryExport: 'default',
      library: 'VittaVisualComponents',
      umdNamedDefine: true,
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            extractCSS: true,
            presets: ['env'],
            loaders: {
              loader: ExtractTextPlugin.extract({
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
        },
        {
          test: /\.(css|styl)$/,
          exclude: /node_modules/,
          use: [
            'stylus-loader',
            'css-loader',
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
          test: /\.(png|woff|woff2|ttf|jpg|gif|svg)(\?v=.*)?$/,
          exclude: /node_modules/,
          loader: 'url-loader?limit=100000',
          options: {
            name: path.posix.join('/assets', 'fonts/[name].[ext]'),
          },
        },
      ],
    },
    /* eslint-disable */
    plugins: argv && argv.mode === 'production' ? [
      new webpack.LoaderOptionsPlugin({
        minimize: true,
      }),
      new ExtractTextPlugin({
        filename: "vi-ui.css",
      }),
      new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
          compress: true,
          mangle: true,
        },
      }),
    ] : [],
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
