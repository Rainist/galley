import * as _ from 'lodash'
import React, { Component, Fragment } from 'react'
import { fileCM } from 'galley-recipes'
import YamlViewer from '../comp/yaml-viewer'
import { Title, Box, Header, Heading, Form, FormField, TextInput, Tiles, Tile } from 'grommet'
import styled from 'styled-components'
import FileCMForm from '../comp/file-cm-form'
import { fillAorB } from '../utils/lodash+'

function genCM(name, namespace, filename, filecontent){
  return fileCM.generate({ name, namespace, filename, filecontent });
};

const initialModel = {
  placeholder: {
    namespace: 'my-namespace',
    name: 'new-cm',
    file: {
      name: 'file.txt',
      content: 'write something here'
    }
  }
};

const emptyInput = { name: '', namespace: '', file: { name: '', content: '' } }

const SectionHeaderStyle = styled.div`
  padding: 0.5em 3em 0 3em;
`

const TextInputSingleForm = (props) => {
  const { placeholder, onChange, value, label } = props

  return (
    <Form pad="medium">
      <FormField label={label}>
        <TextInput placeHolder={placeholder} onDOMChange={onChange} value={value} />
      </FormField>
    </Form>
  )
}
export default class FileCM extends Component {
  state = { input: emptyInput, output: '' }

  componentDidMount() {
    this.calculate()
  }

  calculate = () => {
    const { input } = this.state
    const { placeholder } = initialModel

    const filledInput = _.mergeWith(_.cloneDeep(input), placeholder, fillAorB)

    const { name, namespace, file } = filledInput
    const output = genCM(name, namespace, file.name, file.content)

    this.setState({ output })
  }

  onChangeName = ({ target: { value: name }}) => {
    const input = { ...this.state.input, name }
    this.setState({ input }, () => this.calculate())
  }
  onChangeNS = ({ target: { value: namespace }}) => {
    const input = { ...this.state.input, namespace }
    this.setState({ input }, () => this.calculate())
  }

  onChangeFile = (file) => {
    const input = { ...this.state.input, file }
    this.setState({ input }, () => this.calculate())
  }

  render() {
    const { input, output } = this.state
    const ph = initialModel.placeholder

    return (
      <Fragment>
        <SectionHeaderStyle>
          <Header align='start'>
            <Box flex='grow'>
              <Heading align='start'>File Configmap</Heading>
            </Box>
          </Header>
        </SectionHeaderStyle>
        <Tiles fill={true}>
          <Tile>
            <TextInputSingleForm label='name' placeholder={ph.name} onChange={this.onChangeName} value={input.name} />
          </Tile>
          <Tile>
            <TextInputSingleForm label='namespace' placeholder={ph.namespace} onChange={this.onChangeNS} value={input.namespace} />
          </Tile>
        </Tiles>
        <Tiles fill={true}>
          <Tile>
            <FileCMForm type='file' placeholder={ph.file} onChange={this.onChangeFile} value={input.file} />
          </Tile>
          <Box pad="medium">
            <YamlViewer title='configmap' codeText={output || ''} />
          </Box>
        </Tiles>
      </Fragment>
    )
  }
}
