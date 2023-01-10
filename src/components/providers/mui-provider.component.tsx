import React, { FC, ReactNode } from 'react'

// Mui Theme Provider
import { ThemeProvider } from '@mui/material'

// Theme config.
import { createTheme } from '@/features/theme/utils'

interface Props {
  children: ReactNode
}

export const MUIProvider: FC<Props> = ({ children }) => {
  const theme = createTheme('light')
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
