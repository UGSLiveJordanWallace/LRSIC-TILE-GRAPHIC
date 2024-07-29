import clsx from "clsx";
import { useState } from "react";

export default function SideNav({ view, setView, isUser }) {
    return (
        <div className="flex flex-col bg-neutral-50 w-full m-auto h-screen bg-white items-center">
            <NavButton onClick={(e) => setView("layout")} view={view}>
                layout
            </NavButton>
            <NavButton onClick={(e) => setView("find paver")} view={view}>
                find paver
            </NavButton>
            {isUser && (
                <>
                    {" "}
                    <NavDropDown
                        items={["menu", "spreadsheet", "upload"]}
                        view={view}
                        setView={setView}
                        onClick={(e) => setView("control panel")}
                    >
                        control panel
                    </NavDropDown>{" "}
                </>
            )}
        </div>
    );
}

function NavButton({ children, onClick, view, ...props }) {
    return (
        <button
            onClick={onClick}
            {...props}
            className={clsx(
                "p-5 w-full border-t-2 shadow hover text-center overflow-x-auto",
                view === children && "bg-stone-200",
            )}
        >
            {children}
        </button>
    );
}

function NavDropDown({ children, items, setView, onClick, view }) {
    const [show, setShow] = useState(false);

    return (
        <div className="block text-center w-full">
            <button
                view={view}
                className={clsx(
                    "p-5 w-full border-t-2 shadow hover text-center",
                    view === children && "bg-stone-200",
                )}
                onClick={(e) => {
                    setShow(!show);
                    onClick();
                }}
            >
                {children}
                {show ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="inline-block size-5 align-middle ml-2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 15.75 7.5-7.5 7.5 7.5"
                        />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="inline-block size-5 align-middle ml-2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m19.5 8.25-7.5 7.5-7.5-7.5"
                        />
                    </svg>
                )}
            </button>
            <div className={clsx(!show && "hidden", show && "block")}>
                {items.map((val, key) => {
                    return (
                        <NavButton
                            view={view}
                            key={key}
                            onClick={(e) => setView(val)}
                        >
                            {val}
                        </NavButton>
                    );
                })}
            </div>
        </div>
    );
}
