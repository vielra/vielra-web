import React, { FC, useEffect, useState, MouseEvent } from 'react'

import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form'

// Mui components.
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'

// Validation schema
import { signUpValidation } from '../validations'
import { yupResolver } from '@hookform/resolvers/yup'

// Interfaces
import { IRequestRegister } from '../interfaces'
import { TextField } from '@/components/core'
import { Button } from '@/components/core/button'

// Hooks
import { useAppDispatch } from '@/plugins/redux'
import { useAuth } from '@/features/auth/hook'
import { APP_ROUTE_PATHS } from '@/features/app/routes'
import { Iconify } from '@/components/core/iconify'
import { Link } from '@/components/core/link'
import dynamic from 'next/dynamic'

type TInputs = IRequestRegister

const AuthSocialButtonHorizontal = dynamic(
  () => import('@/features/auth/components/auth-social-button-horizontal'),
  { ssr: false }
)

const SignUpForm: FC = () => {
  const dispatch = useAppDispatch()

  const { auth_register, auth_registerIsFailure, auth_registerIsLoading } =
    useAuth()

  // States
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)

  /**
   * Initial values
   */
  const initialValues: TInputs = {
    name: '',
    // username: '',
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

  const handleMouseDownPassword = (
    event: MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault()
  }

  /**
   * Hook form submit handler.
   * @param values
   */
  const onValidSubmit: SubmitHandler<TInputs> = async values => {
    dispatch(auth_register(values))
  }

  const onInvalidSubmit: SubmitErrorHandler<TInputs> = (objErrors): void => {
    console.log('❌ objErrors', objErrors)
  }

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onValidSubmit, onInvalidSubmit)}
    >
      <Stack spacing={0.5}>
        <Controller
          name='name'
          control={control}
          render={({ field }) => (
            <TextField
              value={field.value}
              onChange={field.onChange}
              fullWidth
              label='Name'
              icon='mdi:account-circle'
              margin='none'
              elevation={1}
              error={Boolean(errors?.name?.message)}
              helperText={
                Boolean(errors?.name?.message) && errors?.name?.message
              }
            />
          )}
        />
        <Controller
          name='email'
          control={control}
          render={({ field }) => (
            <TextField
              value={field.value}
              onChange={field.onChange}
              fullWidth
              icon='mdi:email'
              label='Email'
              margin='none'
              elevation={1}
              error={Boolean(errors?.email?.message)}
              helperText={
                Boolean(errors?.email?.message) && errors?.email?.message
              }
            />
          )}
        />
        <Controller
          name='password'
          control={control}
          render={({ field }) => (
            <TextField
              value={field.value}
              onChange={field.onChange}
              fullWidth
              id='register-input-password'
              label='Password'
              icon='ion:key'
              margin='none'
              elevation={1}
              type={showPassword ? 'text' : 'password'}
              error={Boolean(errors?.password?.message)}
              helperText={
                Boolean(errors?.password?.message)
                  ? errors?.password?.message
                  : null
              }
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {showPassword ? (
                      <Iconify icon='ion:eye-outline' height={18} width={18} />
                    ) : (
                      <Iconify
                        icon='ion:eye-off-outline'
                        height={18}
                        width={18}
                      />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          )}
        />
        <Controller
          name='password_confirmation'
          control={control}
          render={({ field }) => (
            <TextField
              value={field.value}
              onChange={field.onChange}
              fullWidth
              id='register-input-password_confirmation'
              label='Password'
              icon='ion:key'
              margin='none'
              elevation={1}
              type={showConfirmPass ? 'text' : 'password'}
              error={Boolean(errors?.password_confirmation?.message)}
              helperText={
                Boolean(errors?.password_confirmation?.message)
                  ? errors?.password_confirmation?.message
                  : null
              }
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {showConfirmPass ? (
                      <Iconify icon='ion:eye-outline' height={18} width={18} />
                    ) : (
                      <Iconify
                        icon='ion:eye-off-outline'
                        height={18}
                        width={18}
                      />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          )}
        />
      </Stack>
      <Stack sx={{ mt: 3 }} spacing={2}>
        <Button
          endIcon={<Iconify icon='ion:arrow-forward' height={20} width={20} />}
          size='large'
          type='submit'
          variant='contained'
          fullWidth
          disableElevation
          disabled={auth_registerIsLoading}
        >
          Create Account
        </Button>

        <Box sx={{ mb: 4, width: '100%' }}>
          <AuthSocialButtonHorizontal />
        </Box>

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

          <Link href={APP_ROUTE_PATHS.SignInWithParamsAppID} underline='hover'>
            Log In
          </Link>
        </Box>
      </Stack>
    </Box>
  )
}

export { SignUpForm }
