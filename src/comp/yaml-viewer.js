import React, { Component } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { Layer, Text, Button, Box } from "grommet";
import Toggler from "./toggler";
import { setTimeout } from "timers";

import { safeLoad } from "js-yaml";

import { Clipboard } from "grommet-icons";

const CopyButton = props => {
  const onCopy = props.onCopy || (copied => console.log(copied));

  return (
    <CopyToClipboard text={props.copyText} onCopy={onCopy}>
      <Button id={props.id} icon={<Clipboard />} />
    </CopyToClipboard>
  );
};

const Code = props => {
  const { format, codeText } = props;
  const output = codeOutput(format, codeText);

  return (
    <SyntaxHighlighter language={format} style={docco}>
      {output}
    </SyntaxHighlighter>
  );
};

const codeOutput = (format, yaml) => {
  const isJson = format === "json" ? true : false;

  if (yaml.length === 0) return "";
  if (!isJson) return yaml;

  let json;
  try {
    json = safeLoad(yaml);
    const text = JSON.stringify(json, null, 2);
    return text;
  } catch (error) {
    return "failed to transform from yaml to json";
  }
};

let _viewerKey = 0;
function viewerKey() {
  return ++_viewerKey;
}

export default class YamlViewer extends Component {
  state = {
    showCopied: false
  };

  onCopy = () => {
    this.setState({ showCopied: true });

    setTimeout(() => {
      this.setState({ showCopied: false });
    }, 800);
  };

  render() {
    const { state, props } = this;
    const { codeText, format } = props;

    const tipId = `tip-target-uniq-${viewerKey()}`;

    const onCopy = this.onCopy;

    const copyText = codeOutput(format, codeText);

    const label = (
      <Box direction="row" align="center">
        <Box flex={true}>
          <Text uppercase={true} margin="none">
            {" "}
            {props.title}{" "}
          </Text>
        </Box>
        <Box>
          <CopyButton id={tipId} copyText={copyText} onCopy={onCopy} />
        </Box>
      </Box>
    );

    return (
      <Box align="center" margin="small">
        <Box tag="header">{label}</Box>
        <Box>
          <Code codeText={codeText} format={format} />
        </Box>
        <Toggler show={state.showCopied}>
          <Layer>Copied to Clipboard</Layer>
          {/*<Tip target={tipId} onClose={() => true}>
            Copied
    </Tip>*/}
        </Toggler>
      </Box>
    );
  }
}
