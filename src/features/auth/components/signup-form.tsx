import { FC, useEffect, useState } from 'react'

import RouterLink from 'next/link'

import { Controller, SubmitHandler, useForm } from 'react-hook-form'

// Mui components.
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// Validation schema
import { signUpValidation } from '../validations'
import { yupResolver } from '@hookform/resolvers/yup'

// Interfaces
import { IRequestRegister } from '../interfaces'
import { TextField } from '@/components/core'
import { Button } from '@/components/core/button'
import { useAuth } from '../hook'
import { useAppDispatch } from '@/store'

type TInputs = IRequestRegister

const SignUpForm: FC = () => {
  const dispatch = useAppDispatch()

  const { auth_register, auth_setToken, auth_setUser } = useAuth()

  // States
  const [usernameIsAvailable, setUsernameIsAvailable] = useState<boolean>(false)

  /**
   * Initial values
   */
  const initialValues: TInputs = {
    name: '',
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  }

  /**
   * Hook form.
   */
  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(signUpValidation),
  })

  /**
   * Hook form submit handler.
   * @param values
   */
  const handleSubmitSignUp: SubmitHandler<TInputs> = async (values) => {
    // const formValues = values

    console.log('---handleSubmitSignUp values', values)
    try {
      const response = await auth_register(values).unwrap()
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

  useEffect(() => {
    if (watch('username') && !errors?.username) {
      setUsernameIsAvailable(true)
    } else {
      setUsernameIsAvailable(false)
    }
  }, [watch('username'), errors.username])

  return (
    <Box component="form" onSubmit={handleSubmit(handleSubmitSignUp, handleError)}>
      <Stack spacing={0.5}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label="Name"
              icon="mdi:account-circle"
              margin="none"
              elevation={1}
              error={Boolean(errors?.name?.message)}
              helperText={Boolean(errors?.name?.message) && errors?.name?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label="Username"
              icon="mdi:account-badge"
              margin="none"
              elevation={1}
              error={Boolean(errors?.username?.message)}
              helperText={
                Boolean(errors?.username?.message)
                  ? errors?.username?.message
                  : usernameIsAvailable && 'Username available'
              }
              isSuccess={usernameIsAvailable}
              {...field}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              icon="mdi:email"
              label="Email"
              margin="none"
              elevation={1}
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
              icon="mdi:lock"
              margin="none"
              elevation={1}
              error={Boolean(errors?.password?.message)}
              helperText={Boolean(errors?.password?.message) && errors?.password?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="password_confirmation"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              icon="mdi:lock"
              margin="none"
              label="Password Confirmation"
              elevation={1}
              error={Boolean(errors?.password_confirmation?.message)}
              helperText={Boolean(errors?.password_confirmation?.message) && errors?.password_confirmation?.message}
              {...field}
            />
          )}
        />
      </Stack>
      <Stack sx={{ mt: 3 }} spacing={2}>
        <Button type="submit" variant="contained" fullWidth disableElevation>
          Sign Up
        </Button>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            whiteSpace: 'pre-wrap',
            justifyContent: 'center',
          }}
        >
          <Typography>Joined with Vielra before ? </Typography>
          <RouterLink href="/signin">
            <Link>Sign In</Link>
          </RouterLink>
        </Box>
      </Stack>
    </Box>
  )
}

export { SignUpForm }
