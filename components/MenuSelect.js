import React from 'react'
import styles from '../styles/MenuSelect.module.css';

const MenuSelect = React.forwardRef(({ children, ...rest }, ref) => {
  return (
    <select className={styles.menu} {...rest} ref={ref}>
      {children}
    </select>
  )
})

MenuSelect.displayName = 'MenuSelect';

export const MenuOption = ({ value, children, ...rest }) => {
  return (
    <option value={value} {...rest}>{children}</option>
  )
}

export default MenuSelect
