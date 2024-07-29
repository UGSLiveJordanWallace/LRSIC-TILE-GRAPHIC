import Link from "next/link";
import Button from "../../components/Button";
import { BsDashLg } from "react-icons/bs";

export default function MenuPage() {
    return (
        <div className="flex flex-col justify-center w-full">
            <h1 className="text-bold text-center text-5xl m-5">Menu</h1>
            <div className="block p-8 w-full">
                <p className="inline-block w-full text-xl text-center">
                    The main menu covers the nav bar at the top of the page, the
                    spreadsheet, and the preview.
                </p>
                <p className="inline-block w-full text-center mt-10">Nav Bar</p>
                <div className="border border-black m-auto w-full mobile:w-1/2">
                    <nav className="flex justify-evenly border border-black w-full shadow-md text-xl overflow-auto mobile:text-5xl">
                        <button className="bg-none flex-auto shrink-0 p-4">
                            north
                        </button>
                        <button className="bg-none flex-auto shrink-0 p-4">
                            south
                        </button>
                        <button className="bg-none flex-auto shrink-0 p-4">
                            east
                        </button>
                        <button className="bg-none flex-auto shrink-0 p-4">
                            west
                        </button>
                    </nav>
                </div>
                <p className="inline-block w-full text-xl text-center mt-10">
                    Clicking on one of the buttons above will load the following
                    buttons
                </p>
                <p className="inline-block w-full text-center mt-10">
                    Block Specific Buttons
                </p>
                <div className="border border-black w-full m-auto mobile:w-1/2">
                    <div className="flex flex-row items-center overflow-auto">
                        <div>
                            <Button>Upper</Button>
                            <Button>Lower</Button>
                        </div>
                        <Button>Edit or Preview</Button>
                        <Button>Add Tile</Button>
                        <Link
                            className="m-3 p-3 border border-black rounded bg-green-300 text-lg mobile:p-6 mobile:text-xl wide:text-5xl"
                            href=""
                        >
                            Upload
                        </Link>
                        <Button>Logout</Button>
                    </div>
                </div>
				<ul className="block w-full m-auto text-left mobile:text-center mobile:w-5/6">
					<li className="flex flex-row gap-2 justify-end items-center">
						<strong className="flex-initial text-bold mobile:text-3xl">Upper</strong>{" "}
						<strong className="flex-initial text-bold mobile:text-3xl">Lower</strong>{" "}
						<div><BsDashLg className="size-12"/></div>
						<p className="flex-auto inline text-sm text-left mobile:text-xl">
							buttons switch between sections when previewing the east or
							west blocks.
						</p>
					</li>
					<li className="flex flex-row gap-2 justify-center text-balance items-center">
						<strong className="flex-initial text-bold mobile:text-3xl">
							Edit or Preview
						</strong>
						<div><BsDashLg className="size-12"/></div>
						<p className="flex-auto inline text-sm text-left mobile:text-xl">
							button switches between edit and preview mode. If the page
							is glitching or not rendering properly, click this button
							twice to fix it.
						</p>
					</li>
					<li className="flex flex-row gap-2 justify-center items-center">
						<strong className="flex-initial text-bold mobile:text-3xl">Add Tile</strong>{" "}
						<div><BsDashLg className="size-12" /></div>
						<p className="flex-auto inline text-sm text-left mobile:text-xl">
							button adds a tile to the new tiles spreadsheet.
						</p>
					</li>
					<li className="flex flex-row gap-2 justify-center items-center">
						<strong className="flex-initial text-bold mobile:text-3xl">Upload</strong>
						<div><BsDashLg className="size-12" /></div>
						<p className="flex-auto inline text-sm text-left mobile:text-xl">
							The {" "}
							button sends you to a page where you can upload an excel
							file.
						</p>
					</li>
				</ul>
            </div>
        </div>
    );
}
