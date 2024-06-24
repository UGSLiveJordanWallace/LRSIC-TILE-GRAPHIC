import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ControlPanelBlockLayout } from "../../components/BlockLayout";
import db from "../../services/pdb";
import { getTiles, createTiles } from "../../services/utils";
import readXlsxFile from "read-excel-file";
import TabButton from "../../components/TabButton";
import Button from "../../components/Button";
import Link from "next/link";

export default function UploadPage() {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const [upperTiles, setUpperTiles] = useState([]);
    const [lowerTiles, setLowerTiles] = useState([]);
    const [newTiles, setNewTiles] = useState([]);
    const [coloredUpperTiles, setColoredUpperTiles] = useState([]);
    const [coloredLowerTiles, setColoredLowerTiles] = useState([]);

    const [showEdit, setShowEdit] = useState(true);
    const [showUpper, setShowUpper] = useState(false);
    const [tab, setTab] = useState("north");

    const [error, setError] = useState();
    const [duplicatesError, setDoubleError] = useState();
    const [duplicatesPositions, setDoublesPositions] = useState([]);

    const router = useRouter();

    useEffect(() => {
        async function getUser() {
            const data = await db.authStore.model;
            if (data) {
                setCurrentUser(data);
                setLoading(false);
                return;
            }
            router.replace("/auth/login");
        }
        getUser();
    }, []);

    useEffect(() => {
		async function getData() {
			setShowUpper(false)
			setShowEdit(true)
			setError()
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

    async function handleFileUpload(e) {
        e.preventDefault();

		setDoubleError();
		setError();
		setDoublesPositions([]);

        let tempNewTiles = [];
        let doubles = 0;
        let tempDoublesPositions = [];
        readXlsxFile(e.target.files[0]).then((rows) => {
            for (let i = 0; i < rows.length; i++) {
                let foundDouble = false;
                const tile = {
                    block: rows[i][0],
                    section: rows[i][1],
                    row: rows[i][2],
                    col: rows[i][3],
                    name: rows[i][4],
                    description: rows[i][5],
                };
                upperTiles.map((val) => {
                    if (tile.col === val.col && tile.row === val.row) {
                        foundDouble = true;
                        tempDoublesPositions.push(
                            `At row=${tile.row} col=${tile.col}`,
                        );
                        doubles++;
                    }
                });
                lowerTiles.map((val) => {
                    if (tile.col === val.col && tile.row === val.row) {
                        foundDouble = true;
                        tempDoublesPositions.push(
                            `At row=${tile.row} col=${tile.col}`,
                        );
                        doubles++;
                    }
                });
                if (foundDouble) {
                    continue;
                }
                tempNewTiles.push(tile);
            }
            if (doubles > 0) {
                setDoubleError(
                    `Warning Found ${doubles} Tiles That Share The Same Position`,
                );
                setDoublesPositions([...tempDoublesPositions]);
            }
            setNewTiles(tempNewTiles);
            setShowEdit(false);
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
		if (showEdit || newTiles.length < 1) {
			return setError(`Failed to Submit: Empty List of New Tiles`)
		}
        const record = await createTiles(newTiles);
        if (record.error) {
            setError(record);
            return;
        }
        router.refresh();
    }

    if (loading) {
        return <div className="loading"></div>;
    }

    return (
        <div className="h-screen w-full bg-stone-200">
            <nav className="flex w-full bg-white h-15 shadow-md text-xl mobile:text-5xl">
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
                {(upperTiles.length > 0 || newTiles.length > 0) && (
                    <div>
                        <Button onClick={() => setShowUpper(true)}>
                            Upper
                        </Button>
                        <Button onClick={() => setShowUpper(false)}>
                            Lower
                        </Button>
                        {newTiles.length > 0 && (
                            <Button
                                style={{ backgroundColor: "#ef4444" }}
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>
                        )}
                    </div>
                )}
                <Button onClick={() => setShowEdit(!showEdit)}>Edit</Button>
                {showEdit && (
                    <Link
						className="hidden m-3 text-xl border border-black rounded bg-green-300 desktop:block desktop:p-6 desktop:text-2xl wide:text-5xl"
                        href="/control-panel"
                    >
                        Manual
                    </Link>
                )}
				{currentUser && <Button onClick={handleLogout}>Logout</Button>}
            </div>

            {duplicatesError && <p className="block w-11/12 m-auto text-xl text-red-900 p-6 bg-red-200 border border-black rounded">{duplicatesError}</p>}
            {duplicatesPositions && duplicatesPositions.length > 0 && (
                <div className="w-full mt-1 h-24 overflow-auto">
                    {duplicatesPositions.map((val, key) => {
                        return <p className="block w-11/12 m-auto text-xl text-red-900 p-6 bg-red-200 border border-black rounded" key={key}>{val}</p>;
                    })}
                </div>
            )}
			{error && <p className="block w-11/12 m-auto text-xl text-red-900 p-6 bg-red-200 border border-black rounded">{error}</p>}

            {showEdit && (
                <form
                    className="block w-full mt-20 text-center"
                    onSubmit={handleSubmit}
                >
                    <label
                        className="p-4 bg-white rounded-lg text-sm mobile:text-2xl shadow-lg hover:bg-stone-300 transition duration-500"
                        htmlFor="file_upload"
                    >
                        Click Here To Upload Compatible File
                    </label>
                    <input
                        name="file_upload"
                        id="file_upload"
                        type="file"
                        className="hidden"
                        onChange={handleFileUpload}
                    />
                </form>
            )}


			{showUpper &&
				!showEdit &&
					<ControlPanelBlockLayout
						tiles={upperTiles}
						newTiles={newTiles}
						section={"upper"}
						numOfRows={13}
						numOfColumns={52}
						coloredTiles={coloredUpperTiles}
					/>
				}
			{!showUpper &&
				!showEdit &&
					<ControlPanelBlockLayout
						tiles={lowerTiles}
						newTiles={newTiles}
						section={"lower"}
						numOfRows={35}
						numOfColumns={27}
						coloredTiles={coloredLowerTiles}
					/>
				}
        </div>
    );
}
