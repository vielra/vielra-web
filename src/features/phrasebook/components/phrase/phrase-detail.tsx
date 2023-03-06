import { FC, ReactElement, useState } from 'react'

// @mui
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// components
import { Iconify, Link } from '@/components/core'

// interfaces
import { IPhrase, IPhraseCategory } from '@/features/phrasebook/intefaces'

// constants
import { APP_ROUTE_PATHS } from '@/features/app/routes'

interface Props {
  phrase: IPhrase
}

const PhraseDetail: FC<Props> = props => {
  const { phrase } = props

  const [openDetail, setOpenDetail] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const onClickPlay = (): void => {
    setIsPlaying(true)
    setTimeout(() => {
      setIsPlaying(false)
    }, 1000)
  }

  return (
    <Box sx={{}}>
      <Stack direction='column'>
        <Typography sx={{ fontWeight: 500, fontSize: '1rem' }}>
          {phrase.text.vi}
        </Typography>
        <Typography>{phrase.text.en}</Typography>
        <Typography>{phrase.text.id}</Typography>
        <Box>
          <IconButton onClick={onClickPlay}>
            <Iconify
              icon={isPlaying ? 'ion:pause-outline' : 'ion:play-outline'}
              height={18}
              width={18}
            />
          </IconButton>
        </Box>
      </Stack>
    </Box>
  )
}

const DetailPhraseSkeleton = (): ReactElement => (
  <Box sx={{ width: 260, mr: 2, border: '1px solid #eee' }}>
    <Stack spacing={1}>
      <Skeleton variant='circular' width={40} height={40} />
      <Skeleton variant='rectangular' width='100%' height={24} />
      <Skeleton variant='rounded' width='100%' height={60} />
    </Stack>
  </Box>
)

export { PhraseDetail, DetailPhraseSkeleton }
