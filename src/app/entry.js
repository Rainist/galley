//import styles
import 'grommet/scss/vanilla/index';

import React, { Component } from 'react';
import Grommet, { App, Anchor, Box, Split, Header, Footer, Title, Value } from 'grommet'
import AppMenu from './app-menu'
import EnvMapper from '../recipe/env-mapper'
const { SocialGithubIcon } = Grommet.Icons.Base;

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
          <Anchor
            href='https://github.com/Rainist/galley'
            className='active'
            target='_blank'
            icon={<SocialGithubIcon />}
            />
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