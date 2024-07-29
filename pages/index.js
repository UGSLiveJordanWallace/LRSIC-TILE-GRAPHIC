import { FaBuildingColumns } from 'react-icons/fa6'
import { RiBuilding2Line } from 'react-icons/ri'
import { GiFigurehead, GiGate } from 'react-icons/gi'
import Image from "next/image";
import Link from "next/link";
import Card, { CardBody, CardLink } from "../components/Card";

export default function Home() {
    return (
        <div className="grid grid-cols-3 text-xl desktop:text-3xl wide:text-5xl h-screen">
            <div></div>
            <div className="relative flex justify-center items-center">
				<div className="absolute top-0 text-center text-base wide:text-2xl">
					<p className="inline-block align-middle">
						La Reine Science Center
					</p>
					<RiBuilding2Line className="inline-block size-7 align-middle m-3"/>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="inline-block size-7"
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
                        <CardLink href="/north">North</CardLink>
                    </CardBody>
                </Card>
            </div>
            <div></div>
            <div className="relative flex justify-center items-center">
                <Card>
                    <CardBody>
                        <CardLink href="/east">East</CardLink>
                    </CardBody>
                </Card>
				<div className="absolute ml-3 bottom-0 text-center text-base wide:text-2xl wide:left-0 wide:bottom-1/2 wide:translate-y-1/2">
					<p className="inline-block align-middle wide:block">
						Statue
					</p>
					<GiFigurehead className="inline-block size-7 align-middle m-3"/>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="inline-block size-7">
					  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
					</svg>
				</div>
            </div>
            <div className="flex flex-col gap-2 items-center justify-center">
				<Image src="/bmhs_crest.png" width={256} height={256} className="size-24 mobile:size-50 desktop:size-72" alt="BMHS CREST" priority/>
				<Link className="border border-black p-2 rounded hover:bg-red-700 transition-all duration-300" href="/info/search">Search All Tiles</Link>
			</div>
            <div className="relative flex justify-center items-center">
                <Card>
                    <CardBody>
                        <CardLink href="/west">West</CardLink>
                    </CardBody>
                </Card>
				<div className="absolute mr-3 bottom-0 text-center text-base wide:text-2xl wide:right-0 wide:bottom-1/2 wide:translate-y-1/2">
					<p className="inline-block align-middle wide:block">
						Main Gate
					</p>
					<GiGate className="inline-block size-7 align-middle m-3"/>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="inline-block size-7 align-middle">
					  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
					</svg>
				</div>
            </div>
            <div></div>
            <div className="relative flex justify-center items-center">
                <Card>
                    <CardBody>
                        <CardLink href="/south">South</CardLink>
                    </CardBody>
                </Card>
				<div className="absolute bottom-0 text-center text-base wide:text-2xl">
					<p className="inline-block align-middle">
						Main Building
					</p>
					<FaBuildingColumns className="inline-block size-7 align-middle m-3"/>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="inline-block size-7"
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
            <Link
                className="absolute top-0 left-5 top-5 p-3 rounded bg-white shadow-lg text-base"
                href={"/info/help"}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6 m-auto mobile:size-9"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                    />
                </svg>
				<p className="block m-auto font-bold text-sm mobile:text-base">INSTRUCTIONS</p>
            </Link>
            <Link
                className="absolute top-0 right-5 top-5 p-3 rounded-md bg-orange-500 text-white shadow-lg text-base"
                href={"https://www.givecampus.com/campaigns/25094/donations/new"}
				target="_blank"
            >
				<p className="block m-auto font-bold text-sm mobile:text-base">Buy A Paver</p>
            </Link>
        </div>
    );
}
