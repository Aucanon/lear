const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const CssMiniMizer = require('css-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const EslintPlugin = require('eslint-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    //打包模式
    mode:'development',

    //入口文件
    entry:'./src/index.js',

    //出口配置
    output:{
        //输出目录
        path:resolve(__dirname,'output'),
        //输出文件名
        filename:'main.js'
    },
    module:{
        rules:[
            //指定多个配置规则
            {
                test:/\.css$/i,
                //use中loader的加载顺序从右到左，先下后上
                use:[
                    //#3.将js中的样式挂载到<style>标签中
                    // 'style-loader',

                    //3.将css打包到独立的文件中
                    // MiniCssExtractPlugin.loader,
                    {
                        loader:MiniCssExtractPlugin.loader,
                        options: {
                            publicPath:'../'
                        }
                    },

                    //2.css-loader按commonjs规范将样式文件输出到js中
                    // 'css-loader',
                    {
                        loader:'css-loader',
                        options:{
                            esModule:false
                        }
                    },

                    //1通过postcss-loader给样式属性添加浏览器前缀
                    'postcss-loader'
                ]
            },
            {
                test:/\.less$/i,
                //use中loader的加载顺序从右到左，先下后上
                use:[
                    //#4.将js中的样式挂载到<style>标签中
                    // 'style-loader',

                    //4.将css打包到独立的文件中
                    // MiniCssExtractPlugin.loader,
                    {
                        loader:MiniCssExtractPlugin.loader,
                        options: {
                            publicPath:'../'
                        }
                    },

                    //3.css-loader按commonjs规范将样式文件输出到js中
                    // 'css-loader',
                    {
                        loader:'css-loader',
                        options:{
                            esModule:false
                        }
                    },

                    //2通过postcss-loader给样式属性添加浏览器前缀
                    'postcss-loader',

                    //1.将less转成普通css
                    'less-loader'                    
                ]
            },
            {
                test: /\.m?js$/i,
                exclude: /node_modules/, // 排除不需要打包的⽬录
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    //按需加载
                                    useBuiltIns:'usage',
                                    corejs:3,
                                    //指定兼容浏览器版本
                                    targets:{
                                        chrome:'58',
                                        ie:'9',
                                        firefox:'60',
                                        edge:'17'
                                    }
                                }
                            ]
                        ]
                    }
                }
            },
            {
                test:/\.(png|gif|jpe?g)$/i,
                // use:{
                //     loader:'url-loader',
                //     options:{
                //         limit: 8 * 1024, // 2 kb 设置图⽚⼤⼩，⼩于该数值的图⽚会被转成 base64
                //         name: "images/[name].[ext]",
                //         esModule: false
                //     }
                // }
                type:'asset',
                parser:{
                    dataUrlCondition:{
                        maxSize:8 * 1024//默认
                    }
                },
                generator:{
                    filename:'image/[name][ext]'
                }
                // use: {
                //   loader: "url-loader",
                //   options: {
                //     // 指定图片大小，小于该数值的图片，会被转成 base64
                //     limit: 8 * 1024, // 8 kb
                //     // [name] 是图片原来的名称
                //     // [ext] 是图片原来的后缀名
                //     name: "image/[name].[ext]",
                //     // url-loader 默认采用 ES Modules 规范进行解析，但是 html-loader 引入图片使用的是 CommonJS 规范
                //     // 解决：关闭 url-loader 默认的 ES Modules 规范，强制 url-loader 使用 CommonJS 规范进行打包
                //     esModule: false
                //   }
                // }
            },
            {
                test:/\.(htm|html)$/i,
                use:{
                    loader:'html-loader',
                    options:{
                        esModule: false
                    }
                }
            },
            {
                test:/\.(eot|svg|ttf|woff|woff2)$/i,
                // use:{
                //     loader:'file-loader',
                //     options:{
                //         name:'fonts/[name].[ext]'
                //     }
                // }
                //使用资源处理字体文件

                type:'asset',
                parser:{
                    dataUrlCondition:{
                        maxSize:8 * 1024//默认
                    }
                },
                generator:{
                    filename:'fonts/[name][ext]'
                }
            }
        ]
    },

    //开发服务器
    devServer:{
        //指定加载内容路径
        static: {
            directory: resolve(__dirname,'output'),
          },
          //启用gzip压缩
          compress: true,
          //指定端口号
          port: 9000,
          liveReload:true,
          //配置代理
          proxy:{
            //http://localhost:9000/api
            '/api':{
                target:'https://api.github.com',
                pathRewrite:{
                    '^/api':''
                },
                //不能使用localhost:9000作为github的主机名
                changeOrigin:true,
            }
          }
    },

    target:'web',

    //插件配置
    plugins:[
        new MiniCssExtractPlugin({
            filename:'css/[name].css'//[name].css保留原有名字
        }),
        new StyleLintPlugin({
            //制定需要格式校验的文件
            files:['src/css/*.{css,less,sass,scss}']
        }),
        //压缩css
        new CssMiniMizer(),
        //Html配置
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
        new EslintPlugin({
            //自动解决常规代码格式报错
            fix:true
        }),
        new CopyWebpackPlugin({
            //将src不需要特殊处理的文件直接复制到输出目录中
            patterns:[
                {
                    from:'src/public',
                    to:'public'
                }
            ]
        }),
        //打包之前删除历史文件
        new CleanWebpackPlugin({})
    ]

}