//import styles
import 'grommet/scss/vanilla/index';

import React, { Component } from 'react';
import App from 'grommet/components/App';
import Box from 'grommet/components/Box';
import Split from 'grommet/components/Split';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import Meter from 'grommet/components/Meter';
import Title from 'grommet/components/Title';
import Value from 'grommet/components/Value';
import AppMenu from './app-menu'
import EnvMapper from '../recipe/env-mapper'

export default class Entry extends Component {
  render() {
    return (
      <App centered={false}>
        <Header direction="row" justify="between" size="large"
          pad={{ horizontal: 'medium' }}>
          <Title>Galley</Title>
          <Box flex='grow'
            justify='start'>
            A kitchen to cook k8s objects
          </Box>
        </Header>
        <Split fixed={false} priority='right' flex='right'>
          <AppMenu />
          <Box justify='center'>
            <EnvMapper />
          </Box>
        </Split>
        <Footer primary={true} appCentered={true} direction="column"
          align="center" pad="small" colorIndex="grey-1">
          <p>
            Built with ❤️ by <a href="https://rainist.com" target="_blank">Rainist</a>!
          </p>
        </Footer>
      </App>
    );
  }
};