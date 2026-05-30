import { useForm, type FieldErrors, type Resolver } from 'react-hook-form'

import Button from '@/components/ui/Button'
import { loginSchema, type LoginFormValues } from '@/features/auth/schemas/LoginSchema'

import Field from './Field'

const loginResolver: Resolver<LoginFormValues> = (values) => {
  const result = loginSchema.safeParse(values)

  if (result.success) {
    return {
      values: result.data,
      errors: {},
    }
  }

  const errors = Object.entries(result.error.formErrors.fieldErrors).reduce<
    FieldErrors<LoginFormValues>
  >((acc, [field, messages]: [string, string[] | undefined]) => {
    if (messages === undefined || messages.length === 0) {
      return acc
    }

    acc[field as keyof LoginFormValues] = {
      type: 'value',
      message: messages[0],
    }

    return acc
  }, {})

  return {
    values: {},
    errors,
  }
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: loginResolver,
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: LoginFormValues) {
    await Promise.resolve(values)
  }

  return (
    <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Field
        label="Correo electrónico"
        type="email"
        {...register('email')}
        error={errors.email}
      />

      <Field
        label="Contraseña"
        type="password"
        {...register('password')}
        error={errors.password}
      />

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Ingresando...' : 'Ingresar'}
      </Button>
    </form>
  )
}
