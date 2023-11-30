import { FC, useMemo } from 'react'

// @mui
import Avatar, { AvatarProps } from '@mui/material/Avatar'
import { SxProps } from '@mui/material'

// interfaces
import { IUser } from '@/features/user/interfaces'

// utils
import { CommonUtils } from '@/features/common/utils'

interface Props extends Omit<AvatarProps, 'sx'> {
  user: IUser
  sx?: SxProps
}

const UserAvatar: FC<Props> = props => {
  const { user, sx, ...rest } = props

  const avatar = useMemo<string | null>(() => {
    if (user.photo_url) {
      return user.photo_url
    } else if (user.social_account?.social_photo_url) {
      return user.social_account.social_photo_url
    } else return null
  }, [user])

  return (
    <Avatar
      {...rest}
      sx={{
        width: 34,
        height: 34,
        backgroundColor: avatar
          ? 'transparent'
          : user?.avatar_text_color
          ? user.avatar_text_color
          : 'primary.main',
        fontSize: 15,
        fontWeight: 'bold',
        ...sx,
      }}
      src={avatar as string}
    >
      {CommonUtils.getInitialsName(user.name)}
    </Avatar>
  )
}

export { UserAvatar }
