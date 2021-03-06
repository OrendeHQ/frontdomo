const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const SRC_DIR = path.resolve('src');
const DIST_DIR = path.resolve('dist');

module.exports = {
  entry: ['@babel/polyfill', `${SRC_DIR}/index.jsx`],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules', SRC_DIR],
  },
  output: {
    path: DIST_DIR,
    filename: '[name]-[hash].js',
    publicPath: '/',
  },
  mode: 'production',
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: `${SRC_DIR}/index.html`,
    }),
    new UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        API_URL: JSON.stringify('https://backdemo.herokuapp.com/api'),
        WS_URL: JSON.stringify('wss://backdemo.herokuapp.com'),
        MAP_API_URL: JSON.stringify(
          'https://maps.googleapis.com/maps/api/js?key=AIzaSyBrgeMdt3-y8rUEJkLMLBDYvtFWTW2Q3FA&v=3.exp&libraries=geometry,drawing,places',
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
