import React, { useEffect, useRef, useState } from "react";
import BlockLayout from "../../components/BlockLayout";
import SearchPage from "../../components/SearchPage";
import Button from "../../components/Button";
import {
    getTiles,
    searchPavers,
    locatePaverCoords,
} from "../../services/utils";
import clsx from "clsx";

export default function NorthBlockPage() {
    // Tiles
    const [lowerTiles, setLowerTiles] = useState([]);
    const [coloredLowerTiles, setColoredLowerTiles] = useState([]);
    // Tile Search
    const [searchResults, setSearchResults] = useState([]);
    const [searchRender, setSearchRender] = useState(false);
    // Tile Variable Ref
    const searchType = useRef();
    // Error/Success states
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const blockRef = useRef();

    useEffect(() => {
        getTiles(
            () => {},
            setLowerTiles,
            () => {},
            setColoredLowerTiles,
            setLoading,
            "north",
        );
    }, []);

    function handleSearch(e) {
        e.preventDefault();
        searchPavers(
            e.target.value,
            searchType,
            "lower",
            setSearchResults,
            [],
            lowerTiles,
            setError,
        );
    }

    async function findPaverLocation(e, paver) {
        e.preventDefault();
        await locatePaverCoords(
            "lower",
            paver,
            [],
            lowerTiles,
            setSearchRender,
        );
        setTimeout(() => {
            blockRef.current.scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest",
            });
        }, 50);
    }

    if (loading) {
        return <div className="loading"></div>;
    }

    return (
        <div className={"block h-screen relative"}>
            {!searchRender && lowerTiles.length > 0 && (
                <BlockLayout
                    tiles={lowerTiles}
                    numOfRows={35}
                    numOfColumns={27}
                    coloredTiles={coloredLowerTiles}
                    ref={blockRef}
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
                <Button
                    onClick={() => setSearchRender(!searchRender)}
                    className="fixed left-5 bottom-5 rounded p-3 bg-white shadow-xl border border-neutral-900 text-3xl"
                >
                    {searchRender ? "Close" : "Find"}
                </Button>
            </div>
        </div>
    );
}
