import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { LoginFormValues } from '@/src/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/src/context/auth'

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'El correo electrónico es muy corto')
    .max(50, 'El correo electrónico es muy largo')
    .required('El correo electrónico es obligatorio'),
  password: Yup.string()
    .min(2, 'La contraseña es muy corta')
    .max(50, 'La contraseña es muy larga')
    .required('La contraseña es obligatoria')
})

const LoginForm: React.FC = () => {
  const initialValues: LoginFormValues = { username: '', password: '' }
  const { loginWithPassword, loginError } = useAuth()

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginSchema}
      onSubmit={(values, actions) => {
        loginWithPassword(values)
        actions.setSubmitting(false)
      }}
    >
      {({ isSubmitting }) => (
        <Form className='space-y-3 w-full'>
          <Field
            type='text'
            name='username'
            placeholder='Nombre de usuario'
            as={Input}
          />
          <ErrorMessage
            name='username'
            component={Label}
            className='text-red-400'
          />

          <Field
            type='password'
            name='password'
            placeholder='Contraseña'
            as={Input}
          />
          <ErrorMessage
            name='password'
            component={Label}
            className='text-red-400'
          />

          <Button type='submit' disabled={isSubmitting}>
            Iniciar sesión
          </Button>
          {loginError && <Label className='text-red-400'>{loginError}</Label>}
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm
