import React, { FC, useState } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'
import ToggleButton from '@mui/material/ToggleButton'
import { styled, SxProps } from '@mui/material/styles'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Typography from '@mui/material/Typography'

// components
import { Button } from '@/components/core'
import { Dialog, Iconify } from '@/components/core'
import { PhraseForm } from '@/features/phrasebook/components'

// hooks
import { useApp } from '@/features/app/hooks'
import { useAuth } from '@/features/auth/hook'
import { useAppDispatch } from '@/plugins/redux'
import { usePhrasebook } from '@/features/phrasebook/hooks'

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

  const { isAuthenticated, auth_setOpenDialogAuth } = useAuth()

  const [isOpenDialogFormPhase, setIsOpenDialogFormPhrase] = useState(false)

  const {
    persistApp_setDisplayTypePhraseList,
    persistApp_displayTypePhraseList,
  } = useApp()

  const {
    phrasebook_resetCreatePhraseState,
    phrasebook_formIsDirty,
    phrasebook_createIsSuccess,
  } = usePhrasebook()

  const onChange = (
    event: React.MouseEvent<HTMLElement>,
    newVal: string
  ): void => {
    if (newVal != persistApp_displayTypePhraseList)
      dispatch(persistApp_setDisplayTypePhraseList(newVal))
  }

  const onRequestClose = (): void => {
    dispatch(phrasebook_resetCreatePhraseState())
    if (phrasebook_formIsDirty) {
      // TODO:
      // Show modal confirm to close
      setIsOpenDialogFormPhrase(false)
    } else {
      setIsOpenDialogFormPhrase(false)
    }
  }

  const onClickAddPhrase = (): void => {
    if (isAuthenticated) {
      setIsOpenDialogFormPhrase(true)
    } else {
      //  TODO
      dispatch(auth_setOpenDialogAuth(true))
    }
  }

  const onClickAddMore = (): void => {
    if (!isOpenDialogFormPhase) {
      setIsOpenDialogFormPhrase(true)
    }
    dispatch(phrasebook_resetCreatePhraseState())
  }

  return (
    <Box sx={{ ...sx }}>
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
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
          size='small'
          startIcon={
            <Iconify icon='ion:settings-outline' height={18} width={18} />
          }
        >
          Settings
        </Button>
        <Button
          variant='contained'
          size='small'
          endIcon={<Iconify icon='ion:add-sharp' height={18} width={18} />}
          onClick={onClickAddPhrase}
        >
          Add Phrase
        </Button>
      </Paper>

      <Dialog
        open={isOpenDialogFormPhase}
        maxWidth='sm'
        fullWidth
        onClose={onRequestClose}
        paperStyles={{
          backgroundColor: 'background.default',
        }}
      >
        {phrasebook_createIsSuccess ? (
          <Stack
            direction='column'
            spacing={2}
            sx={{ color: 'success.main', alignItems: 'center' }}
          >
            <Iconify icon='ion:checkmark-done-circle' height={66} width={66} />
            <Typography variant='h5' component='h5' color='text.primary'>
              Phrase added successfully
            </Typography>
            <Button
              variant='contained'
              size='large'
              endIcon={<Iconify icon='ion:add-sharp' height={20} width={20} />}
              onClick={onClickAddMore}
            >
              Add more phrase
            </Button>
          </Stack>
        ) : (
          <>
            <Box sx={{ mb: 2 }}>
              <Typography variant='h5' component='h5'>
                Add Phrase
              </Typography>
            </Box>
            <PhraseForm />
          </>
        )}
      </Dialog>
    </Box>
  )
}

export { PhraseToolbar }
