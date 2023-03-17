"use client";
import React from 'react'

const button_small = {
  display: "block",
  textAlign: "center",
  borderRadius: "5px",
  backgroundColor: "rgba(205, 12, 14)",
  fontSize: "2.3em",
}

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
