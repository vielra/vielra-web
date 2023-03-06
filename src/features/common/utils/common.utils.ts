const FALLBACK_INITIALS_NAME = 'A'

const getInitialsName = (fullName: string, pickFirstChar?: boolean): string => {
  if (!fullName) {
    return FALLBACK_INITIALS_NAME
  }
  const initialsName = fullName
    .split(' ')
    .map(str => str[0])
    .join('')
    .toUpperCase()

  return initialsName.length > 1
    ? initialsName.substring(0, pickFirstChar ? 1 : 2)
    : initialsName
}

export const CommonUtils = {
  getInitialsName,
}
