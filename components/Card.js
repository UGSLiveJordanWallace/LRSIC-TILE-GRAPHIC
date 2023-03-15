import Link from 'next/link';
import React from 'react'
import styles from '../styles/Card.module.css';

const Card = ({ children }) => {
    return (
        <div className={styles.card}>
            {children}
        </div>
    )
}

export const CardBody = ({ children }) => {
    return (
        <div className={styles.cardbody}>
            {children}
        </div>
    )
}

export const CardLink = ({ children, href }) => {
    return (
        <Link href={href} className={styles.cardlink}>{children}</Link>
    )
}

export const CardGrid = ({ children }) => {
    return (
        <div className={styles.cardgrid}>
            {children}
        </div>
    )
}

export default Card;
