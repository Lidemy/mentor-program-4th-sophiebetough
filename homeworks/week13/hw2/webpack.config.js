/* eslint-disable */

const path = require('path');

module.exports = {
	mode: 'production',
  entry: './src/index.js',
  output: {
  	library: 'commentPlugin',
  	filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};