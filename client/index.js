import React from 'react';
import { render } from 'react-dom';

import styles from './styles/main.scss';
import App from './src/components/App';

render(<App />, document.querySelector('.container'));
