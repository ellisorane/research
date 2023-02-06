import React from 'react'

import classes from './Backdrop.module.scss'

function Backdrop({ click }) {
  return (
    <div className={ classes.backdrop } onClick={ click }></div>
  )
}

export default Backdrop