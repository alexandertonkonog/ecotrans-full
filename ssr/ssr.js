import fs from "fs";
import path from "path";

import React from "react";
import ReactDOMServer from "react-dom/server";
import {createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import thunk from 'redux-thunk';

import App from "../client/src/App";
import {reducers} from '../client/src/redux/redux';

export const handleRender = (req, res) => {
    const store = createStore(reducers, applyMiddleware(thunk))
    // Render the component to a string
    const html = ReactDOMServer.renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={{}}>
            <App />
        </StaticRouter>
      </Provider>
    )
  
    // Grab the initial state from our Redux store
    const preloadedState = store.getState();
    // Send the rendered page back to the client
    res.send(renderFullPage(html, preloadedState))
}
  
const renderFullPage = (html, preloadedState) => {
    let indexHTML = fs.readFileSync( path.resolve( __dirname, '../client/build/index.html' ), {
      encoding: 'utf8',
    });
    indexHTML = indexHTML.replace('__APP__', html);
    indexHTML = indexHTML.replace('__STATE__', `globalThis.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
      /</g,
      '\\u003c'
    )}`);
    return indexHTML;        
}