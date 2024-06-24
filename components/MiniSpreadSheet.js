export default function MiniSpreadSheet({
    newTiles,
    sectionTiles,
    handleAdd,
    handleEdit,
    handleDelete,
    handleChange,
}) {
    return (
        <div className="overflow-auto border-t border-black w-full">
            {newTiles.map((tile, key) => {
                return (
                    <form
                        className="flex flex-row w-full mobile:text-xl border-b border-black hover:bg-zinc-200"
                        key={key}
                        onSubmit={(e) => handleAdd(e, tile)}
                    >
                        <input
                            name="block"
                            type="text"
                            value={tile.block}
                            onChange={(e) => handleChange(e, key)}
                            className="w-16 mobile:w-1/12 border-r border-black p-1 bg-transparent"
                        />
                        <input
                            name="section"
                            className="w-16 mobile:w-1/12 border-r border-black p-1 bg-transparent"
                            value={tile.section}
                            onChange={(e) => handleChange(e, key)}
                        />
                        <input
                            name="row"
                            type="number"
                            value={tile.row}
                            onChange={(e) => handleChange(e, key)}
                            className="w-7 mobile:w-1/12 border-r border-black p-1 bg-transparent"
                        />
                        <input
                            name="col"
                            type="number"
                            value={tile.col}
                            onChange={(e) => handleChange(e, key)}
                            className="w-7 mobile:w-1/12 border-r border-black p-1 bg-transparent"
                        />
                        <input
                            name="name"
                            value={tile.name}
                            onChange={(e) => handleChange(e, key)}
                            className="w-44 mobile:w-1/5 border-r border-black p-1 bg-transparent"
                        />
                        <input
                            name="description"
                            value={tile.description}
                            onChange={(e) => handleChange(e, key)}
                            className="w-44 mobile:w-1/2 border-r border-black p-1 bg-transparent"
                        />
                        <button
                            className="p-1 mobile:p-3 bg-green-400 border-r border-black"
                            type="submit"
                        >
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
							</svg>
                        </button>
                        <button
                            className="p-1 mobile:p-3 bg-red-500"
                            onClick={(e) => handleDelete(e, tile, "new", key)}
                        >
                            Remove
                        </button>
                    </form>
                );
            })}
			<hr className="w-full border border-double border-grey-900 mt-5 mb-5"/>
            {sectionTiles.map((tile, key) => {
                return (
                    <form
                        className="flex border-t border-black flex-row w-full mobile:text-xl border-b border-black hover:bg-zinc-200"
                        key={key}
                        onSubmit={(e) => handleEdit(e, tile.id, upperTiles)}
                    >
                        <input
                            name="block"
                            type="text"
                            defaultValue={tile.block}
                            className="w-16 mobile:w-1/12 border-r border-black p-1 bg-transparent"
                        />
                        <input
                            name="section"
                            className="w-16 mobile:w-1/12 border-r border-black p-1 bg-transparent"
                            defaultValue={tile.section}
                        />
                        <input
                            name="row"
                            type="number"
                            defaultValue={tile.row}
                            className="w-7 mobile:w-1/12 border-r border-black p-1 bg-transparent"
                        />
                        <input
                            name="col"
                            type="number"
                            defaultValue={tile.col}
                            className="w-7 mobile:w-1/12 border-r border-black p-1 bg-transparent"
                        />
                        <input
                            name="name"
                            defaultValue={tile.name}
                            className="w-44 mobile:w-1/5 border-r border-black p-1 bg-transparent"
                        />
                        <input
                            name="description"
                            defaultValue={tile.description}
                            className="w-44 mobile:w-1/2 border-r border-black p-1 bg-transparent"
                        />
                        <button
                            className="p-1 mobile:p-3 bg-green-400 border-r border-black"
                            type="submit"
                        >
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
							</svg>
                        </button>
                        <button
                            className="p-1 mobile:p-3 bg-red-500"
                            onClick={(e) => handleDelete(e, tile, "old")}
                        >
                            Remove
                        </button>
                    </form>
                );
            })}
        </div>
    );
}
