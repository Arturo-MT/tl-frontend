import { useStoreQuery } from '@/src/hooks/api/stores'
import { useParams } from 'react-router-dom'

export default function StoreDetails() {
  const { store } = useParams<{ store: string }>()
  const storeId = store ? parseInt(store) : undefined
  const { data, isLoading } = useStoreQuery({
    id: storeId
  })

  if (isLoading) return <div>Loading...</div>
  if (!data) return <div>Store not found</div>

  return (
    <div className='flex flex-col items-center justify-center min-w-screen py-2'>
      <h1>{data.name}</h1>
    </div>
  )
}
