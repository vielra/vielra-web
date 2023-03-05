import React, { FC, ReactElement } from 'react'

// @mui
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

// hooks
import { useApp } from '@/features/app/hooks'

// components
import { Iconify } from '@/components/core'
import {
  PhraseCategoryTab,
  PhraseToolbar,
} from '@/features/phrasebook/components'

// utils
import { PhrasebookUtils } from '@/features/phrasebook/utils'

// interfaces
import { IPhrasebook, IPhraseCategory } from '@/features/phrasebook/intefaces'

interface Props {
  categories: IPhraseCategory[]
  phrasebook: IPhrasebook
  activeTab: number
  setActiveTab: (val: number) => void
  isLoading: boolean
}

const PhraseHeader: FC<Props> = props => {
  const { locale } = useApp()
  const { phrasebook, categories, activeTab, setActiveTab, isLoading } = props

  return (
    <Box
      sx={{ backgroundColor: 'background.paper', pt: 3, boxShadow: 1, mb: 3 }}
    >
      <Container>
        {isLoading ? (
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
          >
            <Box sx={{ width: '100%' }}>
              <Stack
                direction='row'
                spacing={2}
                alignItems='center'
                sx={{
                  mb: 1,
                }}
              >
                <Skeleton variant='circular' width={30} height={30} />
                <Skeleton variant='rounded' width='12%' height={29} />
              </Stack>
              <Skeleton variant='rounded' width='12%' height={10} />
            </Box>
          </Stack>
        ) : (
          <>
            {phrasebook?.category && (
              <Stack
                direction='row'
                alignItems='center'
                justifyContent='space-between'
              >
                <Box>
                  <Stack
                    direction='row'
                    spacing={2}
                    alignItems='center'
                    sx={{
                      mb: 1,
                      // color: phrasebook?.category?.color
                      //   ? phrasebook.category.color
                      //   : 'primary.main',
                    }}
                  >
                    <Iconify icon='ion:book-outline' height={24} width={24} />
                    <Typography
                      variant='h4'
                      gutterBottom
                      sx={{
                        textTransform: 'capitalize',
                      }}
                    >
                      {PhrasebookUtils.getPhraseCategoryName(
                        phrasebook.category,
                        locale
                      )}
                    </Typography>
                  </Stack>
                  <Box>
                    <Typography sx={{ color: 'text.secondary' }}>
                      {phrasebook.category.phrases_count} phrases
                    </Typography>
                  </Box>
                </Box>

                <PhraseToolbar />
              </Stack>
            )}
          </>
        )}

        <PhraseCategoryTab
          categories={categories}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </Container>
    </Box>
  )
}

const PhraseHeaderSkeleton = (): ReactElement => (
  <Box sx={{ backgroundColor: 'background.paper', pt: 3, mb: 3 }}>
    <Container>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          overflow: 'hidden',
          height: 24,
        }}
      ></Box>
    </Container>
  </Box>
)

export { PhraseHeader, PhraseHeaderSkeleton }
