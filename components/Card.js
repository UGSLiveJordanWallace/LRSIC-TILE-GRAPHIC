import Link from "next/link";
import React from "react";

const Card = ({ children }) => {
    return <div className="border border-black rounded-lg m-2">{children}</div>;
};

export const CardBody = ({ children }) => {
    return <div className="text-center">{children}</div>;
};

export const CardLink = ({ children, href }) => {
    return (
        <Link
            className="block w-full h-full p-3 mobile:p-6 rounded-lg hover:bg-red-700 transition duration-300 ease-in-out"
            href={href}
        >
            {children}
        </Link>
    );
};

export default Card;
