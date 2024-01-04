import { AxiosInstance } from 'axios'

export async function storesQuery({ client }: { client: AxiosInstance }) {
  const { data } = await client.get('stores/')
  return data
}
