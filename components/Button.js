"use client";
import React from 'react'

const Button = ({ children, onClick, ...rest }) => {
  return (
    <>
      <button className="text-lg bg-slate-300 p-1.5 m-1.5 antialiased min-w-1" onClick={onClick} {...rest}>
        {children}
      </button>
    </>
  )
}

export default Button
