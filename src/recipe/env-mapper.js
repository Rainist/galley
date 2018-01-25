
import * as _ from 'lodash'
import React, { Component } from 'react';
const Fragment = React.Fragment
import { Form, Split, Tile, Tiles, Heading, Title, Box, Card, FormField, TextInput, Header } from 'grommet'
import styled from 'styled-components';
import YamlViewer from '../comp/yaml-viewer'
import EnvForm from '../comp/env-form'

import { onChangeInput, initialModel, resultStream } from './env-mapper/data-handler'

const SectionHeaderStyle = styled.div`
  padding-left: 3em;
  padding-top: 0.5em;
`;

const { placeholder } = initialModel

export default class EnvMapper extends Component {
  state = { input: { ...placeholder }, output: {} };

  componentDidMount() {
    resultStream.subscribe(result => {
      const { cm, secret, env: snippet } = result
      const output = {cm, secret, snippet}
      this.setState({ output })
    });
  }

  calculate = () => {
    const { input } = this.state
    const self = this

    const filteredInput = _.pickBy(input, item => !_.isEmpty(item))
    const structuredInput = { ...placeholder, ...filteredInput }

    onChangeInput(structuredInput)
  }

  onChangeNS = ({ target: { value: namespace }}) => {
    const input = { ...this.state.input, namespace }
    this.setState({ input }, () => this.calculate())
  }

  onChangeCm = (cm) => {
    const input = { ...this.state.input, cm }
    this.setState({ input }, () => this.calculate())
  }

  onChangeSecret = (secret) => {
    const input = { ...this.state.input, secret }
    this.setState({ input }, () => this.calculate())
  }

  render() {
    const { input, output } = this.state

    return (
      <Fragment>
        <SectionHeaderStyle>
          <Header align='start'>
            <Heading align='start'>Env mapping</Heading>
          </Header>
        </SectionHeaderStyle>
        <Form pad="medium">
          <FormField label='namespace'>
            <TextInput placeHolder={placeholder.namespace} onDOMChange={this.onChangeNS} />
          </FormField>
        </Form>
        <Tiles fill={true}>
          <Tile>
            <EnvForm type='configmap' placeholder={placeholder.cm} onChange={this.onChangeCm} />
          </Tile>
          <Tile>
            <EnvForm type='secret' placeholder={placeholder.secret} onChange={this.onChangeSecret} />
          </Tile>
        </Tiles>
        <Tiles fill={true}>
          <Tile>
            <YamlViewer title='configmap' codeText={output.cm || ''} />
          </Tile>
          <Tile>
            <YamlViewer title='secret' codeText={output.secret || ''} />
          </Tile>
          <Tile>
            <YamlViewer title='env snippet' codeText={output.snippet || ''} />
          </Tile>
        </Tiles>
      </Fragment>
    )
  }
}