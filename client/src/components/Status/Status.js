import React from 'react'

import classes from './Status.module.scss'

const Status = ( props ) => {
  return (
    <div className={ classes.status }>{ props.children }</div>
  )
}

export default Status