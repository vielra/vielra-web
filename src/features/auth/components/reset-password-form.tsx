import { FC } from 'react'

import RouterLink from 'next/link'

import { Controller, SubmitHandler, useForm } from 'react-hook-form'

// Mui components.
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// Validation schema
import { yupResolver } from '@hookform/resolvers/yup'
import { resetPasswordValidation } from '../validations'

// Interfaces
import { IRequestSendLinkResetPassword } from '../interfaces'
import { TextField, Button } from '@/components/core'
import { useAuth } from '../hook'
import { useAppDispatch } from '@/store'

type TInputs = IRequestSendLinkResetPassword

const ResetPasswordForm: FC = () => {
  const dispatch = useAppDispatch()

  const { auth_sendLinkResetPassword, auth_setToken, auth_setUser } = useAuth()

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
  const handleSubmitSignIn: SubmitHandler<TInputs> = async (values) => {
    // const formValues = values

    console.log('---handleSubmitSignIn values', values)
    try {
      const response = await auth_sendLinkResetPassword(values).unwrap()
      console.log('---response', response)
      if (response.success) {
        // Do something
      }
    } catch (_) {}
  }

  const handleError = (objErrors: any): void => {
    console.log('❌ objErrors', objErrors)
  }

  return (
    <Box component="form" onSubmit={handleSubmit(handleSubmitSignIn, handleError)}>
      <Stack spacing={1}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label="Your email address"
              icon="mdi-light:email"
              elevation={2}
              error={Boolean(errors?.email?.message)}
              helperText={Boolean(errors?.email?.message) && errors?.email?.message}
              {...field}
            />
          )}
        />
      </Stack>

      <Stack spacing={3} sx={{ mt: 2 }}>
        <Button type="submit" variant="contained" disableElevation>
          Send Link
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
          <Typography sx={{ color: 'text.secondary' }}>Remember your password ? </Typography>
          <RouterLink href="/signin">
            <Link>Sing In</Link>
          </RouterLink>
        </Box>
      </Stack>
    </Box>
  )
}

export { ResetPasswordForm }
