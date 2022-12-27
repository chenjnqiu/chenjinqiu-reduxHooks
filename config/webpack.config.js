const path = require('path')
const webpack = require('webpack')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isProductionMode = process.env.NODE_ENV === 'production';
const absolutePath = fs.realpathSync(process.cwd());

const config = {
  entry: path.resolve(absolutePath,'src/index.jsx'),    // 入口文件
  output: {
    path: path.resolve(absolutePath,'dist'),  // 打包后的目录
    filename: '[name].[chunkhash].js', // 打包后的文件名称
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
        '@util':  path.resolve(absolutePath, 'src/utils'),
        '@service': path.resolve(absolutePath, 'src/services'),
        '@page': path.resolve(absolutePath, 'src/pages'),
        '@component': path.resolve(absolutePath, 'src/components'),
        '@asset': path.resolve(absolutePath, 'src/assets'),
        '@constants': path.resolve(absolutePath, 'src/constants'),
    }, 
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(css|less)$/,
        exclude: /node_modules/,
        use: [
          isProductionMode ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: (resourcePath) => {
                  if (/global.less$/i.test(resourcePath)) {
                    return "global";
                  }
    
                  return "local";
                },
                localIdentName: "[path][name]__[local]--[hash:base64:5]",
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  'postcss-preset-env', // 浏览器兼容加前缀并且将有些浏览器不认识的语法就行转化
                ]
              },
            }},
            'less-loader'
        ] 
      },
      {
        test: /\.(css|less)$/,
        include: /node_modules/,
        use: [
          isProductionMode ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          {
            loader: 'less-loader', 
            options: {
              lessOptions: { javascriptEnabled: true } //兼容antd按需加载
            }
          } 
        ] 
      },

      /* {
        test: /\.(png|jpe?g|svg|gif)$/,//webpack4图片解析
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[contenthash].[ext]',
              limit: 8192,
              outputPath: 'images',
              esModule: false,
            }
          },
        ],
        type: 'javascript/auto'
      }, */
       {
        test: /\.(png|jpe?g|gif|webp)$/, // 图片处理
        type: 'asset',
        generator: {
          filename: 'assets/images/[hash][ext][query]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/, // 字体处理
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[hash][ext][query]',
        },
      },
      /* {
        test: /\.svg$/, // 处理svg
        type: 'asset/inline',
        exclude: path.resolve(absolutePath, 'src/assets/svgIcons'), //不处理指定svg的文件
      }, */
      {
        test: /\.svg$/, // 处理svg图标
        loader: 'svg-sprite-loader', 
        include: path.resolve(absolutePath, 'src/assets/svgIcons'), // 只处理指定svg的文件
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'redecer测试', // 模板要使用 <title><%= htmlWebpackPlugin.options.title %></title> 配置才生效
      template: path.resolve(absolutePath, 'src/index.html'), // 模板路径
      filename: 'index.html', // 输出 HTML 文件名称
      favicon: path.resolve(absolutePath, 'src/favicon.ico')
    }),
    // 新版无需再指定删除目录，默认删除 output 目录
    new CleanWebpackPlugin(),
    // 将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件
    new MiniCssExtractPlugin({
        filename: isProductionMode ? '[name].css' : '[name].[contenthash].css',
        chunkFilename: isProductionMode ? "[id].css" : "[id].[contenthash].css",
    }),
    // 将外部应用模块放入全局使用，不用单独引用
    new webpack.ProvidePlugin({
      _: 'lodash',
    }),
  ],
}

module.exports = config