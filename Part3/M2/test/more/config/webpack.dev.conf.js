const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const devWebpackConfig = merge(baseWebpackConfig,{
    //开发模式对应配置
    mode:'development',
    plugins:[
        new webpack.DefinePlugin({
            //开发环境下的接口地址
            API_BASE_URL:JSON.stringify('http://apidev.example.com')
            //变量后面的值为一段代码片段
        }),
        new HtmlWebpackPlugin({
            //指定生成html的模板
            filename:'index.html',
            template:'./src/index.ejs' ,
            title:'webwebpack'
        }),
        new HtmlWebpackPlugin({
            //指定生成html的模板
            filename:'about.html',
            template:'./src/index.ejs' ,
            title:'abbbout'
        })
    ]
})

module.exports = devWebpackConfig