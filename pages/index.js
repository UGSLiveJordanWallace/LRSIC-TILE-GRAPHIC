import Link from 'next/link';
import Card, { CardBody, CardGrid, CardLink } from '../components/Card';

export default function Home() {
  
  return (
    <CardGrid>
      <div></div>
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
