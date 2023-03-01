import { FC } from 'react'
import Box from '@mui/material/Box'
import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import { Iconify } from '@/components/core/iconify'

interface Props extends OutlinedInputProps {
  icon?: string
  iconImage?: string
  variant?: string
  elevation?: number
  helperText?: string | null | false
}

const TextField: FC<Props> = props => {
  const { id, label, error, icon, iconImage, elevation, helperText, ...rest } =
    props

  return (
    <Box sx={{ position: 'relative' }}>
      {(icon || iconImage) && (
        <Box
          sx={{
            height: 22,
            width: 22,
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
          <Iconify icon={icon as string} />
        </Box>
      )}
      <FormControl
        fullWidth
        variant='outlined'
        sx={{
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
        }}
      >
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <OutlinedInput
          id={id}
          label={label}
          error={error}
          sx={{
            backgroundColor: 'background.paper',
            '& .MuiInputBase-input': {
              fontSize: '0.95rem',
              boxShadow: elevation,
              backgroundColor: 'background.paper',
              borderRadius: 1,
              '&:not(.MuiInputBase-inputSizeSmall)': {
                padding: '12px 18px',
              },
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'transparent',
            },
          }}
          {...rest}
        />
        {helperText && (
          <FormHelperText error={error}>{helperText}</FormHelperText>
        )}
      </FormControl>
    </Box>
  )
}

TextField.defaultProps = {
  elevation: 0,
}

export { TextField }
