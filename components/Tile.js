import React, { useEffect, useState } from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineArrowUp } from 'react-icons/ai';

const Tile = ({ name, description, row, col, color, direction, ...rest }) => {
    const [usingAndroid, setUsingAndroid] = useState(false);
    
    useEffect(() => {
        let details = navigator.userAgent;
  
        let regexp = /android/i;
        
        setUsingAndroid(regexp.test(details));
    }, [])

    if (usingAndroid) {
        return (
            <>
                <div {...rest} style={{display: "inline-block", height: "280px", width: "270px", background: color, border: "1px solid black", textAlign: "center", fontSize: "2.3em"}}>
                    <h3>{name}</h3>
                    <div style={{fontSize: "1.3em"}}>
                        {direction === "left" && <AiOutlineArrowLeft />}
                        {direction === "right" && <AiOutlineArrowRight />}
                        {direction === "up" && <AiOutlineArrowUp />}
                    </div>
                </div>
            </>
        )
    }
    return (
        <>
            {window.innerWidth >= 720 && <div {...rest} style={{display: "inline-block", height: "90px", width: "90px", background: color, border: "1px solid black", textAlign: "center", fontSize: ".8em"}}>
                <h3>{name}</h3>
                {direction === "left" && <AiOutlineArrowLeft />}
                {direction === "right" && <AiOutlineArrowRight />}
                {direction === "up" && <AiOutlineArrowUp />}
            </div>}
            {window.innerWidth <= 720 && <div {...rest} style={{display: "inline-block", height: "120px", width: "110px", background: color, border: "1px solid black", textAlign: "center", fontSize: ".8em"}}>
                <h3>{name}</h3>
                {direction === "left" && <AiOutlineArrowLeft />}
                {direction === "right" && <AiOutlineArrowRight />}
                {direction === "up" && <AiOutlineArrowUp />}
            </div>}
        </>
    )
}

export const EmptyTile = () => {
    const [usingAndroid, setUsingAndroid] = useState(false);
    
    useEffect(() => {
        let details = navigator.userAgent;
  
        let regexp = /android/i;
        
        setUsingAndroid(regexp.test(details));
    }, [])

    if (usingAndroid) {
        return (
            <>
                <div style={{display: "inline-block", height: "280px", width: "270px", background: "red", border: "1px solid black", textAlign: "center", fontSize: "1.2em"}}>
                </div>
            </>
        )
    }
    return (
        <>
            {window.innerWidth >= 720 && <div style={{display: "inline-block", height: "90px", width: "90px", background: "red", border: "1px solid black", textAlign: "center", fontSize: ".8em"}}>
            </div>}
            {window.innerWidth <= 720 && <div style={{display: "inline-block", height: "120px", width: "110px", background: "red", border: "1px solid black", textAlign: "center", fontSize: ".8em"}}>
            </div>}
        </>
    )
}
export default Tile;
