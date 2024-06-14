import Card, { CardBody, CardGrid, CardLink } from "../components/Card";

export default function Home() {
    return (
        <div className="grid grid-cols-3 gap-2 text-5xl h-screen">
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
        </div>
    );
}
