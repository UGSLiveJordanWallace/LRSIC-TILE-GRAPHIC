export default function ControlPanelPage() {
    return (
        <div className="flex flex-col w-full h-screen">
            <h1 className="text-bold text-center text-5xl m-5">
                Control Panel
            </h1>
            <div className="block p-8 w-full h-1/2">
                <p className="inline-block w-full text-xl text-center">
                    The Control Panel is where all the tiles are managed
                    (updated, created, deleted). Since there are so many moving
                    parts the tutorial for this tool is broken up into 2 modules
                    (Menu, Upload).
                </p>
                <p className="inline-block w-full text-center mt-10">
                    Control Panel Main Page
                </p>
                <div className="w-1/2 h-full m-auto">
                    <nav className="flex justify-evenly border border-black w-full shadow-md text-xl overflow-auto mobile:text-5xl">
                        <button className="bg-none flex-auto shrink-0 p-4">
                            north
                        </button>
                        <button className="bg-none flex-auto shrink-0 p-4">
                            south
                        </button>
                        <button className="bg-none flex-auto shrink-0 p-4">
                            east
                        </button>
                        <button className="bg-none flex-auto shrink-0 p-4">
                            west
                        </button>
                    </nav>
                    <div className="grid grid-cols-3 h-full overflow-auto">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
                            (val, key) => {
                                return (
                                    <div
                                        style={{ backgroundColor: "#dc2626" }}
                                        className={
                                            "inline-block overflow-hidden w-full h-full border border-black text-center font-bold text-xs mobile:text-base"
                                        }
                                        key={key}
                                    >
                                        <h3>{val}</h3>
                                    </div>
                                );
                            },
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
