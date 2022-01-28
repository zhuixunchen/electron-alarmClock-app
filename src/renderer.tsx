// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process unless
// nodeIntegration is set to true in webPreferences.
// Use preload.js to selectively enable features
// needed in the renderer process.
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Alarm from './pages/alarm';
import 'antd/dist/antd.css';
import './index.css';

render(
  // <Router>
  //   <Route path="/" render={() => <Alarm />}></Route>
  // </Router>,
  <Alarm />,
  document.getElementById('root')
);
