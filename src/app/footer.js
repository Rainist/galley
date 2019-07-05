import React from "react";
import { Box, Anchor } from "grommet";

const AppFooter = props => {
  return (
    <Box tag="footer" align="center" pad="small" background="dark-1">
      <p>
        Built with{" "}
        <span role="img" aria-label="heart">
          ❤️
        </span>{" "}
        by{" "}
        <Anchor color="white" href="https://rainist.com" target="_blank">
          Rainist
        </Anchor>
        !
      </p>
    </Box>
  );
};

export default AppFooter;
