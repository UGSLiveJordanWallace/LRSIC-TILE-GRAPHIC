import React, { useEffect, useRef, useState } from "react";
import BlockLayout from "../../components/BlockLayout";
import SearchPage from "../../components/SearchPage";
import Button from "../../components/Button";
import {
    getTiles,
    searchPavers,
    locatePaverCoords,
} from "../../services/utils";

export default function NorthBlockPage() {
    // Tiles
    const [lowerTiles, setLowerTiles] = useState([]);
    // Tile Search
    const [searchResults, setSearchResults] = useState([]);
    const [searchRender, setSearchRender] = useState(false);
    // Tile Variable Ref
    const searchType = useRef();
    // Error/Success states
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTiles(() => {}, setLowerTiles, setLoading, "north");
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
        locatePaverCoords("lower", paver, [], lowerTiles, setSearchRender);
    }

    if (loading) {
        return <div className="loading"></div>;
    }

    return (
        <>
            {!searchRender && lowerTiles.length > 0 ? (
                <BlockLayout
                    tiles={lowerTiles}
                    numOfRows={35}
                    numOfColumns={27}
                />
            ) : (
                <BlockLayout tiles={[]} numOfRows={35} numOfColumns={27} />
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
            </div>
        </>
    );
}
