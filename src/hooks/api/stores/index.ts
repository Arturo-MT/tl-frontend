import { useQuery } from '@tanstack/react-query'
import { storesQuery } from './queries'
import { STORES_QUERY_KEY } from '../constants'
import { useFetch } from '@/src/context/fetch'

interface Props {
  config?: object
  key?: string
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
