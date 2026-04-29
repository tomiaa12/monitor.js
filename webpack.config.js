const autoprefixer = require('autoprefixer')
const webpack = require('webpack')
const path = require('path')
const pkg = require('./package.json')
const TerserPlugin = require('terser-webpack-plugin')

const banner = pkg.name + ' v' + pkg.version + ' ' + pkg.homepage

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [autoprefixer]
    }
  }
}

module.exports = (env, argv) => {
  const config = {
    devtool: 'source-map',
    entry: './src/index.js',
    resolve: {
      mainFields: ['main', 'module']
    },
    devServer: {
      static: {
        directory: path.join(__dirname, './')
      },
      port: 8080
    },
    output: {
      path: __dirname,
      filename: 'monitor.js',
      publicPath: '/assets/',
      library: ['erudaMonitor'],
      libraryTarget: 'umd'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: [
            path.resolve(__dirname, './src'),
            path.resolve(__dirname, './node_modules/luna-performance-monitor')
          ],
          use: {
            loader: 'babel-loader',
            options: {
              sourceType: 'unambiguous',
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-transform-runtime']
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            'css-loader',
            postcssLoader,
          ]
        },
        {
          test: /\.scss$/,
          use: [
            'css-loader',
            postcssLoader,
            'sass-loader'
          ]
        }
      ]
    },
    plugins: [new webpack.BannerPlugin(banner)]
  }

  if (argv.mode === 'production') {
    config.optimization = {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            format: {
              comments: false
            }
          },
          extractComments: false
        })
      ]
    }
  }

  return config
}
