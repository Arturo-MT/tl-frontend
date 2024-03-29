import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/src/context/auth'

interface UserFormValues {
  username: string
  email: string
  password: string
  confirmPassword?: string
  is_seller: boolean
}

const UserSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Demasiado corto')
    .max(50, 'Demasiado largo')
    .required('Requerido'),
  email: Yup.string()
    .email('Correo electrónico inválido')
    .required('Requerido'),
  password: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .required('Requerido'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Las contraseñas deben coincidir')
    .required('Confirmación de contraseña requerida'),
  isSeller: Yup.boolean()
})

const RegisterForm: React.FC = () => {
  const initialValues: UserFormValues = {
    username: '',
    email: '',
    password: '',
    is_seller: false
  }

  const { registerUser } = useAuth()

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={UserSchema}
      onSubmit={(values, actions) => {
        registerUser(values)
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

          <Field type='text' name='email' placeholder='Email' as={Input} />
          <ErrorMessage
            name='email'
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

          <Field
            type='password'
            name='confirmPassword'
            placeholder='Confirmar contraseña'
            as={Input}
          />
          <ErrorMessage
            name='confirmPassword'
            component={Label}
            className='text-red-400'
          />

          <div className='flex space-x-3'>
            <Field type='checkbox' name='is_seller' />
            <Label htmlFor='is_seller' className='text-sm'>
              ¿Crear cuenta de vendedor?
            </Label>
          </div>

          <Button type='submit' disabled={isSubmitting}>
            Registrarse
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default RegisterForm
