import { Skeleton } from '@/components/ui/skeleton'
function Loading() {
  return (
    <article className='flex flex-col items-center justify-center min-w-screen space-y-3'>
      <Skeleton className='w-[300px] h-[150px] rounded' />
      <Skeleton className='w-[300px] h-[20px] rounded' />
      <Skeleton className='w-[300px] h-[20px] rounded' />
    </article>
  )
}

export default Loading
