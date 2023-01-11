import { FC } from 'react'
import Box from '@mui/material/Box'
import MuiTextField, { OutlinedTextFieldProps } from '@mui/material/TextField'
import { Icon } from '@iconify/react'

interface Props extends Omit<OutlinedTextFieldProps, 'variant'> {
  icon?: string
  iconImage?: string
  isError?: boolean
  isSuccess?: boolean
  variant?: string
  elevation?: number
}

const TextField: FC<Props> = (props) => {
  const { icon, iconImage, elevation, variant, isError, isSuccess, ...rest } = props

  const getBorderColor = (_isSuccess: boolean): string => {
    return _isSuccess ? 'success.main' : 'transparent'
  }
  return (
    <Box sx={{ position: 'relative' }}>
      {(icon || iconImage) && (
        <Box
          sx={{
            height: 24,
            width: 24,
            transform: 'translate(-12px, 12px)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Icon icon={icon as string} />
        </Box>
      )}

      <MuiTextField
        sx={{
          '& fieldset': { borderColor: getBorderColor(Boolean(isSuccess)) },

          // input label
          '& .MuiInputLabel-root': {
            '&:not(.MuiInputLabel-sizeSmall)': {
              transform: 'translate(14px, 12px) scale(1)',
            },
            // Label shrink
            '&.MuiInputLabel-shrink': {
              transform: 'translate(18px, -7px) scale(0.6) !important',
            },
          },

          '& .MuiInputBase-root': {
            boxShadow: elevation,
            backgroundColor: 'background.paper',
          },
          '& .MuiInputBase-input': {
            boxShadow: elevation,
            backgroundColor: 'background.paper',
            '&:not(.MuiInputBase-inputSizeSmall)': {
              padding: '12px 18px',
            },
          },
        }}
        {...rest}
      />
    </Box>
  )
}

TextField.defaultProps = {
  elevation: 0,
  isSuccess: false,
}

export { TextField }
