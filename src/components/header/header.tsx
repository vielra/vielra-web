import { FC } from 'react'

// Mui components
import Box from '@mui/material/Box'
import { useTranslation } from 'next-i18next'
import { Link } from '@/components/core/link'

const Header: FC = () => {
  const { t } = useTranslation(['common'])

  return (
    <Box
      sx={{
        height: 70,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Link href={'/'}>{t('common:hello')}</Link>
    </Box>
  )
}

export { Header }
