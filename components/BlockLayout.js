import React, { useEffect, useState } from 'react'
import Button from './Button';
import Tile, { EmptyTile } from './Tile';

const BlockLayout = ({ tiles, numOfRows, numOfColumns }) => {
    const [tileLayout, setTileLayout] = useState([]);
    let tempTileLayout = [];

    useEffect(() => {
        let n = 0;
        tempTileLayout = [];
        for (let i = numOfRows; i >= 1; i--) {
            for (let j = 1; j <= numOfColumns; j++) {
                let isTile = false;
                tiles.map(val => {
                    if (val.row === i && val.col === j) {
                        tempTileLayout.push(<Tile name={val.name} description={val.description} row={i} col={j} key={n} color={val.color ? val.color : "red"}/>)
                        isTile = true;
                        n++;
                    }
                })
                if (!isTile) {
                    tempTileLayout.push(<EmptyTile key={n} row={i} col={j} color={"red"}/>);
                    n++;
                }
            }
        }
        setTileLayout(tempTileLayout);
    }, []);

    return (
        <div name="block-layout" style={{display: "grid", gridTemplateColumns: `repeat(${numOfColumns}, 1fr)`, height: "100vh"}}>
            {tileLayout}
        </div>
    )
}

export const RenderDefaultDisplay = ({ setRender }) => {
    return (
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", textAlign: "center"}}>
            <Button onClick={() => {
                setTimeout(() => {
                    window.scrollTo(document.body.scrollWidth / 2 - document.body.scrollWidth / 4, document.body.scrollHeight);
                }, 200)
                setRender("upper");
            }} style={{display: "inline-block", fontSize: "3em"}}>Upper</Button>
            <Button onClick={() => setRender("lower")} style={{display: "inline-block", marginLeft: "20px", fontSize: "3em"}}>Lower</Button>
        </div>
    )
}

export default BlockLayout;