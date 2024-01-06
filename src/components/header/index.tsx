import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/src/context/auth'

export default function Header() {
  const isUserLogged = localStorage.getItem('TL_USER') !== null
  const { logout } = useAuth()
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
        {isUserLogged ? (
          <Button onClick={logout}>Logout</Button>
        ) : (
          <Link to='/login'>
            <span className='flex items-center justify-between h-full'>
              <span className='text-xl font-bold text-black dark:text-white'>
                Iniciar sesión
              </span>
            </span>
          </Link>
        )}
      </div>
    </header>
  )
}
