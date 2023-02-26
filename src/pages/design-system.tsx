import { DefaultLayout } from '@/components/layouts'
import { DevComponents } from '@/features/app/components/dev-components'
import { NextPageWithLayout } from '@/features/common/interfaces'
import Box from '@mui/material/Box'

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

DesignSystem.getLayout = page => <DefaultLayout>{page}</DefaultLayout>

export default DesignSystem
