const path = require('path');

module.exports =  {
  entry: './src/frontend/index.js',
  mode: process.env.NODE_ENV || 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'frontend', 'js'),
  },
};
