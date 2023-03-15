import React, { useEffect, useRef, useState } from 'react'
import BlockLayout, { RenderDefaultDisplay } from '../../components/BlockLayout'
import Button from '../../components/Button';
import MenuSelect, { MenuOption } from '../../components/MenuSelect';
import Card, { CardBody } from '../../components/Card';
import PocketBase from 'pocketbase'

export default function WestBlockPage() {
  // Tiles
  const [sectRender, setSectRender] = useState("none");
  const [lowerTiles, setLowerTiles] = useState([]);
  const [upperTiles, setUpperTiles] = useState([]);
  // Tile Search
  const [searchResults, setSearchResults] = useState([]);
  const [searchRender, setSearchRender] = useState(false);
  // Tile Variable Ref
  const searchType = useRef();
  // Error/Success states
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // DB
  const db = new PocketBase('https://lrsic-tiles-server.fly.dev');

  useEffect(() => {
    async function getTiles() {
      let result;
      let tempLowerTiles = [];
      let tempUpperTiles = [];
      const records = await db.collection('tiles').getFullList({
        sort: '-created',
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
    }
    getTiles();
  }, []);

  function handleSearch(e) {
    e.preventDefault();

    if (sectRender === "upper") {
      if (upperTiles.length < 1) {
        return setError("Tiles Not Renderd in this section");
      }

      let results = [];
      switch (searchType.current.value) {
        case "name":
           results = upperTiles.filter(val => {
            return val.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
          });
          setSearchResults(results);
          break;
        case "description":
          results = upperTiles.filter(val => {
            return val.description.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
          });
          setSearchResults(results);
          break;
        case "donor":
          results = upperTiles.filter(val => {
            return val.donor_firstname.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
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
           results = lowerTiles.filter(val => {
            return val.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
          });
          setSearchResults(results);
          break;
        case "description":
          results = lowerTiles.filter(val => {
            return val.description.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
          });
          setSearchResults(results);
          break;
        case "donor":
          results = lowerTiles.filter(val => {
            return val.donor_firstname.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
          });
          setSearchResults(results);
          break;
        default:
          setSearchResults(["Search Unrecognizable"]);
          break;
      }
    }
  }

  async function findPaverLocation(e, paver) {
    e.preventDefault();
    let pathCoords = [];
    let tileFound = false;
    switch (sectRender) {
      case "upper":
        let offset = 13;
        for (let i = 0; i < upperTiles.length; i++) {
          if (upperTiles[i].color) {
            delete upperTiles[i].color;
          }
        }

        for (let i = 0; i < upperTiles.length; i++) {
          if (upperTiles[i].row === paver.row) {
            if (upperTiles[i].col === paver.col) {
              pathCoords.push({paver: upperTiles[i], index: i});
              upperTiles[i]["color"] = "white";
              tileFound = true;
              continue;
            }
            pathCoords.push({paver: upperTiles[i], index: i})
            upperTiles[i]["color"] = "yellow";
          }
          if (upperTiles[i].col === offset) {
            if (tileFound && upperTiles[i].row > paver.row) {
              break;
            }
            pathCoords.push({paver: upperTiles[i], index: i});
            upperTiles[i]["color"] = "yellow";
          }
        }
        setSearchRender(false);
        setTimeout(() => { 
          window.scrollTo(document.body.scrollWidth / 2, document.body.scrollHeight);
        }, 200)
        break;
      case "lower":
        for (let i = 0; i < lowerTiles.length; i++) {
          if (lowerTiles[i].color) {
            delete lowerTiles[i].color;
          }
        }

        
        for (let i = 0; i < lowerTiles.length; i++) {
          if (lowerTiles[i].row === paver.row) {
            if (lowerTiles[i].col === paver.col) {
              pathCoords.push({paver: lowerTiles[i], index: i});
              lowerTiles[i]["color"] = "white";
              tileFound = true;
              continue;
            }
            pathCoords.push({paver: lowerTiles[i], index: i})
            lowerTiles[i]["color"] = "yellow";
          }
          if (lowerTiles[i].col === 1) {
            if (tileFound && lowerTiles[i].row > paver.row) {
              break;
            }
            pathCoords.push({paver: lowerTiles[i], index: i});
            lowerTiles[i]["color"] = "yellow";
          }
        }
        setSearchRender(false);
        setTimeout(() => { 
          window.scrollTo(0, document.body.scrollHeight);
         }, 200)
        break;
      }
  }

  return (
    <div>
      {sectRender && sectRender === "none" && <RenderDefaultDisplay setRender={setSectRender}/>}
      {sectRender && sectRender === "upper" && !searchRender && <BlockLayout tiles={upperTiles} numOfRows={13} numOfColumns={52}/>}
      {sectRender && sectRender === "lower" && !searchRender && <BlockLayout tiles={lowerTiles} numOfRows={35} numOfColumns={27}/>}
      
      {searchRender && <div style={{width: "100%", height: "100vh", background: "white"}}>
        <h3>Search Tiles</h3>
        <MenuSelect style={{width: "80%"}} ref={searchType}>
          <MenuOption value="name">Tile Name</MenuOption>
          <MenuOption value="description">Tile Description</MenuOption>
          <MenuOption value="donor">Tile Donor</MenuOption>
        </MenuSelect>        
        <input onChange={handleSearch}/>
        <div style={{width: "60%", textAlign: "center", fontSize: "1.3em", margin: "0 auto"}}>
          {searchResults.length > 0 && searchResults.map((val, key) => {
            return <Card key={key}>
              <CardBody>
                <h4>{val.name}</h4>
                <h5>{val.description}</h5>
                <h5>Row: {val.row} Column: {val.col}</h5>
                <Button onClick={(e) => findPaverLocation(e, val)} style={{fontSize: "2em"}}>Locate</Button>
              </CardBody>
            </Card>
          })}
        </div>
      </div>}

      {sectRender && sectRender !== "none" && <Button onClick={() => setSearchRender(!searchRender)} style={{position: "fixed", left: "10px", bottom: "10px", background: "white", fontSize: searchRender && "4em"}}>{searchRender ? "Close" : "Find"}</Button>}
      {sectRender && sectRender !== "none" && !searchRender && <Button onClick={() => setSectRender("none")} style={{position: "fixed", right: "10px", bottom: "10px", background: "white"}}>Back</Button>}
    </div>
  )
}