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
import { useSearchParams } from "next/navigation";

export default function EastBlockPage() {
    // Tiles
    const [sectRender, setSectRender] = useState("none");
    const [lowerTiles, setLowerTiles] = useState([]);
    const [upperTiles, setUpperTiles] = useState([]);
    const [coloredUpperTiles, setColoredUpperTiles] = useState([]);
    const [coloredLowerTiles, setColoredLowerTiles] = useState([]);
	const [tilesRendered, setTilesRendered] = useState(false)
    // Tile Search
    const [searchResults, setSearchResults] = useState([]);
    const [searchRender, setSearchRender] = useState(false);
    // Tile Variable Ref
    const searchType = useRef();
    // Error/Success states
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const upperBlockRef = useRef();
    const lowerBlockRef = useRef();

	const searchParams = useSearchParams();

	useEffect(() => {
		if (tilesRendered) {
			if (searchParams.has("row") && searchParams.has("col") && searchParams.has('section')) {
				setSectRender(searchParams.get("section"))
				setSearchRender(false)
				const paver = {
					row: JSON.parse(searchParams.get("row")),
					col: JSON.parse(searchParams.get("col"))
				}
				locatePaverCoords(
					searchParams.get("section"),
					paver,
					upperTiles,
					lowerTiles,
					setSearchRender,
				)
				setTimeout(() => {
					if (searchParams.get("section") === "upper") {
						upperBlockRef.current.scrollIntoView({
							behavior: "smooth",
							block: "end",
							inline: "nearest",
						});
					} else {
						lowerBlockRef.current.scrollIntoView({
							behavior: "smooth",
							block: "end",
							inline: "nearest",
						});
					}
				}, 100)
			}
		}
	}, [tilesRendered])

    useEffect(() => {
		async function getTilesAndSearchParams() {
			await getTiles(
				setUpperTiles,
				setLowerTiles,
				setColoredUpperTiles,
				setColoredLowerTiles,
				setLoading,
				"east",
			);
			setTilesRendered(true)
		}
		getTilesAndSearchParams();
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
                });
            } else {
                lowerBlockRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                    inline: "nearest",
                });
            }
        }, 50);
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
                />
            )}
            {error && <p>Something Went Wrong: {error}!!</p>}

            <div>
                {sectRender && sectRender !== "none" && (
                    <Button
                        onClick={() => setSearchRender(!searchRender)}
                        style={{
                            position: "fixed",
                            left: "10px",
                            bottom: "10px",
                            background: "white",
                            fontSize: "3.5em",
                        }}
                    >
                        {searchRender ? "Close" : "Find"}
                    </Button>
                )}
                {sectRender && sectRender !== "none" && !searchRender && (
                    <Button
                        onClick={() => setSectRender("none")}
                        style={{
                            position: "fixed",
                            right: "10px",
                            bottom: "10px",
                            background: "white",
                            fontSize: "3.5em",
                        }}
                    >
                        Back
                    </Button>
                )}
            </div>
        </>
    );
}
