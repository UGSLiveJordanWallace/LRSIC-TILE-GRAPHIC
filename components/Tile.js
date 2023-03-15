import React from 'react'
import styles from '../styles/Tile.module.css';

const Tile = ({ name, description, row, col, color, ...rest }) => {
    return (
        <div {...rest} className={styles.tile} style={{background: color}}>
            <h3>{name}</h3>
        </div>
    )
}

export const EmptyTile = () => {
    return (
        <div className={styles.tile}>
        </div>
    )
}
export default Tile;
