import React, { useState } from 'react'
import BlockLayout, { RenderDefaultDisplay } from '../../components/BlockLayout'

export default function EastBlockPage() {
    const [sectRender, setSectRender] = useState("none");
    const [lowerTiles, setLowerTiles] = useState([]);
    const [upperTiles, setUpperTiles] = useState([]);
  
    return (
        <div>
            {sectRender && sectRender === "none" && <RenderDefaultDisplay setRender={setSectRender}/>}
            {sectRender && sectRender === "upper" && <BlockLayout tiles={upperTiles} numOfRows={13} numOfColumns={52}/>}
            {sectRender && sectRender === "lower" && <BlockLayout tiles={lowerTiles} numOfRows={35} numOfColumns={27}/>}
        </div>
    )
}
