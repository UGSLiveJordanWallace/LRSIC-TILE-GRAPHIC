import React from 'react'
import styles from '../styles/Button.module.css';

const Button = ({ children, onClick, ...rest }) => {
  return (
    <button onClick={onClick} className={styles.button} {...rest}>
      {children}
    </button>
  )
}

export default Button
