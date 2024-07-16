import MenuSelect, { MenuOption } from "./MenuSelect";
import Card, { CardBody } from "./Card";
import Button from "./Button";

export default function SearchPage({
    searchType,
    handleSearch,
    searchResults,
    findPaverLocation,
    error,
}) {
    return (
        <div className="flex flex-col w-full h-screen text-center bg-stone-50 overflow-hidden">
            <h1 className="flex-initial text-5xl">Search Tiles</h1>
            <MenuSelect
                ref={searchType}
            >
                <MenuOption value="name">Tile Name</MenuOption>
                <MenuOption value="description">Tile Description</MenuOption>
            </MenuSelect>
            <input
                className="flex-initial w-1/2 mt-2 m-auto text-lg border border-neutral-900 rounded shadow-lg p-2"
                onChange={handleSearch}
                placeholder="What Are You Looking For?"
            />
            {error && (
                <p className="block w-11/12 m-auto text-xl text-red-900 p-6 bg-red-200 border border-black rounded">
                    Something Went Wrong: {error}!!
                </p>
            )}
            <div className="flex-auto m-auto overflow-y-auto mobile:w-11/12 desktop:w-5/6 wide:w-2/5">
                {searchResults.length > 0 &&
                    searchResults.map((val, key) => {
                        return (
                            <Card key={key}>
                                <CardBody>
                                    <h4 className="text-2xl">{val.name}</h4>
                                    <h5 className="text-lg">
                                        {val.description}
                                    </h5>
                                    <h5 className="text-lg">
                                        Row: {val.row} Column: {val.col}
                                    </h5>
                                    <Button
                                        onClick={(e) =>
                                            findPaverLocation(e, val)
                                        }
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
