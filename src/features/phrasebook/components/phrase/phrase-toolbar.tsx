import React, { FC } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import ToggleButton from '@mui/material/ToggleButton'
import { styled, SxProps } from '@mui/material/styles'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

// components
import { Iconify } from '@/components/core'

// hooks
import { useApp } from '@/features/app/hooks'
import { useAppDispatch } from '@/plugins/redux'

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))

interface Props {
  sx?: SxProps
}

const PhraseToolbar: FC<Props> = ({ sx }) => {
  const dispatch = useAppDispatch()

  const {
    persistApp_setDisplayTypePhraseList,
    persistApp_displayTypePhraseList,
  } = useApp()

  const onChange = (
    event: React.MouseEvent<HTMLElement>,
    newVal: string
  ): void => {
    if (newVal != persistApp_displayTypePhraseList)
      dispatch(persistApp_setDisplayTypePhraseList(newVal))
  }

  return (
    <Box sx={{ ...sx }}>
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          // border: theme => `1px solid ${theme.palette.divider}`,
          flexWrap: 'wrap',
        }}
      >
        <StyledToggleButtonGroup
          size='small'
          value={persistApp_displayTypePhraseList}
          exclusive
          onChange={onChange}
          aria-label='phrases display type'
        >
          <ToggleButton value='grid' aria-label='left aligned'>
            <Iconify icon='ion:grid-outline' />
          </ToggleButton>
          <ToggleButton value='list' aria-label='centered'>
            <Iconify icon='ion:reorder-four' />
          </ToggleButton>
        </StyledToggleButtonGroup>
        <Divider
          orientation='vertical'
          variant='middle'
          flexItem
          sx={{ mx: 1 }}
        />
        <Button
          startIcon={
            <Iconify icon='ion:settings-outline' height={18} width={18} />
          }
        >
          Settings
        </Button>
      </Paper>
    </Box>
  )
}

export { PhraseToolbar }
