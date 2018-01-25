import * as _ from 'lodash'
import React, { Component } from 'react';
import { Form, FormField, Header, Title, TextInput } from 'grommet'

export default class EnvForm extends Component {
  state = { name: '', env: '' };

  componentDidMount() {
    this.updateChange()
  }

  updateChange = () => {
    const { props, state } = this
    const { onChange, placeholder } = props

    const filteredState = _.pickBy(state, item => !_.isEmpty(item))
    const output = { ...placeholder, ...filteredState }

    onChange(output)
  }

  onChangeName = ({ target: { value: name }}) => {
    this.setState({ name }, () => this.updateChange())
  }

  onChangeEnv = ({ target: { value: env }}) => {
    this.setState({ env }, () => this.updateChange())
  }

  render () {
    const { props } = this
    const { name, env } = props.placeholder

    return (
      <Form>
        <Header>
          <Title>
            {_.capitalize(props.type)}
          </Title>
        </Header>
        <FormField label={`name for ${props.type}`}>
          <TextInput placeHolder={name} onDOMChange={this.onChangeName} />
        </FormField>
        <FormField label={`env for ${props.type}`}>
          <textarea rows={10} placeholder={env} onChange={this.onChangeEnv} />
        </FormField>
      </Form>
    )
  }
}
