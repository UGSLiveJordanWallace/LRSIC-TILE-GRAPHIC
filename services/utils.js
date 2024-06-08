import db from './pdb'

export async function getTiles(setUpperTiles, setLowerTiles, block) {
	let tempLowerTiles = [];
	let tempUpperTiles = [];
	const records = await db.collection('tiles').getFullList({
		'$autoCancel': false,
		sort: '+row',
		filter: `block = "${block}"`
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

export function searchPavers(searchTerm, searchType, sectRender, setSearchResults, upperTiles, lowerTiles, setError) {
	if (sectRender === "upper") {
		if (upperTiles.length < 1) {
			return setError("Tiles Not Renderd in this section");
		}

		let results = [];
		switch (searchType.current.value) {
			case "name":
				results = upperTiles.filter(val => {
					return val.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
				});
				setSearchResults(results);
				break;
			case "description":
				results = upperTiles.filter(val => {
					return val.description.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
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
					return val.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
				});
				setSearchResults(results);
				break;
			case "description":
				results = lowerTiles.filter(val => {
					return val.description.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
				});
				setSearchResults(results);
				break;
			default:
				setSearchResults(["Search Unrecognizable"]);
				break;
		}
	}
}
export async function locatePaverCoords(sectRender, paver, upperTiles, lowerTiles, setSearchRender) {
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
						upperTiles[i]["color"] = "cyan";
						upperTiles[i]["direction"] = "left";
					}
					if (upperTiles[i].col < paver.col) {
						upperTiles[i]["color"] = "cyan";
						upperTiles[i]["direction"] = "right";
					}
				}
				if (upperTiles[i].col === offset) {
					if (tileFound && upperTiles[i].row > paver.row) {
						break;
					}
					upperTiles[i]["color"] = "blue";
					upperTiles[i]["direction"] = "up";
				}
			}
			setSearchRender(false);
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
						lowerTiles[i]["color"] = "cyan";
						lowerTiles[i]["direction"] = "left";
					}
					if (lowerTiles[i].col < paver.col) {
						lowerTiles[i]["color"] = "cyan";
						lowerTiles[i]["direction"] = "right";
					}
				}
				if (lowerTiles[i].col === 1) {
					if (tileFound && lowerTiles[i].row > paver.row) {
						break;
					}
					lowerTiles[i]["color"] = "blue";
					lowerTiles[i]["direction"] = "up";
				}
			}
			setSearchRender(false);
			break;
	}
}
