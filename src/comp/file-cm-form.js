import * as _ from "lodash";
import React, { Component } from "react";
import { Form, FormField, Box, Text, TextInput, TextArea } from "grommet";

export default class FileCMForm extends Component {
  onChangeName = ({ target: { value: name } }) => {
    const {
      props: {
        value: { content },
        onChange
      }
    } = this;
    const output = { content, name };
    onChange(output);
  };

  onChangeContent = ({ target: { value: content } }) => {
    const {
      props: {
        value: { name },
        onChange
      }
    } = this;
    const output = { content, name };
    onChange(output);
  };

  render() {
    const { props } = this;
    const { value, placeholder: ph } = props;
    const { name, content } = value;

    return (
      <Box fill>
        <Form>
          <Box tag="header">
            <Text size="large" weight="bold">
              {_.capitalize(props.type)}
            </Text>
          </Box>
          <Box flex="grow" background="#FCFCFC">
            <Box fill>
              <FormField label={`name for ${props.type}`}>
                <TextInput
                  placeholder={ph.name}
                  onChange={this.onChangeName}
                  value={name}
                />
              </FormField>
            </Box>
            <Box>
              <FormField label={`content for ${props.type}`}>
                <TextArea
                  rows={10}
                  placeholder={ph.content}
                  onChange={this.onChangeContent}
                  value={content}
                />
              </FormField>
            </Box>
          </Box>
        </Form>
      </Box>
    );
  }
}
