import { FC } from 'react'

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
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

// Validation schema
import { yupResolver } from '@hookform/resolvers/yup'
import { resetPasswordValidation } from '../validations'

// Interfaces
import { IRequestSendLinkResetPassword } from '../interfaces'
import { TextField, Button } from '@/components/core'

// Hooks
import { useAppDispatch } from '@/plugins/redux'
import { useAuth } from '@/features/auth/hook'

// components
import { Link } from '@/components/core/link'
import { APP_ROUTE_PATHS } from '@/features/app/routes'
import { Iconify } from '@/components/core/iconify'

type TInputs = IRequestSendLinkResetPassword

const PasswordRecoveryForm: FC = () => {
  const dispatch = useAppDispatch()

  const {
    auth_sendRecoveryLink,
    auth_recoveryIsLoading,
    auth_registerIsFailure,
  } = useAuth()

  console.log(
    'auth_recoveryIsLoading, auth_registerIsFailure',
    auth_recoveryIsLoading,
    auth_registerIsFailure
  )

  /**
   * Initial values
   */
  const initialValues: TInputs = {
    email: '',
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
    resolver: yupResolver(resetPasswordValidation),
  })

  /**
   * Hook form submit handler.
   * @param values
   */
  const onValidSubmit: SubmitHandler<TInputs> = async values => {
    dispatch(auth_sendRecoveryLink(values))
  }

  const onInvalidSubmit: SubmitErrorHandler<TInputs> = (objErrors): void => {
    console.log('❌ objErrors', objErrors)
  }

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onValidSubmit, onInvalidSubmit)}
      sx={{ height: '100%' }}
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
              label='Your email address'
              icon='mdi-light:email'
              elevation={2}
              error={Boolean(errors?.email?.message)}
              helperText={
                Boolean(errors?.email?.message) && errors?.email?.message
              }
            />
          )}
        />
      </Stack>

      <Stack direction='column' spacing={2} sx={{ mt: 2 }}>
        <Box
          sx={{

            textAlign: 'center',
            width: '100%',
            height: 44,
          }}
        >
          {auth_recoveryIsLoading ? (
            <CircularProgress size={32} />
          ) : (
            <Button
              endIcon={
                <Iconify
                  icon='ion:arrow-forward-sharp'
                  height={18}
                  width={18}
                />
              }
              fullWidth
              size='large'
              type='submit'
              variant='contained'
              disabled={auth_recoveryIsLoading}
              disableElevation
            >
              Send Recovery Link
            </Button>
          )}
        </Box>

        <Stack direction='column' spacing={2} alignItems='center'>
          <Typography sx={{ textAlign: 'center' }}>
            <Typography component='span'>Remember your password ? </Typography>
            <Link
              underline='hover'
              href={APP_ROUTE_PATHS.SignInWithParamsAppID}
            >
              Sign In
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Box>
  )
}

export { PasswordRecoveryForm }
