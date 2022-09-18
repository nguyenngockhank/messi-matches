const path = require('path');

module.exports =  {
  entry: {
    main: './src/frontend/index.js',
    stats: './src/frontend/stats.js',
  },
  mode: process.env.NODE_ENV || 'development',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'frontend', 'js'),
  },
};
