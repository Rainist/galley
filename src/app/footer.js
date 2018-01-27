import React, { Component } from 'react';
import Grommet, { Footer } from 'grommet'

const AppFooter = (props) => {
  return (
    <Footer primary={true} appCentered={true} direction="column"
      align="center" pad="small" colorIndex="grey-1">
      <p>
        Built with ❤️ by <a href="https://rainist.com" target="_blank">Rainist</a>!
      </p>
    </Footer>
  )
}

export default AppFooter