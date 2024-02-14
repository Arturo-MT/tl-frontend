import { Link } from 'react-router-dom'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

import LoginForm from '@/src/containers/login-form'
import RegisterForm from '@/src/containers/register-form'

import { useAuth } from '@/src/context/auth'

export default function Header() {
  const isUserLogged = localStorage.getItem('TL_USER') !== null
  const user = JSON.parse(localStorage.getItem('TL_USER') || '{}')
  const { logout } = useAuth()
  return (
    <header className='flex items-center justify-between w-full h-20 px-6'>
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
      <div className='px-6'>
        {isUserLogged ? (
          <div className=''>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  {user.avatar ? (
                    <AvatarImage src={user.avatar} alt={user.name} />
                  ) : (
                    <AvatarFallback>
                      {user.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{user.username}</DropdownMenuLabel>
                <Link to='/profile'>
                  <DropdownMenuItem>Perfil</DropdownMenuItem>
                </Link>
                {user.is_seller ? (
                  <Link to='/admin-stores'>
                    <DropdownMenuItem>Administrar Tiendas</DropdownMenuItem>
                  </Link>
                ) : (
                  <Link to='/orders'>
                    <DropdownMenuItem>Ver órdenes</DropdownMenuItem>
                  </Link>
                )}
                <Link to='/settings'>
                  <DropdownMenuItem>Configuración</DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Sheet>
            <SheetTrigger>
              <Button>Ingresar</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Ingresar</SheetTitle>
                <SheetDescription>
                  Accede a tu cuenta para ver tus pedidos o administrar tus
                  tiendas.
                </SheetDescription>
              </SheetHeader>
              <Tabs defaultValue='login' className='my-4'>
                <TabsList>
                  <TabsTrigger value='login'>Ingresar</TabsTrigger>
                  <TabsTrigger value='register'>Registrarse</TabsTrigger>
                </TabsList>
                <TabsContent value='login'>
                  <LoginForm />
                </TabsContent>
                <TabsContent value='register'>
                  <RegisterForm />
                </TabsContent>
              </Tabs>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </header>
  )
}
