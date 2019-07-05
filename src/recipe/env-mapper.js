import * as _ from "lodash";
import React, { Component } from "react";
import {
  Form,
  Heading,
  Box,
  Text,
  FormField,
  TextInput,
  RadioButtonGroup
} from "grommet";
import styled from "styled-components";
import YamlViewer from "../comp/yaml-viewer";
import EnvForm from "../comp/env-form";

import {
  onChangeInput,
  initialModel,
  resultStream
} from "./env-mapper/data-handler";
import { fillAorB } from "../utils/lodash+";

const SectionHeaderStyle = styled.div`
  padding: 0.5em 3em 0 3em;
`;

const { placeholder } = initialModel;
const emptyObject = { name: "", env: "" };
const emptyInput = {
  namespace: "",
  cm: { ...emptyObject },
  secret: { ...emptyObject }
};

export default class EnvMapper extends Component {
  state = { input: emptyInput, output: {}, format: "yaml" };

  componentDidMount() {
    this.result$ = resultStream.subscribe(result => {
      const { cm, secret, env: snippet } = result;
      const output = { cm, secret, snippet };
      this.setState({ output });
    });

    this.calculate();
  }

  componentWillUnmount() {
    this.result$.unsubscribe();
  }

  calculate = () => {
    const { input } = this.state;

    const filledInput = _.mergeWith(_.cloneDeep(input), placeholder, fillAorB);

    onChangeInput(filledInput);
  };

  onChangeNS = ({ target: { value: namespace } }) => {
    const input = { ...this.state.input, namespace };
    this.setState({ input }, () => this.calculate());
  };

  onChangeCm = cm => {
    const input = { ...this.state.input, cm };
    this.setState({ input }, () => this.calculate());
  };

  onChangeSecret = secret => {
    const input = { ...this.state.input, secret };
    this.setState({ input }, () => this.calculate());
  };

  setFormat = f => {
    this.setState({ format: f });
  };

  render() {
    const { input, output, format } = this.state;
    const ph = placeholder;

    return (
      <Box>
        <Box>
          <SectionHeaderStyle>
            <Box tag="header" align="center" direction="row-responsive">
              <Box>
                <Heading align="start">Env mapping</Heading>
              </Box>
              <Box flex="grow" />
              <Box background="#FCFCFC">
                <Form>
                  <FormField label="namespace">
                    <TextInput
                      placeholder={ph.namespace}
                      onChange={this.onChangeNS}
                      value={input.namespace}
                    />
                  </FormField>
                </Form>
              </Box>
            </Box>
          </SectionHeaderStyle>
        </Box>
        <Box direction="row-responsive" gap="small">
          <Box fill>
            <EnvForm
              type="configmap"
              placeholder={ph.cm}
              onChange={this.onChangeCm}
              value={input.cm}
            />
          </Box>
          <Box fill>
            <EnvForm
              type="secret"
              placeholder={ph.secret}
              onChange={this.onChangeSecret}
              value={input.secret}
            />
          </Box>
        </Box>
        <Box flex="grow" direction="row" align="center">
          <Box tag="header">
            <Text size="large" weight="bold">
              Output
            </Text>
          </Box>
          <Box pad="medium">
            <RadioButtonGroup
              direction="row"
              name="format"
              options={["yaml", "json"]}
              value={format}
              onChange={event => this.setFormat(event.target.value)}
            />
          </Box>
        </Box>
        <Box direction="row-responsive">
          <Box fill>
            <YamlViewer
              format={format}
              title="CONFIGMAP"
              codeText={output.cm || ""}
            />
          </Box>
          <Box fill>
            <YamlViewer
              format={format}
              title="SECRET"
              codeText={output.secret || ""}
            />
          </Box>
          <Box fill>
            <YamlViewer
              format={format}
              title="ENV SNIPPET"
              codeText={output.snippet || ""}
            />
          </Box>
        </Box>
      </Box>
    );
  }
}
