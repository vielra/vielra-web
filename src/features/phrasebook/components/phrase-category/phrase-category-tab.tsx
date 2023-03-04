import React, { FC, memo, SyntheticEvent } from 'react'
import Tabs, { tabsClasses } from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { IPhraseCategory } from '@/features/phrasebook/intefaces'
import { useRouter } from 'next/router'
import { styled } from '@mui/material/styles'
import { Iconify } from '@/components/core'

import { PhrasebookUtils } from '@/features/phrasebook/utils'
import { useApp } from '@/features/app/hooks'
import { APP_ROUTE_PATHS } from '@/features/app/routes'

interface Props {
  categories: IPhraseCategory[]
  activeTab: number
  setActiveTab: (val: number) => void
}

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'capitalize',
  minHeight: 'auto',
  fontWeight: 500,
}))

// eslint-disable-next-line react/display-name
const PhraseCategoryTab: FC<Props> = memo(
  ({ categories, activeTab, setActiveTab }) => {
    const router = useRouter()

    const { locale } = useApp()

    const handleChange = (event: SyntheticEvent, newValue: number): void => {
      const cat = categories.find((x, index) => index === newValue)
      if (cat) {
        router.push(
          APP_ROUTE_PATHS.PhrasebookPhraseList + '?category=' + cat.slug
        )
      }
      setActiveTab(newValue)
    }

    return (
      <Box sx={{}}>
        {categories.length > 0 && (
          <Tabs
            value={activeTab}
            onChange={handleChange}
            variant='scrollable'
            scrollButtons='auto'
            aria-label='scrollable auto tabs example'
            sx={{
              minHeight: 'auto',
              [`& .${tabsClasses.scrollButtons}`]: {
                borderRadius: 10,
                height: 36,
                width: 36,
                '&.Mui-disabled': { opacity: 0.3 },
              },
            }}
          >
            {categories.map(x => (
              <StyledTab
                key={x.id}
                label={PhrasebookUtils.getPhraseCategoryName(x, locale)}
                iconPosition='start'
                icon={
                  <Iconify icon='ion:book-outline' height={18} width={18} />
                }
              />
            ))}
          </Tabs>
        )}
      </Box>
    )
  }
)

export { PhraseCategoryTab }
