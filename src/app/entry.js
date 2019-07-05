import { v1 } from "grommet-theme-v1";
import React from "react";
import { Grommet, Box } from "grommet";
import Footer from "./footer";
import Body from "./body";
import Header from "./header";

const Entry = props => {
  return (
    <Grommet theme={v1} full>
      <Box fill>
        <Box flex="grow">
          <Box>
            <Header />
          </Box>
          <Box flex>
            <Body />
          </Box>
          <Box>
            <Footer />
          </Box>
        </Box>
      </Box>
    </Grommet>
  );
};

export default Entry;
