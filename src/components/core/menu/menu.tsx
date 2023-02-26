import React, { FC } from 'react'
import MuiMenu, { MenuProps } from '@mui/material/Menu'

interface Props extends MenuProps {
  id?: string
}

const Menu: FC<Props> = props => {
  const { children, sx, id, ...rest } = props

  return (
    <MuiMenu
      PaperProps={{
        sx: { ...sx },
      }}
      id={id}
      {...rest}
    >
      {children}
    </MuiMenu>
  )
}

Menu.defaultProps = {
  elevation: 3,
  id: undefined,
}

export { Menu }
