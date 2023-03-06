import { FC, ReactElement } from 'react'

// @mui
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'

// components
import { Iconify, Link } from '@/components/core'

// interfaces
import { IPhraseCategory } from '@/features/phrasebook/intefaces'

// constants
import { APP_ROUTE_PATHS } from '@/features/app/routes'

// utils
import { PhrasebookUtils } from '@/features/phrasebook/utils'

// hooks
import { useApp } from '@/features/app/hooks'
import IconButton from '@mui/material/IconButton'
import { useRouter } from 'next/router'

interface Props {
  category: IPhraseCategory
}

const PhraseCategoryCard: FC<Props> = props => {
  const { category } = props
  const { locale } = useApp()

  const router = useRouter()

  const onClickDetail = (): void => {
    router.push(
      APP_ROUTE_PATHS.PhrasebookPhraseList + '?category=' + category.slug
    )
  }

  return (
    <Card
      sx={{
        px: 3,
        py: 2,
        color: category.color,
        '&:hover': {
          boxShadow: 3,
          '& .navigate-icon-button': {
            opacity: 1,
          },
        },
      }}
    >
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        sx={{ mb: 1 }}
      >
        <Iconify icon='ion:book-outline' height={32} width={32} />
        <IconButton
          className='navigate-icon-button'
          size='medium'
          onClick={onClickDetail}
          sx={{ ml: 'auto', mr: '-10px', opacity: 0.1 }}
        >
          <Iconify icon='ion:arrow-forward-outline' height={18} width={18} />
        </IconButton>
      </Stack>

      <Link
        href={`${APP_ROUTE_PATHS.PhrasebookPhraseList}?category=${category.slug}`}
        sx={{ color: category.color }}
        underline='none'
      >
        <Typography
          sx={{ fontWeight: 500, fontSize: '1rem', color: category.color }}
        >
          {PhrasebookUtils.getPhraseCategoryName(category, locale)}
        </Typography>
      </Link>
      <Typography sx={{ color: 'text.disabled' }}>
        {category.phrases_count} phrases
      </Typography>
    </Card>
  )
}

const PhraseCategoryCardSkeleton = (): ReactElement => (
  <Box sx={{ p: 1 }}>
    <Stack direction='row' spacing={1} alignItems='center'>
      <Skeleton variant='circular' width={32} height={32} />
      <Skeleton variant='text' sx={{ fontSize: '1.2rem', width: '50%' }} />
    </Stack>
    <Box>
      <Skeleton variant='text' sx={{ width: '50%' }} />
    </Box>
  </Box>
)

export { PhraseCategoryCard, PhraseCategoryCardSkeleton }
