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
    new webpack.optimize.ModuleConcatenationPlugin()
  ],
  module: {
    rules: [
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
