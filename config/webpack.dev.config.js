const path = require('path')
const fs = require('fs')
const Webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')
const WebpackMerge = require('webpack-merge')
const absolutePath = fs.realpathSync(process.cwd());

module.exports = WebpackMerge.merge(webpackConfig,{
    mode:'development',
    devtool:'eval-cheap-module-source-map',
    devServer:{
      contentBase: path.join(absolutePath, "dist"),
      open: true,
      hot:true,
      port: 9000,
      host: '127.0.0.1',
    },
    plugins:[
      new Webpack.HotModuleReplacementPlugin()
    ]
})