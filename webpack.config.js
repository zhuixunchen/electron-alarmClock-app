const path = require('path');

module.exports = {
  watch: false,
  target: 'electron-renderer',
  mode: 'development',
  devtool: 'inline-source-map',
  entry: `./src/renderer.tsx`,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: 'ts-loader' }, // 代替tsc
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  }
};
