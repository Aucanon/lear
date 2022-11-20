const marked = require('marked')

module.exports = function(source) {
    //获取loader配置项
    // const options = this.query
    console.log('ooooo' + this.query.size);
    console.log('123'+source);
    const html = marked.parse(source)
    // return `module.export = ${JSON.stringify(html)}`
    return html
}