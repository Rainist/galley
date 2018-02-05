import * as _ from 'lodash'
import React, { Component } from 'react';
import { Form, FormField, Header, Title, TextInput } from 'grommet'

export default class FileCMForm extends Component {
  onChangeName = ({ target: { value: name }}) => {
    const { props: { value: { content }, onChange } } = this
    const output = { content, name }
    onChange(output)
  }

  onChangeContent = ({ target: { value: content }}) => {
    const { props: { value: { name }, onChange } } = this
    const output = { content, name }
    onChange(output)
  }

  render () {
    const { props } = this
    const { value, placeholder: ph } = props
    const { name, content } = value

    return (
      <Form>
        <Header>
          <Title>
            {_.capitalize(props.type)}
          </Title>
        </Header>
        <FormField label={`name for ${props.type}`}>
          <TextInput placeHolder={ph.name} onDOMChange={this.onChangeName} value={name} />
        </FormField>
        <FormField label={`content for ${props.type}`}>
          <textarea rows={10} placeholder={ph.content} onChange={this.onChangeContent} value={content} />
        </FormField>
      </Form>
    )
  }
}
