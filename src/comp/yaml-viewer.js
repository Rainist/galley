import React, { Component } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import { Label, Button, Box, Card, Icons, Tip } from 'grommet'
import Toggler from './toggler'
import { setTimeout } from 'timers';

const { Base: { Clipboard: ClipboardIcon } } = Icons

const CopyButton = (props) => {
  const onCopy = props.onCopy || (() => console.log(copied))

  return (
    <CopyToClipboard text={props.codeText}
      onCopy={onCopy}>
      <Button id={props.id} icon={<ClipboardIcon />}
         />
    </CopyToClipboard>
  )
}

const Yaml = (props) => {
  return <SyntaxHighlighter language='yaml' style={docco}>{props.codeText}</SyntaxHighlighter>;
}

let _viewerKey = 0
function viewerKey() {
  return ++_viewerKey
}

export default class YamlViewer extends Component {
  state = {
    showCopied: false,
  };

  onCopy = () => {
    this.setState({ showCopied: true })

    setTimeout(() => {
      this.setState({ showCopied: false })
    }, 500)
  }

  render() {
    const { state, props } = this
    const { codeText } = props
    const tipId = `tip-target-uniq-${viewerKey()}`

    const onCopy = this.onCopy

    const label = <Box direction='row' align='center'>
      <Box flex={true}><Label uppercase={true} margin='none'> {props.title} </Label></Box>
      <CopyButton id={tipId} codeText={codeText} onCopy={onCopy}/>
    </Box>

    return (
      <Box
        align='center'
        margin='small'>
        <Card
          label={label}
          >
          <Yaml codeText={codeText} />
        </Card>
        <Toggler show={state.showCopied}>
          <Tip target={tipId} onClose={() => true}>
            Copied
          </Tip>
        </Toggler>
      </Box>
    )
  }
}