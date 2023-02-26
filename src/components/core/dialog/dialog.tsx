import { FC, forwardRef, ReactElement, ReactNode } from 'react'

// Mui components.
import Zoom, { ZoomProps } from '@mui/material/Zoom'
import Slide, { SlideProps } from '@mui/material/Slide'
import MuiDialog, { DialogProps } from '@mui/material/Dialog'
import { Box, IconButton, styled, Typography, SxProps } from '@mui/material'

// Mui icons.
import CloseIcon from '@mui/icons-material/Close'
import { Button } from '../button'

// Base components.
// import { BaseButton } from '@/components/base'

// Transition component.
// eslint-disable-next-line react/display-name
const Transition = forwardRef<unknown, ZoomProps>(
  (props, ref): ReactElement => <Zoom ref={ref} {...props} />
)

const DialogTitle = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}))
const DialogContent = styled(Box)(({ theme }) => ({
  '& p': {
    marginBottom: theme.spacing(1.5),
    '&:last-child': {
      marginBottom: 0,
    },
  },
}))
const DialogActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  marginTop: theme.spacing(2),
  justifyContent: 'space-between',
}))

interface Props extends Omit<DialogProps, 'title'> {
  paperStyles?: SxProps
  title?: ReactNode
  icon?: ReactNode
  iconColor?: string
  onConfirm?: () => void
  confirmButtonText?: string
  disableCloseButton?: boolean
  disableCancelButton?: boolean
  disableConfirmButton?: boolean
  cancelButtonText?: string
  enableActionButton?: boolean
}

const Dialog: FC<Props> = props => {
  const {
    sx,
    open,
    icon,
    iconColor,
    title,
    onClose,
    maxWidth,
    children,
    paperStyles,
    onConfirm,
    confirmButtonText,
    disableCloseButton,
    disableCancelButton,
    disableConfirmButton,
    enableActionButton,
    cancelButtonText,
    ...rest
  } = props
  return (
    <MuiDialog
      fullWidth
      maxWidth={maxWidth}
      open={open}
      keepMounted
      onClose={onClose}
      TransitionComponent={Transition}
      PaperProps={{
        elevation: 1,
        sx: {
          position: 'relative',
          borderRadius: 2,
          m: 0,
          px: {
            xs: 6,
            md: 9,
          },
          py: {
            xs: 3,
            md: 6,
          },
          // p: {
          //   xs: (theme) => theme.spacing(4, 6),
          //   md: (theme) => theme.spacing(7, 9),
          // },
          ...paperStyles,
        },
      }}
      sx={{
        '& .MuiBackdrop-root': {
          backgroundColor: 'rgb(39 55 86 / 50%)',
        },
        ...sx,
      }}
      {...rest}
    >
      {icon && (
        <Box
          sx={{
            pb: 2,
            lineHeight: 1,
            textAlign: 'center',
            '& svg': {
              height: '60px !important',
              width: '60px !important',
              color: `${iconColor} !important`,
            },
          }}
        >
          {icon}
        </Box>
      )}
      {title && (
        <DialogTitle>
          <Typography sx={{ fontSize: 24, fontWeight: 'bold' }}>
            {title}
          </Typography>
        </DialogTitle>
      )}

      {!disableCloseButton && (
        <IconButton
          onClick={onClose as () => void}
          sx={{
            position: 'absolute',
            top: theme => theme.spacing(2.6),
            right: theme => theme.spacing(3),
          }}
        >
          <CloseIcon sx={{ fontSize: 22 }} />
        </IconButton>
      )}
      <DialogContent>{children}</DialogContent>
      {enableActionButton && (
        <DialogActions>
          {!disableCancelButton && (
            <Button
              onClick={onClose as () => void}
              size='medium'
              variant='text'
            >
              {cancelButtonText}
            </Button>
          )}
          <Button
            disabled={disableConfirmButton}
            onClick={onConfirm}
            size='medium'
            sx={{ ml: 'auto' }}
          >
            {confirmButtonText}
          </Button>
        </DialogActions>
      )}
    </MuiDialog>
  )
}

Dialog.defaultProps = {
  disableCancelButton: false,
  cancelButtonText: 'Cancel',
  confirmButtonText: 'Ok',
  enableActionButton: false,
  maxWidth: 'xs',
  iconColor: 'inherit',
}

export { Dialog }
