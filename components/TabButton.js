import clsx from "clsx";

export default function TabButton({ tab, setTab, children }) {
    return (
        <button
            onClick={(e) => setTab(children)}
            className={clsx(
                "bg-none flex-1 p-4 mobile:p-6",
                tab === children && "bg-slate-300 border-b-2 border-black",
                tab !== children && "border-none",
            )}
        >
            {children}
        </button>
    );
}
