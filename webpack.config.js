const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const autoprefixer = require('autoprefixer');

// eslint-disable-next-line arrow-body-style
module.exports = (env, argv) => {
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
            presets: ['env'],
            loaders: {
              stylus: argv && argv.mode === 'production'
                ? 'vue-style-loader!css-loader!postcss-loader!stylus-loader'
                : 'vue-style-loader!css-loader!stylus-loader',
              postcss: argv && argv.mode === 'production'
                ? [(autoprefixer)({ browsers: ['> 3% in BR'] })]
                : [],
            },
          },
        },
        {
          test: /\.styl$/,
          loader: argv && argv.mode === 'production'
            ? 'vue-style-loader!css-loader!postcss-loader!stylus-loader'
            : 'vue-style-loader!css-loader!stylus-loader',
          options: {
            postcss: argv && argv.mode === 'production'
              ? [(autoprefixer)({ browsers: ['> 3% in BR'] })]
              : [],
          },
        },
        {
          test: /\.css$/,
          loader: 'vue-style-loader!css-loader',
        },
        {
          test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
          exclude: path.resolve(__dirname, './src'),
          loader: 'url-loader?limit=100000',
          options: {
            name: path.posix.join('/assets', 'fonts/[name].[ext]'),
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
          test: /\.(png|woff|woff2|jpg|gif|svg)(\?v=.*)?$/,
          exclude: /node_modules/,
          loader: 'url-loader?limit=100000',
          options: {
            name: '/assets/images/[name].[ext]',
          },
        },
        {
          test: /\.json$/,
          loader: 'json-loader',
        },
      ],
    },
    /* eslint-disable */
    plugins: argv && argv.mode === 'production' ? [
      new webpack.LoaderOptionsPlugin({
        minimize: true,
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
