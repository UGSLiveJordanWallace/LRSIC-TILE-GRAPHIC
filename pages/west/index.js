import React, { useEffect, useRef, useState } from "react";
import BlockLayout, {
    RenderDefaultDisplay,
} from "../../components/BlockLayout";
import SearchPage from "../../components/SearchPage";
import Button from "../../components/Button";
import {
    getTiles,
    searchPavers,
    locatePaverCoords,
} from "../../services/utils";

export default function WestBlockPage() {
    // Tiles
    const [sectRender, setSectRender] = useState("none");
    const [lowerTiles, setLowerTiles] = useState([]);
    const [upperTiles, setUpperTiles] = useState([]);
    const [coloredUpperTiles, setColoredUpperTiles] = useState([]);
    const [coloredLowerTiles, setColoredLowerTiles] = useState([]);
    // Tile Search
    const [searchResults, setSearchResults] = useState([]);
    const [searchRender, setSearchRender] = useState(false);
    // Tile Variable Ref
    const searchType = useRef();
    // Error/Success states
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

	const upperBlockRef = useRef();
	const lowerBlockRef = useRef();

    useEffect(() => {
        getTiles(
            setUpperTiles,
            setLowerTiles,
            setColoredUpperTiles,
            setColoredLowerTiles,
            setLoading,
            "west",
        );
    }, []);

    function handleSearch(e) {
        e.preventDefault();
        searchPavers(
            e.target.value,
            searchType,
            sectRender,
            setSearchResults,
            upperTiles,
            lowerTiles,
            setError,
        );
    }

    async function findPaverLocation(e, paver) {
        e.preventDefault();
        locatePaverCoords(
            sectRender,
            paver,
            upperTiles,
            lowerTiles,
            setSearchRender,
        );

		setTimeout(() => {
			if (sectRender === "upper") {
				upperBlockRef.current.scrollIntoView({
					behavior: "smooth",
					block: "end",
					inline: "nearest",
				})
			} else {
				lowerBlockRef.current.scrollIntoView({
					behavior: "smooth",
					block: "end",
					inline: "nearest",
				})
			}
		}, 50)
    }

    if (loading) {
        return <div className="loading"></div>;
    }

    return (
        <>
            {sectRender && sectRender === "none" && (
                <RenderDefaultDisplay setRender={setSectRender} />
            )}
            {sectRender && sectRender === "upper" && !searchRender && (
                <BlockLayout
                    tiles={upperTiles}
                    numOfRows={13}
                    numOfColumns={52}
                    coloredTiles={coloredUpperTiles}
					ref={upperBlockRef}
                />
            )}
            {sectRender && sectRender === "lower" && !searchRender && (
                <BlockLayout
                    tiles={lowerTiles}
                    numOfRows={35}
                    numOfColumns={27}
                    coloredTiles={coloredLowerTiles}
					ref={lowerBlockRef}
                />
            )}

            {searchRender && (
                <SearchPage
                    searchType={searchType}
                    searchResults={searchResults}
                    handleSearch={handleSearch}
                    findPaverLocation={findPaverLocation}
					error={error}
                />
            )}
            {error && <p>Something Went Wrong: {error}!!</p>}

            <div>
                {sectRender && sectRender !== "none" && (
                    <Button
                        onClick={() => setSearchRender(!searchRender)}
						className="fixed left-5 bottom-5 rounded p-3 bg-white shadow-xl border border-neutral-900 text-3xl"
                    >
                        {searchRender ? "Close" : "Find"}
                    </Button>
                )}
                {sectRender && sectRender !== "none" && !searchRender && (
                    <Button
                        onClick={() => setSectRender("none")}
						className="fixed right-5 bottom-5 rounded p-3 bg-white shadow-xl border border-neutral-900 text-3xl"
                    >
                        Back
                    </Button>
                )}
            </div>
        </>
    );
}
