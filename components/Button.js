"use client";
import React from 'react'

const Button = ({ children, onClick, ...rest }) => {
  return (
    <>
      {<button onClick={onClick} styles={button_small} {...rest}>
        {children}
      </button>}
    </>
  )
}

export default Button
