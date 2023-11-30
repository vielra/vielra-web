import { FC, ReactElement } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material'
import { SxProps } from '@mui/system'
import { Iconify } from '@/components/core'

interface Props {
  title?: string
  subtitle?: string
  sx?: SxProps
  renderButton?: ReactElement
}

const EmptyState: FC<Props> = props => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        height: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        ...props.sx,
      }}
    >
      <Stack
        direction='column'
        sx={{
          textAlign: 'center',
          alignItems: 'center',
          color: 'text.disabled',
        }}
      >
        <Iconify icon='ion:albums-outline' height={42} width={42} />
        <Box sx={{ mb: props.renderButton ? 4 : 0 }}>
          <Typography
            gutterBottom
            color='text.disabled'
            sx={{ fontSize: '1rem', mt: 1.2 }}
          >
            {props.title}
          </Typography>
          {props.subtitle && (
            <Typography variant='subtitle2' color='text.disabled'>
              {props.subtitle}
            </Typography>
          )}
        </Box>
        <Box>{props.renderButton}</Box>
      </Stack>
    </Box>
  )
}

EmptyState.defaultProps = {
  title: 'State is empty',
  subtitle: undefined,
}

export { EmptyState }
