import React, { FC, MouseEvent, useState } from 'react'
import Box from '@mui/material/Box'
import { Button } from '@/components/core/button'
import { Dialog } from '@/components/core/dialog'
import { CircularProgress } from '@/components/core/circular-progress'
import { Loading } from '@/components/shared/loading'
import { Menu } from '@/components/core/menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'

import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import { Icon } from '@iconify/react'

// Then use Icon component with icon name as icon parameter:

const DevComponents: FC = () => {
  const [value, setValue] = useState<string>('')

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const onOpenMenu = (e: MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(e.currentTarget)
  }

  function onCloseMEnu(): void {
    setAnchorEl(null)
  }

  const [visibleDialog, setVisibleDialog] = useState(false)

  return (
    <Box sx={{ width: 300, mx: 'auto' }}>
      <Button onClick={() => setVisibleDialog(true)}>Open modal</Button>

      {/* <CircularProgress /> */}
      <Loading />
      <Dialog
        open={visibleDialog}
        onClose={() => setVisibleDialog(false)}
        enableActionButton={true}
        confirmButtonText={'Save'}
      >
        Dialog content
      </Dialog>

      <Button onClick={onOpenMenu}>Open Menu</Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onCloseMEnu}
        sx={{ width: 300 }}
      >
        <MenuItem onClick={onCloseMEnu}>Profile</MenuItem>
        <MenuItem onClick={onCloseMEnu}>Settings</MenuItem>
        <MenuItem onClick={onCloseMEnu}>
          <ListItemIcon>
            <Icon icon='mdi:account' />
          </ListItemIcon>
          <ListItemText>Copy</ListItemText>
          <Typography variant='body2' color='text.secondary'>
            ⌘C
          </Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Icon icon='mdi:database' />
          </ListItemIcon>
          <ListItemText>Paste</ListItemText>
          <Typography variant='body2' color='text.secondary'>
            ⌘V
          </Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Box component='img' src='/images/flags/vietnam.png' />
          </ListItemIcon>
          <ListItemText>Paste</ListItemText>
          <Typography variant='body2' color='text.secondary'>
            ⌘V
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  )
}

export { DevComponents }
