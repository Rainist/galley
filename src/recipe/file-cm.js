import * as _ from 'lodash'
import React, { Component, Fragment } from 'react';
import { genCM } from '../reason/RecipeFileCM.bs'
import YamlViewer from '../comp/yaml-viewer'
import { Title, Box, Header } from 'grommet'

const sampleContent = 'file: yaml\nkey: value'
const sampleCM = genCM('my-name', 'my-namespace', 'filename.yml', sampleContent)

const FileCM = (props) => {
  return (
    <Fragment>
      <Header pad="medium">
        <Title>
          File CM
        </Title>
        <div>
          is going to generate yaml file like the sample below
        </div>
      </Header>
      <Box pad="medium">
        <YamlViewer title='sample result' codeText={sampleCM || ''} />
      </Box>
      <Box pad="medium">
        The actual ui will be added soon
      </Box>
    </Fragment>
  )
}

export default FileCM