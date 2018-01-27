//import styles
import 'grommet/scss/vanilla/index';

import React, { Component } from 'react';
import Grommet, { App } from 'grommet'
import Footer from './footer'
import Body from './body'
import Header from './header'

const Entry = (props) => {
  return (
    <App centered={false}>
      <Header />
      <Body />
      <Footer />
    </App>
  )
}

export default Entry