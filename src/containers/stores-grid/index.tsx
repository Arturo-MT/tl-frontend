import { useStoresQuery } from 'hooks/api/stores'
import StoreCard from 'components/store-card'
import { StoreInterface } from '@/src/types'

export default function StoresGrid() {
  const { data: stores, isLoading } = useStoresQuery()

  if (isLoading) return <div>Loading...</div>

  if (stores)
    return (
      <div className='grid grid-flow-row-dense grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {stores.map((store: StoreInterface) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>
    )
}
