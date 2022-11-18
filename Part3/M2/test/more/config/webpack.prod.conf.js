const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CssMiniMizer = require('css-minimizer-webpack-plugin')

const prodWebpackConfig = merge(baseWebpackConfig,{
    //生产模式模式对应配置
    mode:'production',
    plugins:[
        new webpack.DefinePlugin({
            //开发环境下的接口地址
            API_BASE_URL:JSON.stringify('http://apiprod.example.com')
            //变量后面的值为一段代码片段
        }),
        //压缩css
        new CssMiniMizer(),
        new HtmlWebpackPlugin({
            //指定生成html的模板
            filename:'index.html',
            template:'./src/index.ejs' ,
            title:'webwebpack',
            minify:{
                collapseWhitespace:true,
                keepClosingSlash:true,
                removeComments:true,
                removeRedundantAttributes:true,
                removeScriptTypeAttributes:true,
                removeStyleLinkTypeAttributes:true,
                useShortDoctype:true
            }
        }),
        new HtmlWebpackPlugin({
            //指定生成html的模板
            filename:'about.html',
            template:'./src/index.ejs' ,
            title:'abbbout',
            minify:{
                collapseWhitespace:true,
                keepClosingSlash:true,
                removeComments:true,
                removeRedundantAttributes:true,
                removeScriptTypeAttributes:true,
                removeStyleLinkTypeAttributes:true,
                useShortDoctype:true
            }
        }),
    ]
})

module.exports = prodWebpackConfig