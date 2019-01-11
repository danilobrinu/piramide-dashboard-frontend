import React from 'react';
import { render } from 'react-dom';
import { IconSettings, Settings } from '@salesforce/design-system-react';
import App from './App';
import * as serviceWorker from './serviceWorker';

Settings.setAppElement('body');

render(
  <IconSettings iconPath="/assets/icons">
    <App />
  </IconSettings>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
