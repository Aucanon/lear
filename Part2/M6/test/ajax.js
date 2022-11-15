/**
 * @param {*string} method 请求方法
 * @param {*string} url    请求地址
 * @param {Object} params  请求参数
 * @param {function} done  请求完成后执行的回调函数
 */

function ajax(method,url,params,done){
    method = method.toUpperCase()
    var xhr = window.XMLHttpRequest 
    ? new XMLHttpRequest()
    : new ActiveXObject('Microsoft.XMLHTTP')

    //创建连接
    //将对象格式参数转换为urlencodeing格式
    var p = []
    for(k in params){
        p.push(k + '=' + params[k])
    }
    var str = p.join('&')
    //如果是GET方法 需要修改url的值？
    if(method === 'GET'){
        url += '?' + str
    }
    
    xhr.open(method,url)
    var data = null
    //如果是POST方法 设置请求头和请求体
    if(method === 'POST'){
        xhr.setRequestHeader('Content-Type','application/x-www-urlencoded')
        data = str
    }
    xhr.send(data)
    //执行回调函数
    xhr.onreadystatechange = function(){
        if(this.readyState !== 4) return
        done(JSON.parse(this.responseText))
    }
}