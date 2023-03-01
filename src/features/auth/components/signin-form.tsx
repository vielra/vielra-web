import { FC, MouseEvent, useState } from 'react'

import RouterLink from 'next/link'

import {
  Controller,
  SubmitHandler,
  SubmitErrorHandler,
  useForm,
} from 'react-hook-form'

// Mui components.
import Box from '@mui/material/Box'
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
import { Link } from '@/components/core/link'

// Hooks
import { useAppDispatch } from '@/plugins/redux'
import { useAuth } from '@/features/auth/hook'
import { Iconify } from '@/components/core/iconify'
import { APP_ROUTE_PATHS } from '@/features/app/routes'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'

// next
import NextLink from 'next/link'
import dynamic from 'next/dynamic'

const AuthSocialButtonHorizontal = dynamic(
  () => import('@/features/auth/components/auth-social-button-horizontal'),
  { ssr: false }
)

type TInputs = IRequestLogin

const SignInForm: FC = () => {
  const dispatch = useAppDispatch()

  const { auth_login, auth_loginIsFailure, auth_loginIsLoading } = useAuth()

  const [showPassword, setShowPassword] = useState(false)

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
    dispatch(auth_login(values))
  }

  const onInvalidSubmit: SubmitErrorHandler<TInputs> = (objErrors): void => {
    console.log('❌ objErrors', objErrors)
  }

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onValidSubmit, onInvalidSubmit)}
    >
      <Stack spacing={1}>
        <Controller
          name='email'
          control={control}
          render={({ field }) => (
            <TextField
              value={field.value}
              onChange={field.onChange}
              fullWidth
              icon='mdi:email'
              label='Username or email'
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
              id='login-input-password'
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
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            whiteSpace: 'pre-wrap',
            justifyContent: 'flex-end',
          }}
        >
          <Link
            href={APP_ROUTE_PATHS.PasswordRecoveryWithParamsAppID}
            underline='hover'
          >
            Forgot your password ?
          </Link>
        </Box>
      </Stack>
      <Stack sx={{ mt: 3, mb: 3 }} spacing={2}>
        <Button
          endIcon={<Iconify icon='ion:enter-outline' height={20} width={20} />}
          size='large'
          type='submit'
          variant='contained'
          fullWidth
          disableElevation
          disabled={auth_loginIsLoading}
        >
          Sign In
        </Button>

        <AuthSocialButtonHorizontal />
      </Stack>

      <Box sx={{ textAlign: 'center' }}>
        <Typography gutterBottom sx={{ color: 'text.secondary' }}>
          Don’t have an account ?{' '}
        </Typography>

        <NextLink href={APP_ROUTE_PATHS.SignUpWithParamsAppID} passHref>
          <Button
            size='medium'
            variant='outlined'
            fullWidth
            startIcon={
              <Iconify
                icon='ion:person-circle-outline'
                height={18}
                width={18}
              />
            }
          >
            Register New Account
          </Button>
        </NextLink>
      </Box>
    </Box>
  )
}

export { SignInForm }
