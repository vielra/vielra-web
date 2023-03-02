import { DefaultLayout } from '@/components/layouts'
import { DevComponents } from '@/features/app/components/dev-components'
import { NextPageWithLayout } from '@/features/common/interfaces'
import Box from '@mui/material/Box'
import { GetStaticProps, GetStaticPropsResult } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const DesignSystem: NextPageWithLayout<unknown> = () => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <DevComponents />
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

DesignSystem.getLayout = page => <DefaultLayout>{page}</DefaultLayout>

export default DesignSystem
