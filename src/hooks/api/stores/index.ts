import { useQuery } from '@tanstack/react-query'
import { storeQuery, storesQuery } from './queries'
import { STORES_QUERY_KEY, STORE_QUERY_KEY } from '../constants'
import { useFetch } from '@/src/context/fetch'

interface Props {
  config?: object
  key?: string
  id?: number
}

export function useStoresQuery(props: Props = {}) {
  const { config = {}, key = STORES_QUERY_KEY } = props
  const { client } = useFetch()

  return useQuery({
    queryKey: [key],
    queryFn: () => storesQuery({ client }),
    ...config
  })
}

export function useStoreQuery(props: Props = {}) {
  const { config = {}, key = STORE_QUERY_KEY, id } = props
  const { client } = useFetch()

  return useQuery({
    queryKey: [key],
    queryFn: () => storeQuery({ client, id }),
    ...config
  })
}
