import React, { FC, useState, MouseEvent } from 'react'

// Mui components
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import AdbIcon from '@mui/icons-material/Adb'

import { useTranslation } from 'next-i18next'
import { LanguageMenu } from '@/features/app/components/header/partials'
import { DynamicLogo, Logo } from '@/features/app/components'
import { styled } from '@mui/material/styles'
import { useAuth } from '@/features/auth/hook'
import { AppConfig } from '@/features/app/config'

// components
import { Button, Iconify, Link } from '@/components/core'
import { AppUIConfig } from '@/features/app/config'
import { useAppDispatch } from '@/plugins/redux'

const pages = ['Products', 'Pricing', 'Blog']
const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

const footerLinks = [
  {
    label: 'Privacy Policy',
    path: '/',
  },
  {
    label: 'Cookie Policy',
    path: '/',
  },
  {
    label: 'Term & Condition',
    path: '/',
  },
]

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  height: AppUIConfig.HeaderHeight,
}))

const StyledNavLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textDecoration: 'none',
  marginRight: theme.spacing(2),
  // fontSize: '0.9rem',
  '&:hover': {
    color: theme.palette.primary.main,
  },
}))

const StyledSignUpButton = styled(Button)(({ theme }) => ({}))

const AppFooter: FC = () => {
  const { t } = useTranslation(['common'])
  const dispatch = useAppDispatch()

  const { isAuthenticated, auth_setOpenDialogAuth } = useAuth()

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const onClickSignIn = (): void => {
    dispatch(auth_setOpenDialogAuth(true))
  }

  return (
    <Box sx={{ py: 3 }}>
      <Container maxWidth='lg'>
        <Divider sx={{ width: '100%' }} />
        <Box sx={{ display: 'flex', alignItems: 'center', height: 60 }}>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}></Box>
          <Stack spacing={1} direction='row' alignItems='center'>
            <Box
              component='img'
              src={AppConfig.AppLogo}
              alt={'logo ' + AppConfig.AppName}
              sx={{ width: 14, height: 'auto' }}
            />
            <Typography
              variant='subtitle2'
              sx={{
                fontWeight: 500,
                textTransform: 'uppercase',
                color: 'text.secondary',
              }}
            >
              {AppConfig.AppName}
            </Typography>
          </Stack>
          <Divider
            orientation='vertical'
            variant='middle'
            sx={{ height: 14, mx: 4 }}
          />

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {footerLinks.map((nav, index) => (
              <StyledNavLink
                key={String(index)}
                href={nav.path}
                onClick={handleCloseNavMenu}
              >
                {nav.label}
              </StyledNavLink>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Stack
              spacing={1}
              direction='row'
              alignItems='center'
              sx={{ color: 'red' }}
            >
              <Typography component='span' sx={{ color: 'text.secondary' }}>
                Made with{' '}
              </Typography>
              <Iconify icon='ion:heart-sharp' height={15} width={15} />
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export { AppFooter }
