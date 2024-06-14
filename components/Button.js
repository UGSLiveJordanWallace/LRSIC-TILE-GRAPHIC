"use client";
import React from "react";

const Button = ({ children, onClick, ...rest }) => {
    return (
        <>
            <button
                className="text-3xl text-center p-6 m-3 border border-black rounded hover:bg-red-700 transition duration-300 ease-in-out"
                onClick={onClick}
                {...rest}
            >
                {children}
            </button>
        </>
    );
};

export default Button;
