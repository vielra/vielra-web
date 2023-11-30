import React, { FC, ReactElement } from 'react'

// @mui
import { styled } from '@mui/material/styles'
import MuiIconButton, { IconButtonProps } from '@mui/material/IconButton'

// components
import { Iconify } from '@/components/core/iconify'

// interfaces
import { SocialAuthProvider } from '@/features/auth/interfaces'

interface Props extends Omit<IconButtonProps, 'children' | 'onClick'> {
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

const IconButtonSocialLogin: FC<Props> = props => {
  const { provider, onClick, ...rest } = props
  return (
    <StyledIconButton size='large' onClick={() => onClick(provider)} {...rest}>
      {getProviderIcon(provider)}
    </StyledIconButton>
  )
}

const StyledIconButton = styled(MuiIconButton)(({ theme }) => ({
  backgroundColor: theme.palette.action.hover,
  height: 44,
  width: 44,
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}))

export default IconButtonSocialLogin
