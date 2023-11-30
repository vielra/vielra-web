import { useEffect, useMemo, useState } from 'react'

// next
import { GetStaticProps, GetStaticPropsResult } from 'next'
import { useRouter } from 'next/router'

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

import PhraseContainer from '@/features/phrasebook/components/phrase/phrase-container'
import { PhraseHeader } from '@/features/phrasebook/components/phrase'

const PhrasebookPhraseListPage: NextPageWithLayout<unknown> = () => {
  const dispatch = useAppDispatch()

  const router = useRouter()
  const queryCategorySug = router.query['category']

  const [activeTab, setActiveTab] = useState<number>(0)

  const {
    phrasebook_getPhrases,
    phrasebook_getCategories,
    phrasebook_categoriesData,
    phrasebook_phrasesData,
    phrasebook_phrasesIsLoading,
  } = usePhrasebook()

  const isFirstLoad = useMemo<boolean>(() => {
    return (
      Boolean(!phrasebook_phrasesData?.[queryCategorySug as string]) &&
      phrasebook_phrasesIsLoading
    )
  }, [
    phrasebook_phrasesIsLoading,
    phrasebook_phrasesData?.[queryCategorySug as string],
  ])

  useEffect(() => {
    dispatch(
      phrasebook_getPhrases({
        category: queryCategorySug as string,
      })
    )
  }, [queryCategorySug])

  useEffect(() => {
    dispatch(phrasebook_getCategories())
  }, [])

  // Watch router query
  useEffect(() => {
    if (phrasebook_categoriesData.length > 0 && queryCategorySug) {
      setActiveTab(
        phrasebook_categoriesData.findIndex(x => x.slug === queryCategorySug)
      )
    }
  }, [phrasebook_categoriesData, queryCategorySug])

  if (!queryCategorySug) {
    //   Render another page
    return null
  }

  return (
    <Box>
      <PhraseHeader
        categories={phrasebook_categoriesData}
        phrasebook={phrasebook_phrasesData?.[queryCategorySug as string]}
        activeTab={activeTab}
        setActiveTab={val => setActiveTab(val)}
        isLoading={isFirstLoad}
      />
      <Container>
        <PhraseContainer
          isLoading={isFirstLoad}
          phrases={
            phrasebook_phrasesData?.[queryCategorySug as string]?.phrases
              ? phrasebook_phrasesData[queryCategorySug as string].phrases
              : []
          }
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

PhrasebookPhraseListPage.getLayout = page => (
  <DefaultLayout>{page}</DefaultLayout>
)

export default PhrasebookPhraseListPage
