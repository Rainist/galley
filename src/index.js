import Entry from "./app/entry";

import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";

let element = document.getElementById("root");
ReactDOM.render(
  <Router>
    <Entry />
  </Router>,
  element
);

document.body.classList.remove("loading");
