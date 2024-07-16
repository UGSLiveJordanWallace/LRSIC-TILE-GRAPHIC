import {
    AiOutlineArrowLeft,
    AiOutlineArrowRight,
    AiOutlineArrowUp,
} from "react-icons/ai";
import { GiOpenTreasureChest } from "react-icons/gi";
import Button from "../../components/Button";
import MenuSelect, { MenuOption } from "../../components/MenuSelect";

export default function FindPaverPage() {
    return (
        <div className="flex flex-col justify-center w-full">
            <h1 className="text-bold text-center text-5xl m-5">
                Finding a Paver
            </h1>
            <div className="block p-8 w-full h-screen relative">
                <p className="inline-block w-full text-xl text-center">
                    Click the (Find) button at the bottom left of the page.
                </p>
                <p className="inline-block w-full text-center mt-10">
                    Find Button
                </p>
                <div className="grid grid-cols-3 m-auto w-1/3 relative border border-black rounded">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((val, key) => {
                        return (
                            <div
                                style={{ backgroundColor: "#dc2626" }}
                                className={
                                    "inline-block overflow-hidden w-full h-24 border border-black text-center font-bold text-xs mobile:text-base"
                                }
                                key={key}
                            >
                                <h3>{val}</h3>
                            </div>
                        );
                    })}
                    <Button className="absolute left-10 bottom-10 rounded p-3 bg-white shadow-xl border border-neutral-900 text-7xl">
                        Find
                    </Button>
                </div>
                <p className="inline-block w-full text-xl text-center mt-10">
                    Once clicked the search screen will appear. You can find any
                    paver within a block or section with this tool. The Tile
                    Name option searches tiles based on their names, this does
                    not mean that you can search based on what is visible, but
                    the designated name of the tile. The Tile Description option
                    searches tiles based on their description. The Search Page
                    will auto populate based on what is typed in the search box.
                    Click the close button to continue to the block Layout.
                </p>
                <p className="inline-block w-full text-center mt-10">
                    Search Tool
                </p>
                <div className="border border-black w-1/2 p-6 m-auto">
                    <h1 className="text-5xl text-center mb-5">Search Tiles</h1>
                    <MenuSelect>
                        <MenuOption value="name">Tile Name</MenuOption>
                        <MenuOption value="description">
                            Tile Description
                        </MenuOption>
                    </MenuSelect>
                    <input
                        className="block w-2/3 mt-2 m-auto text-lg border border-neutral-900 rounded shadow-lg p-2"
                        placeholder="What Are You Looking For?"
                        readOnly
                    />
                </div>
                <p className="inline-block w-full text-xl text-center mt-10">
                    After closing the search tool, the block layout render some
                    directions. Always start at the bottom left of any block in
                    the courtyard. Regardless of whether you are in the North,
                    South, East, or West block, always start at the bottom left
                    of the block.
                </p>
                <p className="inline-block w-full text-xl text-center mt-10">
                    If the tile looks like the following, identify the tile
                    within the layout, then go in the direction forward to the
                    next row.
                </p>
                <div
                    style={{ backgroundColor: "#1e293b" }}
                    className={
                        "flex flex-col items-center size-1/2 border border-black text-center m-auto font-bold text-xs mobile:text-base"
                    }
                >
                    <h3 className="flex-initial">Up Tile</h3>
                    <AiOutlineArrowUp className="flex-auto text-white size-32" />
                </div>
                <p className="inline-block w-full text-xl text-center mt-10">
                    If the tile looks like the following, identify the tile
                    within the layout, then go in the direction to the{" "}
                    <strong className="text-3xl text-bold">left</strong> and
                    find the next{" "}
                    <strong className="text-3xl text-bold">named</strong> paver.
                </p>
                <div
                    style={{ backgroundColor: "#334155" }}
                    className={
                        "flex flex-col items-center size-1/2 border border-black text-center m-auto font-bold text-xs mobile:text-base"
                    }
                >
                    <h3 className="flex-initial">Left Tile</h3>
                    <AiOutlineArrowLeft className="flex-auto text-white size-32" />
                </div>
                <p className="inline-block w-full text-xl text-center mt-10">
                    If the tile looks like the following, identify the tile
                    within the layout, then go in the direction to the{" "}
                    <strong className="text-3xl text-bold">right</strong> and
                    find the next{" "}
                    <strong className="text-3xl text-bold">named</strong> paver.
                </p>
                <div
                    style={{ backgroundColor: "#334155" }}
                    className={
                        "flex flex-col items-center size-1/2 border border-black text-center m-auto font-bold text-xs mobile:text-base"
                    }
                >
                    <h3 className="flex-initial">Right Tile</h3>
                    <AiOutlineArrowRight className="flex-auto text-white size-32" />
                </div>
                <p className="inline-block w-full text-xl text-center mt-10">
                    If the tile looks like the following, identify the tile
                    within the layout, congrats, on finding the tile.
                </p>
                <div
                    style={{ backgroundColor: "#020617" }}
                    className={
                        "flex flex-col items-center size-1/2 border border-black text-center m-auto font-bold text-xs mobile:text-base"
                    }
                >
                    <h3 className="flex-initial">X Marks The Spot</h3>
                    <GiOpenTreasureChest className="flex-auto text-white size-32" />
                </div>
            </div>
        </div>
    );
}
