import React, { useEffect, useRef, useState } from 'react'
import BlockLayout, { RenderDefaultDisplay } from '../../components/BlockLayout'
import SearchPage from '../../components/SearchPage';
import Button from '../../components/Button';
import { getTiles, searchPavers, locatePaverCoords } from '../../services/utils';

export default function SouthBlockPage() {
	// Tiles
	const [sectRender, setSectRender] = useState("none");
	const [lowerTiles, setLowerTiles] = useState([]);
	// Tile Search
	const [searchResults, setSearchResults] = useState([]);
	const [searchRender, setSearchRender] = useState(false);
	// Tile Variable Ref
	const searchType = useRef();
	// Error/Success states
	const [error, setError] = useState("");

	useEffect(() => {
		getTiles([], setLowerTiles, "south");
	}, [])

	function handleSearch(e) {
		e.preventDefault();
		searchPavers(e.target.value, searchType, sectRender, setSearchResults, [], lowerTiles, setError);
	}

	async function findPaverLocation(e, paver) {
		e.preventDefault();
		locatePaverCoords(sectRender, paver, [], lowerTiles, setSearchRender);
	}

	return (
		<>
			{sectRender && sectRender === "none" && <RenderDefaultDisplay setRender={setSectRender}/>}
			{sectRender && sectRender === "lower" && !searchRender && <BlockLayout tiles={lowerTiles} numOfRows={35} numOfColumns={27}/>}

			{searchRender && <SearchPage searchType={searchType} searchResults={searchResults} handleSearch={handleSearch} findPaverLocation={findPaverLocation} />}
			{error && <p>Something Went Wrong: {error}!!</p>}

			<div>
				{sectRender && sectRender !== "none" && <Button onClick={() => setSearchRender(!searchRender)} style={{position: "fixed", left: "10px", bottom: "10px", background: "white", fontSize: "3.5em"}}>{searchRender ? "Close" : "Find"}</Button>}
				{sectRender && sectRender !== "none" && !searchRender && <Button onClick={() => setSectRender("none")} style={{position: "fixed", right: "10px", bottom: "10px", background: "white", fontSize: "3.5em"}}>Back</Button>}
			</div>
		</>
	)
}
