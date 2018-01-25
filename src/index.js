import Entry from './app/entry'

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

let element = document.getElementById('content');
ReactDOM.render(React.createElement(Entry), element);

document.body.classList.remove('loading');
