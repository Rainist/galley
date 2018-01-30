import path from 'path';
import webpack from 'webpack';

export default {
  entry: './src/index.js',
  output: {
    path: path.resolve('./dist'),
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.js', '.scss', '.css', '.json', '.elm']
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        use: {
          loader: 'elm-webpack-loader',
          options: {}
        }
      },
      {
        exclude: /node_modules/,
        test: /\.js/,
        use: [
          { loader: 'babel-loader' }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader', options: {
              includePaths: ['./node_modules']
            }
          }
        ]
      },
    ]
  }
};