import Button from "../../components/Button";
import Card, { CardBody, CardLink } from "../../components/Card";

export default function LayoutPage() {
    return (
        <div className="flex flex-col justify-center w-full">
            <h1 className="text-bold text-center text-5xl m-5">
                Block Layouts
            </h1>
            <div className="block p-8 w-full">
                <p className="inline-block w-full text-xl text-center">
                    There are 4 main blocks, North, South, East, and West.
                </p>
                <p className="inline-block w-full text-center mt-10">
                    This is a top-down perspective of the paver blocks facing
                    the Main Building
                </p>
                <div className="grid grid-cols-3 border border-black rounded shadow text-center w-1/2 m-auto text-5xl">
                    <div></div>
                    <div className="flex flex-col justify-center items-center">
                        <div className="block text-base mb-10 w-full">
                            <p className="inline-block">
                                La Reine Science Center
                            </p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="inline-block size-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                                />
                            </svg>
                        </div>
                        <Card>
                            <CardBody>
                                <CardLink href="">North</CardLink>
                            </CardBody>
                        </Card>
                    </div>
                    <div></div>
                    <div className="flex justify-center items-center">
                        <Card>
                            <CardBody>
                                <CardLink href="">East</CardLink>
                            </CardBody>
                        </Card>
                    </div>
                    <div></div>
                    <div className="flex justify-center items-center">
                        <Card>
                            <CardBody>
                                <CardLink href="">West</CardLink>
                            </CardBody>
                        </Card>
                    </div>
                    <div></div>
                    <div className="flex flex-col justify-center items-center">
                        <Card>
                            <CardBody>
                                <CardLink href="">South</CardLink>
                            </CardBody>
                        </Card>
                        <div className="block text-sm mt-10 w-full">
                            <p className="inline-block text-base">
                                Main Building
                            </p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="inline-block size-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                                />
                            </svg>
                        </div>
                    </div>
                    <div></div>
                </div>
                <p className="inline-block w-full text-xl text-center mt-10">
                    Clicking on one of the blocks will send you to their
                    respective layouts
                </p>
                <p className="inline-block w-full text-xl text-center">
                    Clicking on one of the East and West blocks will cause the
                    following buttons to appear
                </p>
                <p className="inline-block w-full text-center mt-10">
                    Upper and Lower Buttons
                </p>
                <div className="flex border border-black m-auto w-1/2 p-10 rounded items-center justify-center bg-stone-50">
                    <Button>Upper</Button>
                    <Button>Lower</Button>
                </div>
                <p className="inline-block w-full text-xl text-center mt-10">
                    The North block represents the pavers that you see coming
                    out of the La Reine Science Center (LRSIC). The South block
                    represents the pavers that you see coming out of the Main
                    Office. Both the North and South blocks meet in the middle
                    of the courtyard, but the East and West blocks do not meet
                    and will cut off at their respective semi-circles.
                </p>
            </div>
        </div>
    );
}
