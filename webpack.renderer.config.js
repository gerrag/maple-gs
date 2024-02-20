const rules = require('./webpack.rules');

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
  externals: {
    "serialport": "./releases/app/node_modules/serialport",
  },
  output: {
    libraryTarget: 'commonjs2',
  }
};
