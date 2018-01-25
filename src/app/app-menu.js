import React, { Component } from 'react';
import Sidebar from 'grommet/components/Sidebar';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import Button from 'grommet/components/Button';
import User from 'grommet/components/icons/base/User';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Footer from 'grommet/components/Footer';

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
            <Anchor href='#'
              className='active'>
              Env mapping
            </Anchor>
            <Anchor href='https://github.com/rainist/galley/issues/new' target='_blank'>
              want more?
            </Anchor>
          </Menu>
        </Box>
        <Footer pad='medium'>
          <Button icon={<User />} />
        </Footer>
      </Sidebar>
    )
  }
}