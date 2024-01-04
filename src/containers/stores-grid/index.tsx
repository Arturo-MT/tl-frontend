import { useStoresQuery } from 'hooks/api/stores'
import StoreCard from 'components/store-card'

interface Store {
  id: string
  name: string
  logo: string
}

export default function StoresGrid() {
  const { data: stores } = useStoresQuery()

  if (stores)
    return (
      <div className='grid grid-flow-row-dense grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {stores.map((store: Store) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>
    )
}
