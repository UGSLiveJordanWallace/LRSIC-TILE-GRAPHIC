import Link from 'next/link';
import React from 'react'
import styles from '../styles/Card.module.css';

const card = {
    border: "3px solid black",
    borderRadius: "4px",
    boxShadow: "2px 2px 4px black",
    margin: "auto auto",
}

const Card = ({ children }) => {
    return (
        <div style={card}>
            {children}
        </div>
    )
}

const cardbody = {
    display: "flex",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
}

export const CardBody = ({ children }) => {
    return (
        <div style={cardbody}>
            {children}
        </div>
    )
}

const cardlink = {
    display: "block",
    fontSize: "3em",
    padding: "30px",
    border: "3px solid black",
}

export const CardLink = ({ children, href }) => {
    return (
        <Link href={href} style={cardlink}>{children}</Link>
    )
}

const cardgrid = {
    display: "grid",
    gridTemplateColumns: "33% 33% 33%",
    width: "100%",
    height: "100vh",
}

export const CardGrid = ({ children }) => {
    return (
        <div style={cardgrid}>
            {children}
        </div>
    )
}

export default Card;
