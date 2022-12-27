const webpackConfig = require('./webpack.config.js')
const WebpackMerge = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin') 
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = WebpackMerge.merge(webpackConfig,{
    mode:'production',
    optimization:{
      minimizer:[
        new TerserPlugin({
          extractComments:false, // 去掉打包的证书文件
        }),
         new UglifyJsPlugin({ // 压缩js
          cache:true,
          parallel:true,
          sourceMap:true
        }),
        new CssMinimizerPlugin() //压缩css
      ],
      splitChunks: {
        cacheGroups: {
          default: {
            name: 'common',
            chunks: 'initial',
            minChunks: 2,  //模块被引用2次以上的才抽离
            priority: -20
          },
          vendor: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/, // 将node_modules模块打包到公共的vendor文件去，减小入口文件大小
            name: 'vendor',
            chunks: 'all',
          },
        },
      }
    }
  })