import React, { useEffect, useState } from 'react'

const Tile = ({ name, description, row, col, color, ...rest }) => {
    const [usingAndroid, setUsingAndroid] = useState(false);
    
    useEffect(() => {
        let details = navigator.userAgent;
  
        let regexp = /android/i;
        
        setUsingAndroid(regexp.test(details));
    }, [])

    if (usingAndroid) {
        return (
            <>
                <div {...rest} style={{display: "inline-block", height: "210px", width: "200px", background: color, border: "1px solid black", textAlign: "center", fontSize: "1.2em"}}>
                    <h3>{name}</h3>
                </div>
            </>
        )
    }
    return (
        <>
            {window.innerWidth >= 720 && <div {...rest} style={{display: "inline-block", height: "90px", width: "90px", background: color, border: "1px solid black", textAlign: "center", fontSize: ".8em"}}>
                <h3>{name}</h3>
            </div>}
            {window.innerWidth <= 720 && <div {...rest} style={{display: "inline-block", height: "120px", width: "110px", background: color, border: "1px solid black", textAlign: "center", fontSize: ".8em"}}>
                <h3>{name}</h3>
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
                <div style={{display: "inline-block", height: "210px", width: "200px", background: "red", border: "1px solid black", textAlign: "center", fontSize: "1.2em"}}>
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
