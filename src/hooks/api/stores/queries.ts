import { AxiosInstance } from 'axios'

export async function storesQuery({ client }: { client: AxiosInstance }) {
  const { data } = await client.get('stores/')
  return data
}

export async function storeQuery({
  client,
  id
}: {
  client: AxiosInstance
  id: number | undefined
}) {
  if (!id) {
    throw new Error('id is required')
  }
  const { data } = await client.get(`stores/${id}/`)
  return data
}
