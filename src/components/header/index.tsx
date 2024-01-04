import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className='flex items-center justify-between w-full h-20 px-6 bg-white dark:bg-black'>
      <div className='flex items-center h-full'>
        <Link to='/'>
          <span className='flex items-center justify-between h-full'>
            <img src='/logo.svg' alt='logo' className='w-8 h-8' />
            <span className='ml-2 text-xl font-bold text-black dark:text-white'>
              Stores
            </span>
          </span>
        </Link>
      </div>
      <div className='flex items-center h-full'>
        <Link to='/login'>
          <span className='flex items-center justify-between h-full'>
            <span className='ml-2 text-xl font-bold text-black dark:text-white'>
              Login
            </span>
          </span>
        </Link>
      </div>
    </header>
  )
}
