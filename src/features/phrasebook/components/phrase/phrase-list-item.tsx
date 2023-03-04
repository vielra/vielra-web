import { FC, ReactElement, useCallback, useState } from 'react'

// @mui
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import Skeleton from '@mui/material/Skeleton'
import IconButton from '@mui/material/IconButton'

// components
import { Dialog, Iconify, Link } from '@/components/core'
import { PhraseLineItem } from '@/features/phrasebook/components/phrase'
import { PhraseDetail } from '@/features/phrasebook/components/phrase/phrase-detail'

// interfaces
import { IPhrase } from '@/features/phrasebook/intefaces'

// hooks
import { useAuth } from '@/features/auth/hook'

interface Props {
  phrase: IPhrase
}

const PhraseListItem: FC<Props> = props => {
  const { phrase } = props
  const { isAuthenticated } = useAuth()

  const [openDetail, setOpenDetail] = useState(false)

  const onClickDetail = (): void => {
    setOpenDetail(true)
  }

  const onClose = (): void => {
    setOpenDetail(false)
  }

  const onClickAddToFavorite = useCallback(() => {
    if (isAuthenticated) {
      //  TODO:
      //  Hit api add to favorite
    } else {
      //  TODO:
      //  Show dialog need auth
    }
  }, [isAuthenticated])

  return (
    <Card
      sx={{
        px: 2,
        py: 2,
        '&:hover': {
          boxShadow: 3,
        },
      }}
    >
      <Stack
        direction='row'
        spacing={1}
        alignItems='flex-start'
        justifyContent='space-between'
      >
        <Stack direction='column' spacing={1}>
          <Stack direction='column' spacing={0.4}>
            <PhraseLineItem phrase={phrase} langCode='vi' />
            <PhraseLineItem phrase={phrase} langCode='id' />
            <PhraseLineItem phrase={phrase} langCode='en' />
          </Stack>
        </Stack>
        <Stack
          direction='row'
          spacing={0}
          alignItems='center'
          sx={{ ml: 'auto' }}
        >
          <IconButton size='medium'>
            <Iconify icon='ion:play-outline' height={18} width={18} />
          </IconButton>
          <IconButton size='medium' onClick={onClickAddToFavorite}>
            <Iconify icon='ion:heart-outline' height={18} width={18} />
          </IconButton>
          <IconButton size='medium' onClick={onClickDetail} sx={{ ml: 'auto' }}>
            <Iconify icon='ion:navigate-outline' height={18} width={18} />
          </IconButton>
        </Stack>
      </Stack>

      {/* Dialog detail */}
      <Dialog open={openDetail} maxWidth='sm' fullWidth onClose={onClose}>
        <PhraseDetail phrase={phrase} />
      </Dialog>
    </Card>
  )
}

const PhraseListItemSkeleton = (): ReactElement => (
  <Card
    sx={{
      px: 2,
      py: 2,
      '&:hover': {
        boxShadow: 3,
      },
    }}
  >
    <Stack direction='column' spacing={1}>
      <Stack spacing={1} direction='row' alignItems='center'>
        <Skeleton variant='circular' width={19} height={19} />
        <Skeleton variant='rounded' width='50%' height={15} />
      </Stack>
      <Stack spacing={1} direction='row' alignItems='center'>
        <Skeleton variant='circular' width={19} height={19} />
        <Skeleton variant='rounded' width='80%' height={15} />
      </Stack>
      <Stack spacing={1} direction='row' alignItems='center'>
        <Skeleton variant='circular' width={19} height={19} />
        <Skeleton variant='rounded' width='70%' height={15} />
      </Stack>
    </Stack>
    <Stack sx={{ mt: 2 }} direction='row' alignItems='center' spacing={1}>
      <Skeleton variant='circular' width={25} height={25} />
      <Skeleton variant='circular' width={25} height={25} />
      {/*<Skeleton variant='circular' width={28} height={28} sx={{ ml: 'auto' }} />*/}
    </Stack>
  </Card>
)

export { PhraseListItem, PhraseListItemSkeleton }
