import Entry from './app/entry'

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'

let element = document.getElementById('content')
ReactDOM.render(<Router><Entry /></Router>, element)


document.body.classList.remove('loading')
