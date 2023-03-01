import React, { FC, ReactElement, useState, useEffect } from 'react'

// @mui
import { styled } from '@mui/material/styles'
import MuiButton, { ButtonProps } from '@mui/material/Button'

// components
import { Iconify } from '@/components/core/iconify'

// interfaces
import { SocialAuthProvider } from '@/features/auth/interfaces'

interface Props extends Omit<ButtonProps, 'onClick'> {
  provider: SocialAuthProvider
  onClick: (provider: SocialAuthProvider) => void
}

const getProviderIcon = (provider: SocialAuthProvider): ReactElement | null => {
  if (provider === 'google') {
    return <Iconify icon='logos:google-icon' height={20} width={20} />
  } else if (provider === 'github') {
    return <Iconify icon='logos:github-icon' height={20} width={20} />
  } else if (provider === 'facebook') {
    return <Iconify icon='logos:facebook' height={20} width={20} />
  }
  return null
}

const ButtonSocialLogin: FC<Props> = props => {
  const { children, onClick, provider, ...rest } = props

  return (
    <StyledButton
      fullWidth
      startIcon={getProviderIcon(provider)}
      onClick={() => onClick(provider)}
      {...rest}
    >
      {children}
    </StyledButton>
  )
}

const StyledButton = styled(MuiButton)(({ theme }) => ({
  fontWeight: 500,
  textTransform: 'unset',
  color: theme.palette.text.primary,
  border: `1px solid ${theme.palette.divider}`,
  fontSize: '1rem',
  borderRadius: Number(theme.shape.borderRadius) * 8,
}))

ButtonSocialLogin.defaultProps = {
  size: 'large',
}

export default ButtonSocialLogin
