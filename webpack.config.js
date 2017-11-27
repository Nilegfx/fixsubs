const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const webpack           = require( 'webpack' );
const { resolve }       = require( 'path' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );

const config = {
  entry  : resolve( 'client/src/index.js' ),
  output : {
    path    : resolve( 'client/public' ),
    filename: 'main.bundle.js'
  },
  module : {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'env']
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin( { template: './client/src/index.html' } ),
    new CopyWebpackPlugin( [
      { from: 'client/src/assets/images/favicon.ico', to: 'favicon.ico' },
      { from: 'client/src/assets', to: 'assets' }
    ] )
  ]
};

module.exports = config;
