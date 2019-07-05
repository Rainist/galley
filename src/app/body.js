import React from "react";
import { Box } from "grommet";
import AppMenu from "./app-menu";
import EnvMapper from "../recipe/env-mapper";
import FileCM from "../recipe/file-cm";
import { Route } from "react-router-dom";

const Body = props => {
  return (
    <Box direction="row-responsive" flex="grow">
      <Box gridArea="nav">
        <Route component={AppMenu} />
      </Box>
      <Box gridArea="main" pad="medium" fill>
        <Route exact path={`/`} component={EnvMapper} />
        <Route exact path={`/env-mapping`} component={EnvMapper} />
        <Route exact path={`/file-cm`} component={FileCM} />
      </Box>
    </Box>
  );
};

export default Body;
