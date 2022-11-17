// import '@babel/polyfill'
// polyfill会转义所有的新语法

import './css/main.css';
import './css/main.less';

import boy from './image/xph.gif';

console.log(123);

const showMsg = () => {
  // eslint-disable-next-line
  alert(123);
};

// eslint-disable-next-line
window.showMsg = showMsg;

const p = new Promise((resolve) => {
  setTimeout(() => {
    console.log('ppppromise');
    resolve();
  }, 1000);
});

console.log(p);

// eslint-disable-next-line
const img = new Image();
img.src = boy;
// eslint-disable-next-line
document.body.append(img);
