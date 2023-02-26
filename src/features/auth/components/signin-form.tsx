import { FC } from 'react'

import RouterLink from 'next/link'

import { Controller, SubmitHandler, useForm } from 'react-hook-form'

// Mui components.
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// Validation schema
import { signInValidation } from '../validations'
import { yupResolver } from '@hookform/resolvers/yup'

// Interfaces
import { IRequestLogin } from '../interfaces'

// Components
import { TextField } from '@/components/core'
import { Button } from '@/components/core/button'

// Hooks
import { useAppDispatch } from '@/plugins/redux'
import { useAuth } from '@/features/auth/hook'

type TInputs = IRequestLogin

const SignInForm: FC = () => {
  const dispatch = useAppDispatch()

  const { auth_login, auth_setToken, auth_setUser } = useAuth()

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
  const onSubmitValid: SubmitHandler<TInputs> = async values => {
    dispatch(auth_login(values))
  }

  const onSubmitInvalid = (objErrors: any): void => {
    console.log('❌ objErrors', objErrors)
  }

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onSubmitValid, onSubmitInvalid)}
    >
      <Stack spacing={1}>
        <Controller
          name='email'
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              icon='mdi:email'
              label='Username or email'
              margin='none'
              elevation={1}
              error={Boolean(errors?.email?.message)}
              helperText={
                Boolean(errors?.email?.message) && errors?.email?.message
              }
              {...field}
            />
          )}
        />
        <Controller
          name='password'
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label='Password'
              icon='mdi:lock'
              margin='none'
              elevation={1}
              error={Boolean(errors?.password?.message)}
              helperText={
                Boolean(errors?.password?.message) && errors?.password?.message
              }
              {...field}
            />
          )}
        />
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            whiteSpace: 'pre-wrap',
            justifyContent: 'flex-end',
          }}
        >
          <Typography sx={{ color: 'text.secondary' }}>
            Forgot password ?{' '}
          </Typography>
          <RouterLink href='/reset-password'>
            <Link>Reset Password</Link>
          </RouterLink>
        </Box>
      </Stack>
      <Stack sx={{ mt: 3 }} spacing={2}>
        <Button type='submit' variant='contained' fullWidth disableElevation>
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
          <Typography>Don’t have an account ? </Typography>
          <RouterLink href='/signup'>
            <Link>Register here</Link>
          </RouterLink>
        </Box>
      </Stack>
    </Box>
  )
}

export { SignInForm }
