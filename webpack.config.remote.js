const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const SRC_DIR = path.resolve('src');
const DIST_DIR = path.resolve('dist');

// change according to host IP
const MY_IP = '10.12.54.167';

module.exports = {
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules', SRC_DIR],
  },
  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://${MY_IP}:3000`,
    'webpack/hot/only-dev-server',
    '@babel/polyfill',
    `${SRC_DIR}/index.jsx`,
  ],
  devServer: {
    inline: true,
    host: '0.0.0.0',
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
  output: {
    path: DIST_DIR,
    filename: '[name].js',
    publicPath: '/',
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: `${SRC_DIR}/index.html`,
      filename: 'index.html',
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        API_URL: JSON.stringify(`http://${MY_IP}:8080/api`),
        WS_URL: JSON.stringify(`ws://${MY_IP}:8080`),
        MAP_API_URL: JSON.stringify(
          'https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places',
        ),
      },
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        include: [SRC_DIR],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-react',
                '@babel/preset-env',
                ['@babel/preset-stage-0', { decoratorsLegacy: true }],
              ],
              plugins: ['react-hot-loader/babel'],
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|eot|woff|woff2|ttf)$/,
        use: ['file-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
