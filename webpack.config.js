const path = require('path');
const webpack = require('webpack');

module.exports = {
  // Punto de entrada
  // entry: './public/javascript/app.js',
  mode: 'development',
  entry: {
    // app: './public/javascript/app.js',
    // savedPosts: './public/javascript/modules/savePost.js'
    app: {
      import: './public/javascript/app.js',
      dependOn: 'axios',
    },
    savedPosts: {
      import: './public/javascript/modules/savePost.js',
      dependOn: 'axios',
    },
    axios: 'axios',
  },
  // Punto de salida
  output: {
    // filename: 'bundle.js',
    filename: '[name].bundle.js',
    path: path.join(__dirname, './public/dist')
  },
  optimization: {
    runtimeChunk: 'single',
  },
  // Modulos que  vamos a utilizar
  module: {
    rules: [
      {
        test: /\.m?js$/, // Esta expresion regular le dice a webpack que archivos va a procesar el modulo
        use: {
          loader: 'babel-loader', 
          options: {
            presets: [
              '@babel/preset-env'
            ]
          }
        }
      }
    ]
  }
}