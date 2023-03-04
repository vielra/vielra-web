import { FC, memo } from 'react'

// @mui
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

// interfaces
import { IPhraseCategory } from '@/features/phrasebook/intefaces'

// components
import {
  PhraseCategoryCard,
  PhraseCategoryCardSkeleton,
} from '@/features/phrasebook/components'
import { EmptyState } from '@/components/shared'

interface Props {
  categories: IPhraseCategory[]
  isLoading: boolean
}

// eslint-disable-next-line react/display-name
const PhraseCategoryContainer: FC<Props> = memo(props => {
  const { categories, isLoading } = props

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant='h4'>Phrasebook</Typography>
        <Typography>Select category phrase</Typography>
      </Box>

      <Grid container spacing={2}>
        {isLoading ? (
          new Array(12).fill('.').map((_, index) => (
            <Grid key={String(index)} item xs={6} sm={4} md={3}>
              <PhraseCategoryCardSkeleton />
            </Grid>
          ))
        ) : (
          <>
            {categories.length > 0 ? (
              categories.map(category => (
                <Grid key={String(category.id)} item xs={6} sm={4} md={3}>
                  <PhraseCategoryCard category={category} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <EmptyState title='Phrases not found' />
              </Grid>
            )}
          </>
        )}
      </Grid>
    </Box>
  )
})

export default PhraseCategoryContainer
