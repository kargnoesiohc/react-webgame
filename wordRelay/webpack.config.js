const path = require('path');
const webpack = require('webpack');

module.exports = {
  name: 'word-relay-setting',
  mode: 'development', // 실서비스 : production
  devtool: 'eval',
  resolve: {
    extensions: ['.js','.jsx']
  },
  
  entry: {
    app: ['./client',],
  }, //입력

  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      options: {
        presets: [
          ['@babel/preset-env',  {  //옛날 버전 지원 가능 
            targets: {
              browsers: ['> 1% in KR'], 
            },
            debug: true,
          }], 
          '@babel/preset-react'
        ],
        plugins: [
          '@babel/plugin-proposal-class-properties',
          'react-hot-loader/babel',
        ],
      },
    }],
  }, 
  plugins: [
    new webpack.LoaderOptionsPlugin({ debug: true }),
  ],

  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'dist'),
   
  }, //출력
};
