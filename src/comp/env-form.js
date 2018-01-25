import * as _ from 'lodash'
import React, { Component } from 'react';
import { Form, FormField, Header, Title, TextInput } from 'grommet'

export default class EnvForm extends Component {
  onChangeName = ({ target: { value: name }}) => {
    const { props: { value: { env }, onChange } } = this
    const output = { env, name }
    onChange(output)
  }

  onChangeEnv = ({ target: { value: env }}) => {
    const { props: { value: { name }, onChange } } = this
    const output = { env, name }
    onChange(output)
  }

  render () {
    const { props } = this
    const { value, placeholder: ph } = props
    const { name, env } = value

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
        <FormField label={`env for ${props.type}`}>
          <textarea rows={10} placeholder={ph.env} onChange={this.onChangeEnv} value={env} />
        </FormField>
      </Form>
    )
  }
}
