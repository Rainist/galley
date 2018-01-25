import React, { Component, Fragment } from 'react';

const Toggler = (props) => {
  const shouldShow = props.show
  const children = shouldShow? props.children : null

  return (
    <Fragment>
      {children}
    </Fragment>
  )
}

export default Toggler