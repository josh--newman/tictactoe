import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './src/components/App';
import reducers from './src/reducers';

const createStoreWithMiddleWare = applyMiddleware()(createStore);

render(
  <Provider store={createStoreWithMiddleWare(reducers)}>
    <App />
  </Provider> , document.querySelector('.container'));
