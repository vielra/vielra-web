import { FC, useCallback, useState } from 'react'

// @mui
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'

// components
import { Iconify } from '@/components/core'

// interfaces
import { IPhrase, PhraseTextTranslation } from '@/features/phrasebook/intefaces'

// hooks
// import { useAuth } from '@/features/auth/hook'
// import { useAppDispatch } from '@/plugins/redux'

interface Props {
  phrase: IPhrase
  langCode: PhraseTextTranslation
}

const StyledTypography = styled(Typography)(({ theme }) => ({
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
}))

const StyledStackLinePhrase = styled(Stack)(({ theme }) => ({
  overflow: 'hidden',
}))

const StyledBoxIcon = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}))

// Get flag icon
const getFlag = (lang: PhraseTextTranslation): string => {
  if (lang === 'vi') {
    return 'emojione:flag-for-vietnam'
  } else if (lang === 'id') {
    return 'emojione:flag-for-indonesia'
  } else {
    return 'emojione:flag-for-united-kingdom'
  }
}

const PhraseLineItem: FC<Props> = props => {
  const { phrase, langCode } = props

  const [activeHover, setActiveHover] = useState<boolean>(false)

  const onHoverLinePhrase = useCallback(() => {
    setActiveHover(true)
    setTimeout(() => {
      onPlaySound()
    }, 1000)
  }, [])

  const onMouseLeave = useCallback(() => {
    setActiveHover(false)
  }, [])

  const onPlaySound = (): void => {
    //  TODO:
    //  Play sound

    console.log('--- is playing ->', langCode)
  }

  return (
    <StyledStackLinePhrase
      direction='row'
      spacing={1}
      alignItems='center'
      onMouseEnter={onHoverLinePhrase}
      onMouseLeave={onMouseLeave}
    >
      <StyledBoxIcon sx={{ minWidth: 18 }}>
        <IconButton size='small' onClick={onPlaySound}>
          <Iconify
            icon={activeHover ? 'ion:volume-medium-outline' : getFlag(langCode)}
            height={16}
            width={16}
          />
        </IconButton>
      </StyledBoxIcon>
      <StyledTypography
        sx={{
          ...(langCode === 'vi' && {
            fontWeight: 500,
            fontSize: '1rem',
          }),
        }}
      >
        {phrase.text?.[langCode] ? phrase.text[langCode] : ''}
      </StyledTypography>
    </StyledStackLinePhrase>
  )
}

export { PhraseLineItem }
