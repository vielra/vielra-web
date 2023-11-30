import React, { FC, MouseEvent, useCallback, useState } from 'react'
import Box from '@mui/material/Box'
import { Button } from '@/components/core/button'
import { Dialog } from '@/components/core/dialog'

import { Menu } from '@/components/core/menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'

import { Icon } from '@iconify/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Select } from '@/components/core/select'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Iconify, TextField } from '@/components/core'
import { MenuPopover } from '@/components/core/menu-popover'
import Stack from '@mui/material/Stack'
import { AppLocale } from '@/features/app/interfaces'
import { useAppDispatch } from '@/plugins/redux'
import { useApp } from '@/features/app/hooks'
import { AppLibs } from '@/features/app/libs'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { PhraseTextTranslation } from '@/features/phrasebook/intefaces'
import { AppUtils } from '@/features/app/utils'
import { styled } from '@mui/material/styles'

const StyledSignUpButton = styled(Button)(({ theme }) => ({
  textTransform: 'uppercase',
  color: theme.palette.text.primary,
  width: 68,
  backgroundColor: theme.palette.background.default,
}))

const LanguageMenu: FC = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const { locale } = useApp()

  const { t } = useTranslation()

  const onChangeLanguage = useCallback(
    (locale: string) => {
      const path = router.asPath

      handleClose()
      dispatch(persistApp_setLocale(locale))

      return router.push(path, path, { locale })
    },
    [router]
  )

  const { persistApp_setLocale } = useApp()

  const [anchorMenuLang, setAnchorMenuLang] = useState<HTMLElement | null>(null)

  const handleOpen = (event: MouseEvent<HTMLButtonElement>): void => {
    setAnchorMenuLang(event.currentTarget)
  }

  const handleClose = (): void => {
    setAnchorMenuLang(null)
  }

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const onOpenMenu = (e: MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(e.currentTarget)
  }

  function onCloseMEnu(): void {
    setAnchorEl(null)
  }

  return (
    <>
      <StyledSignUpButton
        startIcon={<Iconify icon={AppUtils.getFlagIcon(locale)} />}
        onClick={handleOpen}
      >
        {locale}
      </StyledSignUpButton>
      <MenuPopover
        open={Boolean(anchorMenuLang)}
        anchorEl={anchorMenuLang}
        onClose={handleClose}
        arrow='top-right'
      >
        {AppLibs.dropdownAppLocales.map(x => (
          <MenuItem key={x.value} onClick={() => onChangeLanguage(x.value)}>
            <ListItemIcon>
              <Iconify icon={AppUtils.getFlagIcon(x.value)} height={18} width={18} />
            </ListItemIcon>
            <ListItemText>{x.label}</ListItemText>
          </MenuItem>
        ))}
      </MenuPopover>
    </>
  )
}

export { LanguageMenu }
