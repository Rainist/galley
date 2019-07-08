import React, { Component } from "react";
import { Text, Box, Anchor } from "grommet";

const highlightColor = "#2A639B";

const pathEnvMapper = "env-mapping";
const pathFileCM = "file-cm";

function getHash() {
  if (window.location.hash === "#/") {
    return `#/${pathEnvMapper}`;
  }
  return window.location.hash;
}

const bgAnchor = path => {
  if (`#/${path}` === getHash()) {
    return "white";
  }
  return highlightColor;
};

const fgAnchor = path => {
  if (`#/${path}` === getHash()) {
    return highlightColor;
  }
  return "white";
};

export default class AppMenu extends Component {
  render() {
    const emFg = fgAnchor(pathEnvMapper);
    const emBg = bgAnchor(pathEnvMapper);

    const fcFg = fgAnchor(pathFileCM);
    const fcBg = bgAnchor(pathFileCM);

    return (
      <Box
        direction="column"
        fill
        background={highlightColor}
        pad={{ horizontal: "small" }}
      >
        <Box tag="header" pad="medium" justify="between">
          <Text size="large" weight="bold">
            Recipes
          </Text>
        </Box>
        <Box flex="grow" direction="column" justify="start">
          <Box pad="small" background={emBg}>
            <Anchor color={emFg} href="#/env-mapping">
              Env Mapping
            </Anchor>
          </Box>
          <Box pad="small" background={fcBg}>
            <Anchor color={fcFg} href="#/file-cm">
              File Configmap
            </Anchor>
          </Box>
          <Box pad="small">
            <Anchor
              color="white"
              href="https://github.com/rainist/galley/issues/new"
              target="_blank"
            >
              want more?
            </Anchor>
          </Box>
        </Box>
        <Box tag="footer" pad="medium" />
      </Box>
    );
  }
}
