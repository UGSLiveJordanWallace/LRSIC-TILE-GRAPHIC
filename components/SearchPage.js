import MenuSelect, { MenuOption } from "./MenuSelect";
import Card, { CardBody } from "./Card";
import Button from "./Button";

export default function SearchPage({
    searchType,
    handleSearch,
    searchResults,
    findPaverLocation,
}) {
    return (
        <div style={{ width: "100%", height: "100vh", background: "white" }}>
            <h3>Search Tiles</h3>
            <label>Tile Property</label>
            <MenuSelect
                style={{ width: "80%", display: "block" }}
                ref={searchType}
            >
                <MenuOption value="name">Tile Name</MenuOption>
                <MenuOption value="description">Tile Description</MenuOption>
            </MenuSelect>
            <label>What Are You Looking For? </label>
            <input
                style={{
                    width: "50%",
                    margin: "0 auto",
                    padding: "2.5px",
                    fontSize: "1.2em",
                }}
                onChange={handleSearch}
            />
            <div
                style={{
                    width: "60%",
                    textAlign: "center",
                    fontSize: "1.3em",
                    margin: "0 auto",
                }}
            >
                {searchResults.length > 0 &&
                    searchResults.map((val, key) => {
                        return (
                            <Card key={key}>
                                <CardBody>
                                    <h4>{val.name}</h4>
                                    <h5>{val.description}</h5>
                                    <h5>
                                        Row: {val.row} Column: {val.col}
                                    </h5>
                                    <Button
                                        onClick={(e) =>
                                            findPaverLocation(e, val)
                                        }
                                        style={{ fontSize: "1.5em" }}
                                    >
                                        Locate
                                    </Button>
                                </CardBody>
                            </Card>
                        );
                    })}
            </div>
        </div>
    );
}
