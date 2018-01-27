import React, { Component } from 'react';
import { Sidebar, Title, Box, Footer, Header, Anchor, Button, Menu } from 'grommet'

export default class AppMenu extends Component {
  render() {
    return (
      <Sidebar colorIndex='neutral-1' full={true} fixed={true} size='small' separator='right'>
        <Header pad='medium'
          justify='between'>
          <Title>
            Recipes
          </Title>
        </Header>
        <Box flex='grow'
          justify='start'>
          <Menu primary={true}>
            <Anchor path={{ path: '/env-mapping', index: true }} >
              Env Mapping
            </Anchor>
            <Anchor path={{ path: '/file-cm'}} >
              File Configmap
            </Anchor>
            <Anchor href='https://github.com/rainist/galley/issues/new' target='_blank'>
              want more?
            </Anchor>
          </Menu>
        </Box>
        <Footer pad='medium'>
        </Footer>
      </Sidebar>
    )
  }
}