const { compilation } = require("webpack");

//自定义插件
class Myplugin{
    constructor(options){
        console.log('插件配置选项',options);
        this.userOptions = options || {}
    }
    apply(compiler){
        //在钩子上挂载功能
        compiler.hooks.emit.tap('Myplugin',compilation => {
            //compilation是此次打包的上下文
            for(const name in compilation.assets){
                console.log(name);
                if(name.endsWith(this.userOptions.target)){
                    //获取打包之前内容
                    const contents = compilation.assets[name].source()
                    //将原来内容通过正则删除注释
                    const noComments = contents.replace(/\/\*[\s\S]*?\*\//g, '')
                    //将处理后的结果替换掉
                    compilation.assets[name] = {
                        source: () => noComments,
                        size: () => noComments.length
                    }
                }
            }
        })
    }
}

module.exports = Myplugin