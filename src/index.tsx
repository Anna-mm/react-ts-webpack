import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl'
import {App} from './App';
// import store from './core-module/store';
import './assets';

ReactDOM.render((
    <IntlProvider locale={navigator.language}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </IntlProvider>
), document.getElementById('root'));
