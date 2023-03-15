import React from 'react'
import styles from '../styles/MenuSelect.module.css';

const MenuSelect = React.forwardRef(({ children }, ref) => {
  return (
    <select className={styles.menu} ref={ref}>
      {children}
    </select>
  )
})

MenuSelect.displayName = 'MenuSelect';

export const MenuOption = ({ value, children }) => {
  return (
    <option value={value}>{children}</option>
  )
}

export default MenuSelect
