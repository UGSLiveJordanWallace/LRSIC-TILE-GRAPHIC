import Card, { CardBody, CardGrid, CardLink } from '../components/Card';

export default function Home() {
  
	return (
		<CardGrid>
			<div>
				<h1 className="text-sm antialiased underline">Hello World</h1>
			</div>
			<Card>
				<CardBody>
					<CardLink href="/north">North</CardLink>
				</CardBody>
			</Card>
			<div></div>
			<Card>
				<CardBody>
					<CardLink href="/east">East</CardLink>
				</CardBody>
			</Card>
			<div></div>
			<Card>
				<CardBody>
					<CardLink href="/west">West</CardLink>
				</CardBody>
			</Card>
			<div></div>
			<Card>
				<CardBody>
					<CardLink href="/south">South</CardLink>
				</CardBody>
			</Card>
			<div></div>
		</CardGrid>
	)
}
