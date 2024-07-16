import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Card, { CardBody } from "../../components/Card";
import MenuSelect, { MenuOption } from "../../components/MenuSelect";
import db from "../../services/pdb";

export default function SearchAllPage() {
	const searchType = useRef();
	const [searchResults, setSearchResults] = useState([]);
	const [error, setError] = useState();
	const [tiles, setTiles] = useState([]);

	useEffect(() => {
		async function getTiles() {
			const results = await db.collection('tiles').getFullList({
				$autoCancel: false,
				sort: '-created'
			})
			setTiles(results);
		}
		getTiles()
	}, [])
	
	async function handleSearch(e) {
		e.preventDefault()

		setError()

		const searchTerm = e.target.value
		const results = tiles.filter((item) => {
			return item.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
		})
		if (results.length < 1) {
			setError("No Tiles Found")
			setSearchResults([])
			return
		} 
		setSearchResults(results)
	}

	return (
        <div className="flex flex-col items-center w-full h-screen text-center bg-stone-50 overflow-hidden">
            <h1 className="flex-initial text-5xl">Search Tiles</h1>
            <MenuSelect
                ref={searchType}
            >
                <MenuOption value="name">Tile Name</MenuOption>
                <MenuOption value="description">Tile Description</MenuOption>
            </MenuSelect>
            <input
                className="flex-initial w-1/2 mt-2 m-auto text-lg border border-neutral-900 rounded shadow-lg p-2"
                onChange={handleSearch}
                placeholder="What Are You Looking For?"
            />
            {error && (
                <p className="block w-11/12 m-auto text-xl text-red-900 p-6 bg-red-200 border border-black rounded">
                    Something Went Wrong: {error}!!
                </p>
            )}
            <div className="flex-auto m-auto overflow-y-auto mobile:w-11/12 desktop:w-5/6 wide:w-2/5">
                {searchResults.length > 0 &&
                    searchResults.map((val, key) => {
                        return (
                            <Card key={key}>
                                <CardBody>
                                    <h4 className="text-4xl">{val.name}</h4>
                                    <h5 className="text-lg">
                                        {val.description}
                                    </h5>
                                    <h5 className="text-lg">
                                        Row: {val.row} Column: {val.col}
                                    </h5>
									<h5 className="text-lg">
										Block: {val.block}
									</h5>
                                    <Link
										href={`/${val.block}?row=${val.row}&col=${val.col}&section=${val.section}`}
										className="inline-block text-center p-2 m-3 border border-black rounded text-lg mobile:text-xl wide:text-5xl"
                                    >
                                        Locate
                                    </Link>
                                </CardBody>
                            </Card>
                        );
                    })}
            </div>
        </div>
	)
}
