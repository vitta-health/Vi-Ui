const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

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
              stylus: 'vue-style-loader!css-loader!stylus-loader',
            },
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
      ],
    },
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
    devtool: 'source-map',
    devServer: {
      noInfo: true,
    },
    performance: {
      hints: false,
    },
  };
};
