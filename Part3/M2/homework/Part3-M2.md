1、Webpack 的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。
    1.初始化配置
        读取webpack对应配置文件执行默认配置。
    2.开始编译
        实例化compiler对象并加载配置的插件。
    3.确定入口
        根据配置entry确定入口文件。
    4.编译模块
        使用loader对模块进行编译。
    5.生成chunk
        实例化chunk并生成chunk。
    6.输出资源
        根据模块依赖关系渲染chunk资源。
    7.生成文件
        根据输出配置写入文件。

2、Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。
    loader用于对模块源码进行转换，可以将css预处理文件转换为css，将ts转换为js等。loader的开发就是一个单独到处的模块接收一个source然后对source进行一系列的处理后返回js代码。
    plugin通过webpack钩子机制实现，比loader有更强的能力。能够解决一些loader不能实现的功能。plugin的开发必须是一个函数或者是包含apply方法的对象。入参是一个compiler对象，其包含构建所需信息，开发时可以通过compiler中hooks属性访问到emit钩子，并通过其tap方法注册一个钩子函数，定制钩子名称和挂载函数。该函数入参为compilation打包上下文，通过遍历compilation下assets的所有键得到所有文件名称。然后根据 键 的source（）方法拿到对应的content内容，然后对content进行一些处理，并返回给souce函数。