import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { logout } from "../../services/auth";
import { ControlPanelBlockLayout } from "../../components/BlockLayout";
import db from "../../services/pdb";
import {
    createTile,
    createTiles,
    deleteTile,
    getTiles,
    updateTile,
} from "../../services/utils";
import Button from "../../components/Button";
import Link from "next/link";
import TabButton from "../../components/TabButton";
import MiniSpreadSheet from "../../components/MiniSpreadSheet";
import { getTokenPayload } from "pocketbase";

export default function ProtectedControlPanelPage() {
    const [currentUser, setCurrentUser] = useState({});
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [tab, setTab] = useState("west");
    const [upperTiles, setUpperTiles] = useState([]);
    const [lowerTiles, setLowerTiles] = useState([]);
    const [coloredUpperTiles, setColoredUpperTiles] = useState([]);
    const [coloredLowerTiles, setColoredLowerTiles] = useState([]);
    const [showUpper, setShowUpper] = useState(false);
    const [showEdit, setShowEdit] = useState(true);
    const [newTiles, setNewTiles] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {
        function getUser() {
            const data = db.authStore.model;
            if (
                data &&
                (getTokenPayload(db.authStore.token).type === "admin" ||
                    data.tileEditor === true)
            ) {
                setCurrentUser(data);
                setLoading(false);
                return;
            }
            return router.replace("/auth/login");
        }
        getUser();
    }, [router]);

    useEffect(() => {
        async function getData() {
            setShowEdit(true);
            setShowUpper(false);
            setError();
            await getTiles(
                setUpperTiles,
                setLowerTiles,
                setColoredUpperTiles,
                setColoredLowerTiles,
                setLoading,
                tab,
            );
        }
        getData();
    }, [tab]);

    function handleLogout(e) {
        e.preventDefault();

        try {
            logout();
            router.push("/auth/login");
        } catch (error) {
            console.error(error);
        }
    }

    async function handleEdit(e, id, tiles) {
        e.preventDefault();

        const fd = new FormData(e.currentTarget);
        const tile = {
            id: id,
            block: fd.get("block"),
            section: fd.get("section"),
            row: JSON.parse(fd.get("row")),
            col: JSON.parse(fd.get("col")),
            name: fd.get("name"),
            description: fd.get("description"),
        };
        for (let i = 0; i < tiles.length; i++) {
            if (
                tile.col === tiles[i].col &&
                tile.row === tiles[i].row &&
                tile.id !== tiles[i].id
            ) {
                return setError("Collision at ", tiles[i], "with ", tile);
            }
        }
        setError();

        const response = await updateTile(tile);
        console.log(response);
        router.refresh();
    }

    function handleAppendNewTile(e) {
        e.preventDefault();
        if ((tab === "south" || tab === "north") && showUpper) {
            return setError(
                `Cannot Add Tile Where block = ${tab} and section = Upper`,
            );
        }

        setNewTiles([
            ...newTiles,
            {
                id: newTiles.length,
                block: tab,
                section: showUpper ? "upper" : "lower",
                row: 1,
                col: 1,
                name: "block name " + newTiles.length,
                description: "block description",
            },
        ]);
    }

    async function handleAdd(e) {
        e.preventDefault();

        const fd = new FormData(e.currentTarget);
        const tile = {
            block: fd.get("block"),
            section: fd.get("section"),
            row: JSON.parse(fd.get("row")),
            col: JSON.parse(fd.get("col")),
            name: fd.get("name"),
            description: fd.get("description"),
        };
        let tiles = [];

        if (tile.section === "upper") {
            tiles = upperTiles;
        } else {
            tiles = lowerTiles;
        }

        for (let i = 0; i < tiles.length; i++) {
            if (
                tile.col === tiles[i].col &&
                tile.row === tiles[i].row &&
                tile.id !== tiles[i].id
            ) {
                return setError(
                    `Collision at Row ${tiles[i].row} Col ${tiles[i].col} with ${tiles[i].name}`,
                );
            }
        }

        var response = await createTile(tile);
        router.refresh();
    }

    async function handleAddAll(e) {
        e.preventDefault();
        let confirmedTiles = [];

        setError();
        let isError = false;
        for (let i = 0; i < newTiles.length; i++) {
            if (!check(newTiles[i])) {
                isError = true;
                continue;
            }
            const tile = {
                block: newTiles[i].block,
                section: newTiles[i].section,
                row: JSON.parse(newTiles[i].row),
                col: JSON.parse(newTiles[i].col),
                name: newTiles[i].name,
                description: newTiles[i].description,
            };
            confirmedTiles.push(tile);
        }

        if (!isError) {
            const response = await createTiles(confirmedTiles);
            router.refresh();
        }
    }

    function check(tile) {
        let tiles = [];
        if (tile.section === "upper") {
            tiles = upperTiles;
        } else {
            tiles = lowerTiles;
        }

        for (let i = 0; i < tiles.length; i++) {
            if (
                JSON.parse(tile.col) === tiles[i].col &&
                JSON.parse(tile.row) === tiles[i].row &&
                tile.block === tiles[i].block &&
                tile.id !== tiles[i].id
            ) {
                setError(
                    `Collision at Row ${tiles[i].row} Col ${tiles[i].col} (${tile.name}) collides with (${tiles[i].name})`,
                );

                return false;
            }
            if (tile.block !== tiles[i].block) {
                return false;
            }
        }

        for (let i = 0; i < newTiles.length; i++) {
            if (
                newTiles[i].row === tile.row &&
                newTiles[i].col === tile.col &&
                newTiles[i].id !== tile.id
            ) {
                setError(
                    `Found Duplicate in New Tiles row ${tile.row} col ${tile.col} (${tile.name}) collides with (${newTiles[i].name})`,
                );
                return false;
            }
        }

        return true;
    }

    async function handleDelete(e, tile, type, idx = 0) {
        e.preventDefault();
        if (type === "old") {
            const response = await deleteTile(tile);
            router.refresh();
            return;
        }

        newTiles.splice(idx, 1);
        setNewTiles([...newTiles]);
    }

    function handleChange(e, idx) {
        const { name, value } = e.target;
        newTiles[idx][name] = value;
        setNewTiles([...newTiles]);
    }

    if (loading) {
        return <div className="loading"></div>;
    }

    return (
        <div className="h-screen">
            <nav className="flex w-full h-15 shadow-md text-xl mobile:text-5xl">
                <TabButton tab={tab} setTab={setTab}>
                    north
                </TabButton>
                <TabButton tab={tab} setTab={setTab}>
                    south
                </TabButton>
                <TabButton tab={tab} setTab={setTab}>
                    east
                </TabButton>
                <TabButton tab={tab} setTab={setTab}>
                    west
                </TabButton>
            </nav>
            <div className="w-full flex flex-row justify-center items-center top-0">
                {upperTiles.length > 0 && (
                    <div>
                        <Button onClick={() => setShowUpper(true)}>
                            Upper
                        </Button>
                        <Button onClick={() => setShowUpper(false)}>
                            Lower
                        </Button>
                    </div>
                )}
                <Button onClick={() => setShowEdit(!showEdit)}>
                    {!showEdit ? "Edit" : "Preview"}
                </Button>
                {showEdit && (
                    <>
                        <Button onClick={handleAppendNewTile}>Add Tile</Button>
                        {newTiles.length > 1 && (
                            <Button onClick={handleAddAll}>Add All</Button>
                        )}
                        <Link
                            className="hidden m-3 text-xl border border-black rounded bg-green-300 desktop:block desktop:p-6 desktop:text-2xl wide:text-5xl"
                            href="/control-panel/upload"
                        >
                            Upload
                        </Link>
                    </>
                )}
                {currentUser && <Button onClick={handleLogout}>Logout</Button>}
            </div>

            {error && (
                <p className="block w-11/12 m-auto text-xl text-red-900 p-6 bg-red-200 border border-black rounded">
                    {error}
                </p>
            )}

            {showUpper && !showEdit && (
                <ControlPanelBlockLayout
                    tiles={upperTiles}
                    newTiles={newTiles}
                    section={"upper"}
                    numOfRows={13}
                    numOfColumns={52}
                    coloredTiles={coloredUpperTiles}
                />
            )}
            {!showUpper && !showEdit && (
                <ControlPanelBlockLayout
                    tiles={lowerTiles}
                    newTiles={newTiles}
                    section={"lower"}
                    numOfRows={35}
                    numOfColumns={27}
                    coloredTiles={coloredLowerTiles}
                />
            )}

            {showEdit &&
                showUpper &&
                (upperTiles.length > 0 || newTiles.length > 0) && (
                    <MiniSpreadSheet
                        newTiles={newTiles}
                        sectionTiles={upperTiles}
                        handleAdd={handleAdd}
                        handleEdit={handleEdit}
                        handleChange={handleChange}
                        handleDelete={handleDelete}
                    />
                )}
            {showEdit &&
                !showUpper &&
                (lowerTiles.length > 0 || newTiles.length > 0) && (
                    <MiniSpreadSheet
                        newTiles={newTiles}
                        sectionTiles={lowerTiles}
                        handleAdd={handleAdd}
                        handleEdit={handleEdit}
                        handleChange={handleChange}
                        handleDelete={handleDelete}
                    />
                )}
        </div>
    );
}
