import React from 'react'
import styles from '../styles/Input.module.css'

const Input = React.forwardRef(({ ...rest }, ref) => {
  return (
    <input className={styles.input} {...rest} ref={ref}/>
  )
})

Input.displayName = "Input";

export default Input;
