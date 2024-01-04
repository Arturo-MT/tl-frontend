import Header from 'components/header'

export default function MainLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex flex-col min-w-screen min-h-screen bg-white light'>
      <Header />
      <main className='px-16 py-8'>{children}</main>
    </div>
  )
}
