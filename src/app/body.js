import React, { Component } from 'react';
import Grommet, { Box, Split } from 'grommet'
import AppMenu from './app-menu'
import EnvMapper from '../recipe/env-mapper'
import FileCM from '../recipe/file-cm'
import { Route } from 'react-router-dom'

const Body = (props) => {
  return (
    <Split fixed={false} priority='right' flex='right'>
      <AppMenu />
      <Box justify='center'>
        <Route exact path={`/`} component={EnvMapper}/>
        <Route exact path={`/env-mapping`} component={EnvMapper}/>
        <Route exact path={`/file-cm`} component={FileCM}/>
      </Box>
    </Split>
  )
}

export default Body