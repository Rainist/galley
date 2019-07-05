import * as _ from "lodash";
import React, { Component } from "react";
import { Form, FormField, Box, TextInput, Text, TextArea } from "grommet";

export default class EnvForm extends Component {
  onChangeName = ({ target: { value: name } }) => {
    const {
      props: {
        value: { env },
        onChange
      }
    } = this;
    const output = { env, name };
    onChange(output);
  };

  onChangeEnv = ({ target: { value: env } }) => {
    const {
      props: {
        value: { name },
        onChange
      }
    } = this;
    const output = { env, name };
    onChange(output);
  };

  render() {
    const { props } = this;
    const { value, placeholder: ph } = props;
    const { name, env } = value;

    return (
      <Box>
        <Form>
          <Box tag="header">
            <Text size="large" weight="bold">
              {_.capitalize(props.type)}
            </Text>
          </Box>
          <Box background="#FCFCFC">
            <FormField
              label={`name for ${props.type}`}
              htmlFor={`ti-name-${ph.name}`}
            >
              <TextInput
                id={`ti-name-${ph.name}`}
                placeholder={ph.name}
                onChange={this.onChangeName}
                value={name}
              />
            </FormField>
          </Box>
          <Box background="#FCFCFC">
            <FormField
              label={`env for ${props.type}`}
              htmlFor={`ti-env-${ph.name}`}
            >
              <TextArea
                background="#F3F7F2"
                id={`ti-env-${ph.name}`}
                border={false}
                rows={10}
                placeholder={ph.env}
                onChange={this.onChangeEnv}
                value={env}
              />
            </FormField>
          </Box>
        </Form>
      </Box>
    );
  }
}
