import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import rootReducer from "./reducers/rootReducer";
import reduxPromise from "redux-promise-middleware";
import thunk from "redux-thunk";
import './globals.scss';

import { createStore, applyMiddleware } from "redux";
const store = createStore(
  rootReducer,
  applyMiddleware(reduxPromise, thunk)
);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
