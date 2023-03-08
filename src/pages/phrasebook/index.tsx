import { useEffect } from 'react'

// next
import dynamic from 'next/dynamic'
import { GetStaticProps, GetStaticPropsResult } from 'next'

// @mui
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

// components
import { DefaultLayout } from '@/features/app/components/layouts'

// interfaces
import { NextPageWithLayout } from '@/features/common/interfaces'

// hooks
import { useAppDispatch } from '@/plugins/redux'
import { usePhrasebook } from '@/features/phrasebook/hooks'

// i18n
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

// prettier-ignore
const PhraseCategoryContainer = dynamic(() => import('@/features/phrasebook/components/phrase-category/phrase-category-container'), { ssr: false })

const PhrasebookPage: NextPageWithLayout<unknown> = () => {
  const dispatch = useAppDispatch()

  const {
    phrasebook_getCategories,
    phrasebook_categoriesIsLoading,
    phrasebook_categoriesData,
  } = usePhrasebook()

  useEffect(() => {
    dispatch(phrasebook_getCategories())
  }, [])

  return (
    <Box>
      <Container>
        <PhraseCategoryContainer
          isLoading={phrasebook_categoriesIsLoading}
          categories={phrasebook_categoriesData}
        />
      </Container>
    </Box>
  )
}

// prettier-ignore
export const getStaticProps: GetStaticProps = async ({locale}): Promise<GetStaticPropsResult<{[key: string]: any}>> => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

PhrasebookPage.getLayout = page => <DefaultLayout>{page}</DefaultLayout>

export default PhrasebookPage
