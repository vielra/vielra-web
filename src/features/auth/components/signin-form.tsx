import { FC } from 'react'

import { Controller, SubmitHandler, useForm } from 'react-hook-form'

// Mui components.
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'

// Validation schema
import { yupResolver } from '@hookform/resolvers/yup'
import { signInValidation } from '../validations'

// Interfaces
import { IRequestLogin } from '../interfaces'
import { TextField } from '@/components/core'
import { Button } from '@/components/core/button'
import { useAuth } from '../hook'
import { useAppDispatch } from '@/store'

type TInputs = IRequestLogin

const SignInForm: FC = () => {
  const dispatch = useAppDispatch()

  const { auth_login, auth_setToken, auth_setUser } = useAuth()

  // States

  /**
   * Initial values
   */
  const initialValues: TInputs = {
    email: '',
    password: '',
  }

  /**
   * Hook form.
   */
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(signInValidation),
  })

  /**
   * Hook form submit handler.
   * @param values
   */
  const handleSubmitSignIn: SubmitHandler<TInputs> = async (values) => {
    // const formValues = values

    console.log('---handleSubmitSignIn values', values)
    try {
      const response = await auth_login(values).unwrap()
      console.log('---response', response)
      if (response.token && response.user) {
        dispatch(auth_setToken(response.token))
        dispatch(auth_setUser(response.user))
      }
    } catch (_) {}
  }

  const handleError = (objErrors: any): void => {
    console.log('❌ objErrors', objErrors)
  }

  return (
    <Box component="form" onSubmit={handleSubmit(handleSubmitSignIn, handleError)}>
      <Stack spacing={1} sx={{ width: 300 }}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label="Username or email"
              icon="mdi-light:home"
              elevation={2}
              error={Boolean(errors?.email?.message)}
              helperText={Boolean(errors?.email?.message) && errors?.email?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label="Password"
              elevation={2}
              error={Boolean(errors?.password?.message)}
              helperText={Boolean(errors?.password?.message) && errors?.password?.message}
              {...field}
            />
          )}
        />
      </Stack>

      <Stack spacing={1} sx={{ mt: 2 }}>
        <Button type="submit" variant="contained" disableElevation>
          Sign In
        </Button>
      </Stack>
    </Box>
  )
}

export { SignInForm }
