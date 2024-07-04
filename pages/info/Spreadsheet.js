export default function SpreadsheetPage() {
    return (
        <div className="flex flex-col justify-center w-full">
            <h1 className="text-bold text-center text-5xl m-5">Spread Sheet</h1>
            <div className="block p-8 w-full">
                <p className="inline-block w-full text-xl text-center">
                    The spread sheet works similarly to an excel spreadsheet
                    sheet with checks for duplicates built into the tool (this
                    is important for maintaining the block layouts when)
                </p>
                <p className="inline-block w-full text-center mt-10">
                    The spread sheet
                </p>
                <div className="border border-black w-1/2 m-auto overflow-auto">
                    {[1, 2, 3, 4, 5, 6, 7].map((_, key) => {
                        return (
                            <form className="flex flex-row" key={key}>
                                <input
                                    name="block"
                                    type="text"
                                    placeholder="block"
                                    className="border-r border-black border-b p-1 bg-transparent"
                                    readOnly
                                />
                                <input
                                    name="section"
                                    placeholder="section"
                                    className="border-r border-black border-b p-1 bg-transparent"
                                    readOnly
                                />
                                <input
                                    name="row"
                                    type="number"
                                    placeholder="row"
                                    className="border-r border-black border-b p-1 bg-transparent"
                                    readOnly
                                />
                                <input
                                    name="col"
                                    type="number"
                                    placeholder="col"
                                    readOnly
                                    className="border-r border-black border-b p-1 bg-transparent"
                                />
                                <input
                                    name="name"
                                    placeholder="name"
                                    className="border-r border-black border-b p-1 bg-transparent"
                                    readOnly
                                />
                                <input
                                    name="description"
                                    placeholder="description"
                                    className="border-r border-black border-b p-1 bg-transparent"
                                    readOnly
                                />
                                <button className="flex flex-row items-center justify-evenly p-1 bg-green-400 border-r border-b border-black">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="inline-block m-1 size-8"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 4.5v15m7.5-7.5h-15"
                                        />
                                    </svg>
                                    <p className="inline-block">or</p>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="inline-block m-1 size-8"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                        />
                                    </svg>
                                </button>
                                <button className="p-1 border-b border-black bg-red-500">
                                    Remove
                                </button>
                            </form>
                        );
                    })}
                </div>
                <p className="inline-block w-full text-xl text-center mt-10">
                    Each row represents a unique tile. Each tile has to be
                    located at a unique (row, col) position and cannot overlap
                    with any of the tiles already loaded in the spreadsheet.
                </p>
                <p className="inline-block w-full text-xl text-center mt-10">
                    The
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="inline-block m-1 size-8"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                        />
                    </svg>
                    <p className="inline-block">or</p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="inline-block m-1 size-8"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                    </svg>
                    button adds or edits a tile. For new tiles, the plus icon
                    would appear. This means that you can add the tile. For
                    tiles that already exist, the pencil icon would appear. This
                    means that you can submit changes made on a specific tile.
                </p>
                <p className="inline-block w-full text-xl text-center">
                    The <strong className="text-3xl text-bold">Remove</strong>{" "}
                    button{" "}
                    <strong className="text-bold text-3xl text-red-500">
                        PERMANENTLY
                    </strong>{" "}
                    deletes the tile (block, name, section, row, col,
                    description).
                </p>
            </div>
        </div>
    );
}
