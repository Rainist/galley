import * as _ from "lodash";
import React, { Component } from "react";
import { fileCM } from "galley-recipes";
import YamlViewer from "../comp/yaml-viewer";
import { Box, Heading, Form, FormField, TextInput } from "grommet";
import styled from "styled-components";
import FileCMForm from "../comp/file-cm-form";
import { fillAorB } from "../utils/lodash+";

function genCM(name, namespace, filename, filecontent) {
  return fileCM.generate({ name, namespace, filename, filecontent });
}

const initialModel = {
  placeholder: {
    namespace: "my-namespace",
    name: "new-cm",
    file: {
      name: "file.txt",
      content: "write something here"
    }
  }
};

const emptyInput = { name: "", namespace: "", file: { name: "", content: "" } };

const SectionHeaderStyle = styled.div`
  padding: 0.5em 3em 0 3em;
`;

const TextInputSingleForm = props => {
  const { placeholder, onChange, value, label } = props;

  return (
    <FormField label={label}>
      <TextInput placeholder={placeholder} onChange={onChange} value={value} />
    </FormField>
  );
};
export default class FileCM extends Component {
  state = { input: emptyInput, output: "" };

  componentDidMount() {
    this.calculate();
  }

  calculate = () => {
    const { input } = this.state;
    const { placeholder } = initialModel;

    const filledInput = _.mergeWith(_.cloneDeep(input), placeholder, fillAorB);

    const { name, namespace, file } = filledInput;
    const output = genCM(name, namespace, file.name, file.content);

    this.setState({ output });
  };

  onChangeName = ({ target: { value: name } }) => {
    const input = { ...this.state.input, name };
    this.setState({ input }, () => this.calculate());
  };
  onChangeNS = ({ target: { value: namespace } }) => {
    const input = { ...this.state.input, namespace };
    this.setState({ input }, () => this.calculate());
  };

  onChangeFile = file => {
    const input = { ...this.state.input, file };
    this.setState({ input }, () => this.calculate());
  };

  render() {
    const { input, output } = this.state;
    const ph = initialModel.placeholder;

    return (
      <Box>
        <Box direction="row-responsive">
          <Box tag="header" align="center">
            <SectionHeaderStyle>
              <Heading align="start">File Configmap</Heading>
            </SectionHeaderStyle>
          </Box>
          <Box flex="grow" />
          <Box>
            <Form>
              <TextInputSingleForm
                label="name"
                placeholder={ph.name}
                onChange={this.onChangeName}
                value={input.name}
              />
              <TextInputSingleForm
                label="namespace"
                placeholder={ph.namespace}
                onChange={this.onChangeNS}
                value={input.namespace}
              />
            </Form>
          </Box>
        </Box>
        <Box direction="row-responsive">
          <Box flex="grow">
            <FileCMForm
              type="file"
              placeholder={ph.file}
              onChange={this.onChangeFile}
              value={input.file}
            />
          </Box>
          <Box pad="medium">
            <YamlViewer title="configmap" codeText={output || ""} />
          </Box>
        </Box>
      </Box>
    );
  }
}
