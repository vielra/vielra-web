import { TextField } from '@/components/core'
import React, { FC, useState } from 'react'
import Box from '@mui/material/Box'
import { Button } from '@/components/core/button'
import { Dialog } from '@/components/core/dialog'
import { CircularProgress } from '@/components/core/circular-progress'
import { Loading } from '@/components/shared/loading'
// Then use Icon component with icon name as icon parameter:

const DevComponents: FC = () => {
  const [value, setValue] = useState<string>('')

  const [visibleDialog, setVisibleDialog] = useState(false)

  return (
    <Box sx={{ width: 300, mx: 'auto' }}>
      <TextField
        fullWidth
        name="test"
        value={value}
        placeholder="Text Field Label"
        onChange={(e) => setValue(e.target.value)}
        icon="mdi-light:home"
      />

      <Button onClick={() => setVisibleDialog(true)}>click me</Button>

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
    </Box>
  )
}

export { DevComponents }
