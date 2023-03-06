import React, { FC, useState, MouseEvent } from 'react'

import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form'

// Mui components.
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import CircularProgress from '@mui/material/CircularProgress'

// Validation schema
import { createNewPasswordValidation, signUpValidation } from '../validations'
import { yupResolver } from '@hookform/resolvers/yup'

// components
import { TextField } from '@/components/core'
import { Iconify } from '@/components/core/iconify'
import { Button } from '@/components/core/button'

// Hooks
import { useAppDispatch } from '@/plugins/redux'
import { useAuth } from '@/features/auth/hook'

// Interfaces
import { IRequestResetPassword } from '@/features/auth/interfaces'

type TInputs = Omit<IRequestResetPassword, 'email' | 'token'>

interface Props {
  token: string
  email: string
}

const PasswordResetForm: FC<Props> = ({ token, email }) => {
  const dispatch = useAppDispatch()
  const { auth_resetPasswordIsLoading, auth_resetPassword } = useAuth()

  // States
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)

  /**
   * Initial values
   */
  const initialValues: TInputs = {
    password: '',
    password_confirmation: '',
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
    resolver: yupResolver(createNewPasswordValidation),
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
    dispatch(auth_resetPassword({ ...values, email, token }))
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
          name='password'
          control={control}
          render={({ field }) => (
            <TextField
              value={field.value}
              onChange={field.onChange}
              fullWidth
              id='register-input-password'
              label='New Password'
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
              label='Confirm New Password'
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
        <Box
          sx={{
            textAlign: 'center',
            width: '100%',
            height: 44,
          }}
        >
          {auth_resetPasswordIsLoading ? (
            <CircularProgress size={32} />
          ) : (
            <Button
              endIcon={
                <Iconify icon='ion:arrow-forward' height={20} width={20} />
              }
              size='large'
              type='submit'
              variant='contained'
              fullWidth
              disableElevation
              disabled={auth_resetPasswordIsLoading}
            >
              Save
            </Button>
          )}
        </Box>
      </Stack>
    </Box>
  )
}

export { PasswordResetForm }
