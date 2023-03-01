import React, { FC } from 'react'

import NextLink from 'next/link'
import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link'

interface LinkProps extends Omit<MuiLinkProps, 'href'> {
  href: string
}

const Link: FC<LinkProps> = props => {
  const { href, ...rest } = props
  return (
    <NextLink href={href} passHref>
      <MuiLink {...rest} />
    </NextLink>
  )
}

export { Link }
