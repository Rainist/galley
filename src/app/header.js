import React, { Component } from 'react';
import Grommet, { Anchor, Box, Header, Title } from 'grommet'
const { SocialGithubIcon } = Grommet.Icons.Base;

const AppHeader = (props) => {
  return (
    <Header direction="row" justify="between" size="large"
      pad={{ horizontal: 'medium' }}>
      <Title>
        <Anchor path={{ path: '/', index: true }} >
          Galley
        </Anchor>
      </Title>
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
  )
}

export default AppHeader