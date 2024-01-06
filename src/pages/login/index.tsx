import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import LoginForm from '@/src/containers/login-form'
import RegisterForm from '@/src/containers/register-form'

export default function Login() {
  return (
    <div className='flex flex-col items-center justify-center min-w-screen py-2'>
      <Tabs
        defaultValue='login'
        className='w-[400px] flex flex-col items-center'
      >
        <TabsList>
          <TabsTrigger value='login'>Ingresar</TabsTrigger>
          <TabsTrigger value='register'>Registrar</TabsTrigger>
        </TabsList>
        <TabsContent value='login'>
          <LoginForm />
        </TabsContent>
        <TabsContent value='register'>
          <RegisterForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}
