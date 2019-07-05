import React from "react";
import { Anchor, Box, Text } from "grommet";
import { Github } from "grommet-icons";

const AppHeader = props => {
  return (
    <Box
      tag="header"
      direction="row"
      justify="between"
      size="large"
      pad={{ horizontal: "medium" }}
      align="center"
    >
      <Box>
        <Text size="large" weight="bold">
          <Anchor path={{ path: "/", index: true }}>Galley</Anchor>
        </Text>
      </Box>
      <Box flex="grow" justify="start" pad={{ horizontal: "large" }}>
        A kitchen to cook k8s objects
      </Box>
      <Box>
        <Anchor
          href="https://github.com/Rainist/galley"
          className="active"
          target="_blank"
          icon={<Github />}
        />
      </Box>
    </Box>
  );
};

export default AppHeader;
