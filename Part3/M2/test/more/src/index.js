// import '@babel/polyfill'
// polyfill会转义所有的新语法

import './css/main.css';
import './css/main.less';

import $ from 'jquery';
import about from './about.md';

import boy from './image/xph.gif';
// eslint-disable-next-line
console.log(123);

const showMsg = () => {
  // eslint-disable-next-line
  alert(123);
};

// eslint-disable-next-line
window.showMsg = showMsg;

const p = new Promise((resolve) => {
  setTimeout(() => {
    // eslint-disable-next-line
    console.log('ppppromise');
    resolve();
  }, 1000);
});
// eslint-disable-next-line
console.log(p);

// eslint-disable-next-line
const img = new Image();
img.src = boy;
// eslint-disable-next-line
document.body.append(img);
// eslint-disable-next-line
console.log(API_BASE_URL);
// eslint-disable-next-line
console.log(about);
// 给body添加一个页脚
// eslint-disable-next-line
$(body).append('<h3>备案号：xxxxxxxx</h3>');
//按需加载
// eslint-disable-next-line
// 验证按需加载
document.getElementById('btn').onclick = function() {
  // import 启动懒加载
  // webpackChunkName: 'desc' 指定懒加载的文件名称
  // webpackPrefetch: true 启动预加载
  import(/* webpackChunkName: 'desc', webpackPrefetch: true */'./wp').then(({ desc }) => {
    alert(desc())
  })
}
