import db from "./pdb";

export async function getTiles(
    setUpperTiles,
    setLowerTiles,
    setUpperColored,
    setLowerColored,
    setLoading,
    block,
) {
    setLoading(true);
    let tempLowerTiles = [];
    let tempUpperTiles = [];
    const records = await db.collection("tiles").getFullList({
        $autoCancel: false,
        sort: "+row",
        filter: `block = "${block}"`,
    });
    for (let i = 0; i < records.length; i++) {
        if (records[i].section === "upper") {
            tempUpperTiles.push(records[i]);
            continue;
        }
        tempLowerTiles.push(records[i]);
    }
    setUpperTiles(tempUpperTiles);
    setLowerTiles(tempLowerTiles);

    tempLowerTiles = [];
    tempUpperTiles = [];
    const colored_records = await db.collection("colored_tiles").getFullList({
        $autoCancel: false,
        sort: "+row",
        filter: `block = "${block}"`,
    });
    for (let i = 0; i < colored_records.length; i++) {
        if (colored_records[i].section === "upper") {
            tempUpperTiles.push(colored_records[i]);
            continue;
        }
        tempLowerTiles.push(colored_records[i]);
    }
    setUpperColored(tempUpperTiles);
    setLowerColored(tempLowerTiles);
    setLoading(false);
}

export async function searchPavers(
    searchTerm,
    searchType,
    sectRender,
    setSearchResults,
    upperTiles,
    lowerTiles,
    setError,
) {
    if (sectRender === "upper") {
        if (upperTiles.length < 1) {
            return setError("Tiles Not Renderd in this section");
        }

        let results = [];
        switch (searchType.current.value) {
            case "name":
                results = upperTiles.filter((val) => {
                    return val.name
                        .toLocaleLowerCase()
                        .includes(searchTerm.toLocaleLowerCase());
                });
                setSearchResults(results);
                break;
            case "description":
                results = upperTiles.filter((val) => {
                    return val.description
                        .toLocaleLowerCase()
                        .includes(searchTerm.toLocaleLowerCase());
                });
                setSearchResults(results);
                break;
            default:
                setSearchResults(["Search Unrecognizable"]);
                break;
        }
    } else if (sectRender === "lower") {
        if (lowerTiles.length < 1) {
            return setError("Tiles Not Renderd in this section");
        }

        let results = [];
        switch (searchType.current.value) {
            case "name":
                results = lowerTiles.filter((val) => {
                    return val.name
                        .toLocaleLowerCase()
                        .includes(searchTerm.toLocaleLowerCase());
                });
                setSearchResults(results);
                break;
            case "description":
                results = lowerTiles.filter((val) => {
                    return val.description
                        .toLocaleLowerCase()
                        .includes(searchTerm.toLocaleLowerCase());
                });
                setSearchResults(results);
                break;
            default:
                setSearchResults(["Search Unrecognizable"]);
                break;
        }
    }
}

export async function locatePaverCoords(
    sectRender,
    paver,
    upperTiles,
    lowerTiles,
    setSearchRender,
) {
    let tileFound = false;
    switch (sectRender) {
        case "upper":
            let offset = 13;
            for (let i = 0; i < upperTiles.length; i++) {
                if (upperTiles[i].color) {
                    delete upperTiles[i].color;
                    delete upperTiles[i].direction;
                }
            }

            for (let i = 0; i < upperTiles.length; i++) {
                if (upperTiles[i].row === paver.row) {
                    if (upperTiles[i].col === paver.col) {
                        upperTiles[i]["color"] = "white";
                        tileFound = true;
                        continue;
                    }
                    if (upperTiles[i].col > paver.col) {
                        upperTiles[i]["color"] = "#6ee7b7";
                        upperTiles[i]["direction"] = "left";
                    }
                    if (upperTiles[i].col < paver.col) {
                        upperTiles[i]["color"] = "#5eead4";
                        upperTiles[i]["direction"] = "right";
                    }
                }
                if (upperTiles[i].col === offset) {
                    if (tileFound && upperTiles[i].row > paver.row) {
                        break;
                    }
                    upperTiles[i]["color"] = "#0ea5e9";
                    upperTiles[i]["direction"] = "up";
                }
            }
            setSearchRender(false);
            window.scrollTo();
            break;
        case "lower":
            for (let i = 0; i < lowerTiles.length; i++) {
                if (lowerTiles[i].color) {
                    delete lowerTiles[i].color;
                    delete lowerTiles[i].direction;
                }
            }

            for (let i = 0; i < lowerTiles.length; i++) {
                if (lowerTiles[i].row === paver.row) {
                    if (lowerTiles[i].col === paver.col) {
                        lowerTiles[i]["color"] = "white";
                        tileFound = true;
                        continue;
                    }
                    if (lowerTiles[i].col > paver.col) {
                        lowerTiles[i]["color"] = "#6ee7b7";
                        lowerTiles[i]["direction"] = "left";
                    }
                    if (lowerTiles[i].col < paver.col) {
                        lowerTiles[i]["color"] = "#5eead4";
                        lowerTiles[i]["direction"] = "right";
                    }
                }
                if (lowerTiles[i].col === 1) {
                    if (tileFound && lowerTiles[i].row > paver.row) {
                        break;
                    }
                    lowerTiles[i]["color"] = "#0ea5e9";
                    lowerTiles[i]["direction"] = "up";
                }
            }
            setSearchRender(false);
            break;
    }
}

export async function createTile(tile) {
    try {
        const record = await db.collection("tiles").create(tile);
        return { success: "Successfully Created Tile", record: record };
    } catch (error) {
        return error;
    }
}

export async function createTiles(newTiles) {
    try {
        for (let i = 0; i < newTiles.length; i++) {
            const record = await db.collection("tiles").create(newTiles[i]);
        }
        return { success: "Successfully Imported Excel Document" };
    } catch (error) {
        return { error: error };
    }
}

export async function deleteTile(tile) {
    try {
        await db.collection("tiles").delete(tile.id);
        return { success: "Successfully Deleted Tile" };
    } catch (error) {
        return { error: error };
    }
}

export async function updateTile(tile) {
    const data = {
        name: tile.name,
        description: tile.description,
        row: tile.row,
        col: tile.col,
        block: tile.block,
        section: tile.section,
    };

    try {
        await db.collection("tiles").update(tile.id, data);
        return { success: "Successfully Updated Tile" };
    } catch (error) {
        return { error: error };
    }
}

export async function updateUsers(users) {
    try {
        for (let i = 0; i < users.length; i++) {
            await db
                .collection("users")
                .update(users[i].id, { tileEditor: users[i].tileEditor });
        }
        return { success: "Successfully Updated Tile" };
    } catch (error) {
        return { error: error };
    }
}
