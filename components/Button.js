"use client";
import React from "react";

const Button = ({ children, onClick, ...rest }) => {
    return (
        <>
            <button
                className="text-center p-2 m-3 border border-black rounded text-lg mobile:p-6 mobile:text-xl wide:text-5xl hover:bg-red-700 transition duration-300 ease-in-out"
                onClick={onClick}
                {...rest}
            >
                {children}
            </button>
        </>
    );
};

export default Button;
