import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import todo from './stores/TodoStore';
import { Provider } from 'mobx-react';

ReactDOM.render(
  <Provider todo={todo}><App /></Provider>,
  document.getElementById('root')
);
