import { FC, useState, ReactElement } from 'react'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import FormHelperText from '@mui/material/FormHelperText'
import MuiSelect, { SelectProps as MuiSelectProps } from '@mui/material/Select'
import { Iconify } from '@/components/core/iconify'

interface SelectProps extends MuiSelectProps<string | number> {
  label?: string
  onClear?: () => void
  options: { label: string; value: string | number }[]
  icon?: string
  iconImage?: string
  isError?: boolean
  elevation?: number
  helperText?: string
}

const Select: FC<SelectProps> = props => {
  const {
    icon,
    iconImage,
    isError,
    elevation,
    label,
    onClear,
    value,
    onChange,
    options,
    helperText,
    ...rest
  } = props

  const IconComponent = (hasValue: boolean): ReactElement => {
    console.log('hasValue', hasValue)
    return hasValue ? (
      <IconButton size='small' onClick={onClear} sx={{ mr: 1.2 }}>
        <Iconify icon='ion:close-sharp' height={18} width={18} />
      </IconButton>
    ) : (
      <IconButton size='small' sx={{ mr: 1.2 }}>
        <Iconify icon={'ion:chevron-down'} height={18} width={18} />
      </IconButton>
    )
  }

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
        error={isError}
        sx={{
          '& fieldset': { borderColor: 'transparent' },

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
      >
        <InputLabel>{label}</InputLabel>
        <MuiSelect
          value={value}
          label={label}
          onChange={onChange}
          IconComponent={() => IconComponent(Boolean(value))}
          {...rest}
        >
          {options.map(x => (
            <MenuItem key={String(x.value)} value={x.value}>
              {x.label}
            </MenuItem>
          ))}
        </MuiSelect>
        {helperText && (
          <FormHelperText error={isError}>{helperText}</FormHelperText>
        )}
      </FormControl>
    </Box>
  )
}

Select.defaultProps = {
  label: '',
}

export { Select }
