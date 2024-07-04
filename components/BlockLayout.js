import React, { useEffect, useState } from "react";
import Button from "./Button";
import Tile, { EmptyTile } from "./Tile";

const BlockLayout = React.forwardRef(
    ({ tiles, numOfRows, numOfColumns, coloredTiles }, ref) => {
        const [tileLayout, setTileLayout] = useState([]);

        useEffect(() => {
            let n = 0;
			let tempTileLayout = [];
            for (let i = numOfRows; i >= 1; i--) {
                for (let j = 1; j <= numOfColumns; j++) {
                    let isTile = false;
                    tiles.map((val) => {
                        if (val.row === i && val.col === j) {
                            tempTileLayout.push(
                                <Tile
                                    name={val.name}
                                    key={n}
                                    direction={
                                        val.direction ? val.direction : "none"
                                    }
                                    color={val.color ? val.color : "#dc2626"}
                                />,
                            );
                            isTile = true;
                            n++;
                        }
                    });
                    coloredTiles.map((val) => {
                        if (val.row === i && val.col === j) {
                            tempTileLayout.push(
                                <EmptyTile key={n} color={"green"} />,
                            );
                            isTile = true;
                            n++;
                        }
                    });
                    if (!isTile) {
                        tempTileLayout.push(
                            <EmptyTile
                                key={n}
                                row={i}
                                col={j}
                                color={"#dc2626"}
                            />,
                        );
                        n++;
                    }
                }
            }
            setTileLayout(tempTileLayout);
        }, [tiles, numOfRows, numOfColumns, coloredTiles]);

        return (
            <div
                name="block-layout"
                className="overflow-auto"
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${numOfColumns}, 1fr)`,
                }}
                ref={ref}
            >
                {tileLayout}
            </div>
        );
    },
);

BlockLayout.displayName = "BlockLayout";

export const ControlPanelBlockLayout = ({
    tiles,
    newTiles,
    section,
    numOfRows,
    numOfColumns,
    coloredTiles,
}) => {
    const [tileLayout, setTileLayout] = useState([]);

    useEffect(() => {
        let n = 0;
		let tempTileLayout = [];
        for (let i = numOfRows; i >= 1; i--) {
            for (let j = 1; j <= numOfColumns; j++) {
                let isTile = false;
                tiles.map((val) => {
                    if (val.row === i && val.col === j) {
                        tempTileLayout.push(
                            <Tile
                                name={val.name}
                                key={n}
                                color={val.color ? val.color : "#dc2626"}
                            />,
                        );
                        isTile = true;
                        n++;
                    }
                });
                coloredTiles.map((val) => {
                    if (val.row === i && val.col === j) {
                        tempTileLayout.push(
                            <EmptyTile key={n} color={"#4d7c0f"} />,
                        );
                        isTile = true;
                        n++;
                    }
                });
                newTiles.map((val) => {
                    if (val.section === section && !isTile) {
                        if (
                            JSON.parse(val.row) === i &&
                            JSON.parse(val.col) === j
                        ) {
                            tempTileLayout.push(
                                <Tile
                                    name={val.name}
                                    key={n}
                                    color={val.color ? val.color : "#d9f99d"}
                                />,
                            );
                            isTile = true;
                            n++;
                        }
                    }
                });
                if (!isTile) {
                    tempTileLayout.push(
                        <EmptyTile key={n} row={i} col={j} color={"#dc2626"} />,
                    );
                    n++;
                }
            }
        }
        setTileLayout(tempTileLayout);
    }, [tiles, newTiles, section, numOfRows, numOfColumns, coloredTiles]);

    return (
        <div
            name="block-layout"
            className="overflow-auto"
            style={{
                display: "grid",
                gridTemplateColumns: `repeat(${numOfColumns}, 1fr)`,
            }}
        >
            {tileLayout}
        </div>
    );
};

export const RenderDefaultDisplay = ({ setRender }) => {
    return (
        <div className="flex items-center justify-center h-screen bg-stone-50">
            <Button onClick={() => setRender("upper")}>Upper</Button>
            <Button onClick={() => setRender("lower")}>Lower</Button>
        </div>
    );
};

export default BlockLayout;
