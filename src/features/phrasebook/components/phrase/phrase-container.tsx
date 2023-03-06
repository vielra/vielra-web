import { FC, memo } from 'react'

// @mui
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

// interfaces
import { IPhrase } from '@/features/phrasebook/intefaces'

// components
import {
  PhraseCard,
  PhraseCardSkeleton,
  PhraseListItem,
  PhraseListItemSkeleton,
} from '@/features/phrasebook/components'
import { EmptyState } from '@/components/shared'

// hooks
import { useApp } from '@/features/app/hooks'

interface Props {
  phrases: IPhrase[]
  isLoading: boolean
}

// eslint-disable-next-line react/display-name
const PhraseContainer: FC<Props> = memo(props => {
  const { phrases, isLoading } = props

  const { persistApp_displayTypePhraseList } = useApp()

  return (
    <Box>
      <Grid container spacing={2}>
        {isLoading ? (
          new Array(12).fill('.').map((_, index) =>
            persistApp_displayTypePhraseList === 'grid' ? (
              <Grid key={String(index)} item xs={6} sm={4}>
                <PhraseCardSkeleton />
              </Grid>
            ) : (
              <Grid key={String(index)} item xs={12}>
                <PhraseListItemSkeleton />
              </Grid>
            )
          )
        ) : (
          <>
            {phrases.length > 0 ? (
              phrases.map(x =>
                persistApp_displayTypePhraseList === 'grid' ? (
                  <Grid key={String(x.id)} item xs={6} sm={4}>
                    <PhraseCard phrase={x} />
                  </Grid>
                ) : (
                  <Grid key={String(x.id)} item xs={12}>
                    <PhraseListItem phrase={x} />
                  </Grid>
                )
              )
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

export default PhraseContainer
