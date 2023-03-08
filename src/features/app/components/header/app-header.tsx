import { FC, useState, MouseEvent } from 'react'

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
import AdbIcon from '@mui/icons-material/Adb'

import { useTranslation } from 'next-i18next'
import { LanguageMenu } from '@/features/app/components/header/partials'
import { DynamicLogo, Logo } from '@/features/app/components'
import { styled } from '@mui/material/styles'
import { useAuth } from '@/features/auth/hook'
import { APP_ROUTE_PATHS } from '@/features/app/routes'

// components
import { Button, Iconify, Link } from '@/components/core'
import { AppUIConfig } from '@/features/app/config'
import { useAppDispatch } from '@/plugins/redux'

const pages = ['Products', 'Pricing', 'Blog']
const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

const AppNavLinks = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Phrasebook',
    path: APP_ROUTE_PATHS.Phrasebook,
  },
  {
    label: 'Contact Us',
    path: '/',
  },
]

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  height: AppUIConfig.HeaderHeight,
}))

const StyledNavLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textDecoration: 'none',
  margin: theme.spacing(0, 3),
  fontSize: '0.95rem',
  fontWeight: 500,
  '&:hover': {
    color: theme.palette.text.primary,
  },
}))

const StyledSignUpButton = styled(Button)(({ theme }) => ({}))

const AppHeader: FC = () => {
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
    <AppBar
      color='transparent'
      position='fixed'
      elevation={0}
      sx={{ backgroundColor: 'background.paper' }}
    >
      <Container maxWidth='lg'>
        <StyledToolbar disableGutters sx={{ color: 'text.primary' }}>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map(page => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign='center'>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/*<Logo sx={{ display: { xs: 'none', md: 'flex' }, width: 105 }} />*/}
          <DynamicLogo />
          <Divider
            orientation='vertical'
            variant='middle'
            sx={{ height: 20, ml: 3.2, mr: 2.2 }}
          />
          <LanguageMenu />

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {AppNavLinks.map((nav, index) => (
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
            {isAuthenticated ? (
              <Tooltip title='Open settings'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
                </IconButton>
              </Tooltip>
            ) : (
              <StyledSignUpButton
                disableElevation
                variant='contained'
                onClick={onClickSignIn}
                endIcon={<Iconify icon='ion:arrow-forward' />}
              >
                Sign In / Sign Up
              </StyledSignUpButton>
            )}

            {/* Render mobile menu here */}
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map(setting => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign='center'>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  )
}

export { AppHeader }
