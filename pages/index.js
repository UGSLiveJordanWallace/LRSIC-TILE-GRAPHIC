import Link from "next/link";
import Card, { CardBody, CardLink } from "../components/Card";

export default function Home() {
    return (
        <div className="grid grid-cols-3 text-5xl h-screen">
            <div></div>
            <div className="flex justify-center items-center">
                <Card>
                    <CardBody>
                        <CardLink href="/north">North</CardLink>
                    </CardBody>
                </Card>
            </div>
            <div></div>
            <div className="flex justify-center items-center">
                <Card>
                    <CardBody>
                        <CardLink href="/east">East</CardLink>
                    </CardBody>
                </Card>
            </div>
            <div></div>
            <div className="flex justify-center items-center">
                <Card>
                    <CardBody>
                        <CardLink href="/west">West</CardLink>
                    </CardBody>
                </Card>
            </div>
            <div></div>
            <div className="flex justify-center items-center">
                <Card>
                    <CardBody>
                        <CardLink href="/south">South</CardLink>
                    </CardBody>
                </Card>
            </div>
            <div></div>
            <Link
                className="absolute top-0 right-0 m-10 p-3 rounded bg-white shadow-lg"
                href={"/info/help"}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-9"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                    />
                </svg>
            </Link>
        </div>
    );
}
