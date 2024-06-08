import Link from 'next/link';
import React from 'react'

const Card = ({ children }) => {
    return (
        <div>
            {children}
        </div>
    )
}

export const CardBody = ({ children }) => {
    return (
        <div>
            {children}
        </div>
    )
}

export const CardLink = ({ children, href }) => {
    return (
        <Link href={href}>{children}</Link>
    )
}

export const CardGrid = ({ children }) => {
    return (
        <div>
            {children}
        </div>
    )
}

export default Card;
