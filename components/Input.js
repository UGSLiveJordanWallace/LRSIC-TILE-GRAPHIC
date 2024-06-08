import React from 'react'

const Input = React.forwardRef(({ ...rest }, ref) => {
  return (
    <input {...rest} ref={ref}/>
  )
})

Input.displayName = "Input";

export default Input;
