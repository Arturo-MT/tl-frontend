import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { StoreInterface } from '@/src/types'

import { useNavigate } from 'react-router-dom'

export default function StoreCard({ store }: { store: StoreInterface }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/${store.id}`)
  }

  return (
    <Card
      className='flex-column justify-center hover:cursor-pointer hover:shadow-md'
      onClick={handleClick}
    >
      <CardHeader>
        <CardTitle>{store.name}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <img src={store.logo} alt={store.name} className='w-full h-full' />
      </CardContent>
      <CardFooter>
        <p>Store Footer</p>
      </CardFooter>
    </Card>
  )
}
